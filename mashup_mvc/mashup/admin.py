from django.utils.translation import ugettext as _
from django.contrib import admin
from .models import PostalCode, Street


class StreetInline(admin.StackedInline):
    model = Street
    extra = 5


class PostalCodeAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['postal_code']}),
        (_('Postal Code Information'), {
            'fields': ['area', 'region', 'city', 'latitude', 'longitude'],
            'classes': ['collapse']
        }),
    ]
    search_fields = ['postal_code']
    inlines = [StreetInline]


class StreesAdmin(admin.ModelAdmin):
    search_fields = ['street']


admin.site.register(PostalCode, PostalCodeAdmin)
admin.site.register(Street, StreesAdmin)
