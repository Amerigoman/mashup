from django.db import models
from django.utils.translation import ugettext as _


class PostalCode(models.Model):
    postal_code = models.CharField(
        unique=True, verbose_name=_('Postal Code'), max_length=8
    )
    area = models.CharField(max_length=64, verbose_name=_('Area'))
    region = models.CharField(max_length=64, verbose_name=_('Region'))
    city = models.CharField(max_length=64, verbose_name=_('City'))
    latitude = models.FloatField(verbose_name=_('Latitude'))
    longitude = models.FloatField(verbose_name=_('Longitude'))

    def __str__(self):
        return '{} -- {}, {}, {}'.format(
            str(self.postal_code),
            self.area, self.region, self.city
        )


class Street(models.Model):
    postal_code = models.ForeignKey(
        PostalCode, verbose_name=_('Postal Code Id')
    )
    street = models.CharField(max_length=64, verbose_name=_('Street'))

    def __str__(self):
        return '{} :: {} -- {}'.format(
            str(self.id), str(self.postal_code), self.street
        )
