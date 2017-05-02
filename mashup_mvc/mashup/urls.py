from django.conf.urls import url
from . import views

app_name = 'mashup'
urlpatterns = [
    url(r'^write_bd/$', views.write_bd, name='write_bd'),
]