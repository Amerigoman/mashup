# -*- coding: utf-8 -*-
import requests
import json
import pprint
from bs4 import BeautifulSoup

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db.models import Q
from .models import PostalCode, Street
from rest_framework import viewsets, generics
from .serializers import PostalCodeSerializer,\
    StreetSerializer


def index(request):
    return render(request, "index.html")


def search_codes(request, text):
    result = PostalCode.objects.filter(postal_code__contains=text).values(
        'postal_code', 'area', 'region', 'city', 'latitude', 'longitude'
    )

    return JsonResponse({'result': list(result)})


def get_articles(request):
    result = []
    params_list = []

    place = request.GET.get('place', None)
    lang = request.GET.get('lang', None)

    if place:
        params_list.append('geo={}'.format(place))
    if lang:
        params_list.append('hl={}'.format(lang))

    params = '&'.join(params_list)
    url = 'https://news.google.com.ua/news/section?' + params

    content = requests.get(url).content
    parsed_html = BeautifulSoup(content, 'lxml')
    articles = parsed_html.body.find_all('a', attrs={'class': 'article'})

    for item in articles:
        title = item.find('span', attrs={'class': 'titletext'})
        if title:
            result.append({
                "href": item['href'],
                "title": title.text,
            })

    json_result = json.dumps(result, ensure_ascii=False).encode('utf-8')
    # pprint.pprint(result)
    print(params)

    return HttpResponse(json_result)


class PostalCodeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = PostalCode.objects.all().order_by('-postal_code')
    serializer_class = PostalCodeSerializer


class StreetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Street.objects.all()
    serializer_class = StreetSerializer


class PostalCodeListDependsOnCoordinates(generics.ListAPIView):
    serializer_class = PostalCodeSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        sw_lat, sw_lng = self.kwargs['sw'].split(',')
        ne_lat, ne_lng = self.kwargs['ne'].split(',')

        if sw_lng <= ne_lng:
            results = PostalCode.objects.filter(
                Q(latitude__gte=sw_lat) & Q(latitude__lte=ne_lat) &
                (Q(longitude__gte=sw_lng) & Q(longitude__lte=ne_lng))
            ).order_by('?')[:15]
        else:
            results = PostalCode.objects.filter(
                Q(latitude__gte=sw_lat) & Q(latitude__lte=ne_lat) &
                (Q(longitude__gte=sw_lng) | Q(longitude__lte=ne_lng))
            ).order_by('?')[:15]

        return results


def write_bd(request):
    print('start postal_code creating')
    with open('mashup/source/ZIP_FULL_INFO.txt', 'r') as input_file:
        data = []
        lines = input_file.readlines()

        for line in lines:
            item = line.split(';')

            data.append(
                PostalCode(
                    postal_code=item[3],
                    area=item[0],
                    region=item[1],
                    city=item[2],
                    latitude=item[6],
                    longitude=item[7]
                )
            )

        PostalCode.objects.bulk_create(data)

    print('end postal_code creating...')

    with open('mashup/source/H.csv', 'r') as input_file:
        data = []
        count = 0
        lines = input_file.readlines()

        for line in lines:
            if not count:
                count += 1
                continue

            item = line.split(';')

            try:
                postal_code = PostalCode.objects.get(postal_code=item[3])
                data.append(
                    Street(
                        postal_code=postal_code,
                        street=item[4]
                    )
                )
            except PostalCode.DoesNotExist:
                print(count)
                count += 1
                continue

            print(count)
            count += 1

        Street.objects.bulk_create(data)

    return HttpResponse('Done')
