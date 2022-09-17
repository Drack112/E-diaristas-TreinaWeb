from rest_framework import serializers

from api.models import CidadesAtendimento


class CidadesAtendimentoDiaristaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CidadesAtendimento
        fields = "__all__"
