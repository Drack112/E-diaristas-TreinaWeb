from django import forms
from ..models import Diarista
from ..services import cep_service
import json


class DiaristaForm(forms.ModelForm):
    # mascaras
    cpf = forms.CharField(widget=forms.TextInput(attrs={"data-mask": "000.000.000-00"}))
    cep = forms.CharField(widget=forms.TextInput(attrs={"data-mask": "00000-000"}))
    telefone = forms.CharField(
        widget=forms.TextInput(attrs={"data-mask": "(00) 00000-0000"})
    )

    class Meta:
        model = Diarista
        exclude = ("codigo_ibge",)

    # Remover mascaras quando o forms for enviado
    def clean_cpf(self):
        cpf = self.cleaned_data["cpf"]
        return cpf.replace(".", "").replace("-", "")

    def clean_cep(self):
        # Formatar CEP
        cep = self.cleaned_data["cep"]
        cep_formatado = cep.replace("-", "")

        response = cep_service.buscar_cidade_cep(cep_formatado)

        if response.status_code == 400:
            raise forms.ValidationError(f"O CEP {cep} está incorreto")

        cidade_api = json.loads(response.content)
        print(cidade_api)

        if "erro" in cidade_api:
            raise forms.ValidationError(f"O Cep {cep} não foi encontrado")

        return cep.replace("-", "")

    def clean_telefone(self):
        telefone = self.cleaned_data["telefone"]
        return (
            telefone.replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
        )

    def save(self, commit=True):
        instance = super(DiaristaForm, self).save(commit=False)
        response = cep_service.buscar_cidade_cep(self.cleaned_data.get("cep"))
        cidade_api = json.loads(response.content)
        instance.codigo_ibge = cidade_api["ibge"]
        instance.save()
        return instance
