from web.services import cep_service
from rest_framework import serializers
import json
from web.models import Diarista

# Serviço da API

def listar_diaristas_cidade(cep):
    codigo_ibge = buscar_cidade_cep(cep)["ibge"]
    try:    
        diaristas = Diarista.objects.filter(codigo_ibge=codigo_ibge).order_by('id')
        return diaristas
    except Diarista.DoesNotExist:
        return []

def buscar_cidade_cep(cep):
    # Reciclar o mesmo IF do web
    response = cep_service.buscar_cidade_cep(cep)
    if response.status_code == 400:
        raise serializers.ValidationError(f"O CEP {cep} está incorreto")
        
    cidade_api = json.loads(response.content)
    print(cidade_api)    

    if 'erro' in cidade_api:
        raise serializers.ValidationError(f"O Cep {cep} não foi encontrado")
        
    return cidade_api    