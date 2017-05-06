from rest_framework import serializers
from .models import PostalCode, Street


class PostalCodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PostalCode
        fields = '__all__'


class StreetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Street
        fields = '__all__'
        depth = 1
