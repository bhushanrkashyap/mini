from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    
    path('', RedirectView.as_view(url='/algosphere/')),
    path('algosphere/', include('algosphere.urls')),
]
