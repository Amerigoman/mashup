from django.http import HttpResponse
from .models import PostalCode, Street


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
