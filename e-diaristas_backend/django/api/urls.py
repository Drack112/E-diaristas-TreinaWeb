from django.urls import path
from .views import DiaristasCidadeList

# .as_view() --> retornar como view
urlpatterns = [
    path("diarista-cidade", DiaristasCidadeList.as_view(), name="diaristas-cidade-list")
]
