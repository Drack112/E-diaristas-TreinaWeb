import requests

# Serviço que usa uma API externa
def buscar_cidade_cep(cep):
    response = requests.get(
        f'https://viacep.com.br/ws/{cep}/json/'
    )

    return response