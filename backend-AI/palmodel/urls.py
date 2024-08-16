from django.urls import path
from .views import RunModelAPIView

urlpatterns = [
    path('run-model/', RunModelAPIView.as_view(), name='run-model'),
]