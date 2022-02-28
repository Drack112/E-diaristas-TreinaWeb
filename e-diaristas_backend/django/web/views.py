from django.shortcuts import render, redirect
from .forms import diarista_forms
from .models import Diarista

# Create your views here.


def cadastrar_diarista(request):
    # Pegar a requisição do forms
    if request.method == "POST":
        # Salvar os dados do forms numa variavel
        form_diarista = diarista_forms.DiaristaForm(request.POST, request.FILES)
        if form_diarista.is_valid():
            form_diarista.save()
            return redirect("listar_diarista")
    else:
        form_diarista = diarista_forms.DiaristaForm()
    return render(request, "form_diaristas.html", {"form_diarista": form_diarista})


def listar_diarista(request):
    # Pegar todos os dados da database
    diaristas = Diarista.objects.all()
    return render(request, "lista_diarista.html", {"diaristas": diaristas})


def editar_diarista(request, diarista_id):
    # Filtrar a diarista pelo id que for passado
    diarista = Diarista.objects.get(id=diarista_id)
    if request.method == "POST":
        form_diarista = diarista_forms.DiaristaForm(
            request.POST or None, request.FILES, instance=diarista
        )
        if form_diarista.is_valid():
            form_diarista.save()
            return redirect("listar_diarista")
    else:
        form_diarista = diarista_forms.DiaristaForm(instance=diarista)
    return render(request, "form_diaristas.html", {"form_diarista": form_diarista})


def remover_diarista(request, diarista_id):
    diarista = Diarista.objects.get(id=diarista_id)
    diarista.delete()
    return redirect("listar_diarista")
