from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.get_name, name='get_name'),
    url(r'^name/', views.get_name, name='get_name'),
    url(r'^get_verdict/', views.get_verdict, name='get_verdict'),
    url(r'^plot/', views.matplot, name='matplot')
]
