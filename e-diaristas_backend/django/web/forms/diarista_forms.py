from django import forms
from ..models import Diarista

# Formulario de diaristas
class DiaristaForm(forms.ModelForm):
    # mascaras
    cpf = forms.CharField(widget=forms.TextInput(attrs={'data-mask': '000.000.000-00'}))
    cep = forms.CharField(widget=forms.TextInput(attrs={'data-mask': '00000-000'}))
    telefone = forms.CharField(widget=forms.TextInput(attrs={'data-mask': '(00) 00000-0000'}))
    # meta configurações
    class Meta:
        model = Diarista
        # importar todos os fields
        fields = "__all__"

    # Remover mascaras quando o forms for enviado
    def clean_cpf(self):
        cpf = self.cleaned_data['cpf']
        return cpf.replace('.', '').replace('-', '')

    def clean_cep(self):
        cep = self.cleaned_data['cep']
        return cep.replace("-", "")

    def clean_telefone(self):
        telefone = self.cleaned_data['telefone']
        return telefone.replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
