from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver
from django.urls import reverse

from api.models import Usuario, CidadesAtendimento, Diaria

import environ


env = environ.Env()

env.read_env(env.str("ENV_PATH", "./ediaristas/.env"))


def usuario_cadastrado(sender, instance, created, **kwargs):
    if created:
        assunto = "Cadastro realizado com sucesso"
        corpo_email = ""
        email_destino = [
            instance.email,
        ]
        email_remetente = "fagner.pinheiro@treinaweb.com.br"
        mensagem_html = render_to_string("email_cadastro.html", {"usuario": instance})
        send_mail(
            assunto,
            corpo_email,
            email_remetente,
            email_destino,
            html_message=mensagem_html,
        )


def diarista_selecionada(sender, instance, **kwargs):
    if instance.status == 3:
        html_message_cliente = render_to_string(
            "email_diarista_selecionada.html",
            {"usuario": instance.cliente, "diaria": instance},
        )
        html_message_diarista = render_to_string(
            "email_diarista_selecionada.html",
            {"usuario": instance.diarista, "diaria": instance},
        )
        email_remetente = "fagner.pinheiro@treinaweb.com.br"
        email_destino_cliente = [
            instance.cliente.email,
        ]
        email_destino_diarista = [
            instance.diarista.email,
        ]
        assunto = "Diarista selecionada"
        corpo_email = ""
        send_mail(
            assunto,
            corpo_email,
            email_remetente,
            email_destino_cliente,
            html_message=html_message_cliente,
        )
        send_mail(
            assunto,
            corpo_email,
            email_remetente,
            email_destino_diarista,
            html_message=html_message_diarista,
        )


def nova_oportunidade(sender, instance, **kwargs):
    if instance.status == 2:
        cidade_atendimento = CidadesAtendimento.objects.get(
            codigo_ibge=instance.codigo_ibge
        )
        diaristas = cidade_atendimento.usuario.all().values("email")
        html_message_diarista = render_to_string("email_nova_oportunidade.html")
        email_remetente = "fagner.pinheiro@treinaweb.com.br"
        assunto = "Nova oportunidade no ediaristas"
        corpo_email = ""
        lista_email = []
        for email in diaristas:
            lista_email.append(email["email"])
        send_mail(
            assunto,
            corpo_email,
            email_remetente,
            lista_email,
            html_message=html_message_diarista,
        )


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    html_message_reset = render_to_string(
        "email_resetar_senha.html",
        {
            "link": "{}{}?token={}".format(
                env("URL_FRONTEND"),
                reverse("password_reset:reset-password-request"),
                reset_password_token.key,
            )
        },
    )
    email_remetente = "fagner.pinheiro@treinaweb.com.br"
    assunto = "Email para resetar sua senha no e-diaristas"
    corpo_email = ""
    email_destino = [
        reset_password_token.user.email,
    ]
    send_mail(
        assunto,
        corpo_email,
        email_remetente,
        email_destino,
        html_message=html_message_reset,
    )


post_save.connect(usuario_cadastrado, sender=Usuario)
post_save.connect(diarista_selecionada, sender=Diaria)
post_save.connect(nova_oportunidade, sender=Diaria)
