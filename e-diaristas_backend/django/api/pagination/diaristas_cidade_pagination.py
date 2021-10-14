from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

# Exibir quantidade de diaristas restantes
class DiaristasCidadePagination(PageNumberPagination):
    page_size = 6

    def get_paginated_response(self, data):
        return Response({
            'quantidade_diaristas': (self.page.paginator.count - self.page_size)
            # EX: 1 - 6
            if self.page.paginator.count > self.page_size else 0,
            'diaristas': data
        })