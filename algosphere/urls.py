from django.urls import path, include

# Forward top-level 'algosphere/' include to the internal app urls
urlpatterns = [
    path('', include('algosphere.apps.algosphere.urls')),
]
