from django.db import models
from django.utils.translation import ugettext as _


class ZipCode(models.Model):
    zip_code = models.PositiveIntegerField(unique=True,
                                           verbose_name=_('Zip Code'))
    area = models.CharField(max_length=24, verbose_name=_('Area'))
    region = models.CharField(max_length=24, verbose_name=_('Region'))
    city = models.CharField(max_length=24, verbose_name=_('City'))
    latitude = models.FloatField(verbose_name=_('Latitude'))
    longitude = models.FloatField(verbose_name=_('Longitude'))


class Address(models.Model):
    zip_code = models.ForeignKey(ZipCode, verbose_name=_('Zip Code Id'))
    street = models.CharField(max_length=24, verbose_name=_('Street'))
