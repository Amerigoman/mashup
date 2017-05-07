from django.conf.urls import url
from . import views

app_name = 'mashup'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^write_bd/$', views.write_bd, name='write_bd'),
    url(r'^coords/(?P<sw>-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?)/'
        r'(?P<ne>-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?)/$',
        views.PostalCodeListDependsOnCoordinates.as_view(),
        name = 'coords'),
]