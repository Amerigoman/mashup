from django.conf.urls import url
from . import views

app_name = 'mashup'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^articles/$',
        views.get_articles, name='articles'),
    url(r'^search_codes/(?P<text>\w+)/$',
        views.search_codes, name='search_codes'),
    url(r'^coords/(?P<sw>-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?)/'
        r'(?P<ne>-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?)/$',
        views.PostalCodeListDependsOnCoordinates.as_view(),
        name = 'coords'),
    url(r'^write_bd/$', views.write_bd, name='write_bd'),
]