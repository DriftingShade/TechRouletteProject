from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Item
from .serializers import ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    @action(detail=True, methods=['get'])
    def retrieve_item(self, request, pk=None):
        item = self.get_object()
        serializer = ItemSerializer(item)
        return Response(serializer.data)