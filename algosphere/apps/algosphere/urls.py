from django.urls import path
from . import views

app_name = 'algosphere'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('auth/', views.auth_view, name='auth'),
    path('arrays', views.arrays, name='arrays'),
    path('stacks', views.stacks, name='stacks'),
    path('queues', views.queues, name='queues'),
    path('trees', views.trees, name='trees'),
    path('graphs', views.graphs, name='graphs'),
    path('comparison', views.comparison, name='comparison'),
    path('logout/', views.logout_view, name='logout'),
]
