# -*- coding: utf-8 -*-
import time
import asyncio
from aiohttp import ClientSession
from .functions import print_app_in_process_time
from .entity import LineRecord
from . import constants as const


time_start = time.time()


async def fetch_and_write_data(item, n):
    async with ClientSession() as session:
        await asyncio.sleep(0.04*n)
        async with session.get(item.url) as response:
            response = await response.json()

            if response['status'] == 'OK':
                latitude = response['results'][0]['geometry']['location']['lat']
                longitude = response['results'][0]['geometry']['location']['lng']

                item.completed_line = item.line + ';{};{}\n'.format(
                    latitude, longitude
                )
                item.is_done = True
            item.response_status = response['status']
            print_app_in_process_time(
                time_start, 'LineRecord count - {}'.format(n)
            )


def make_part_of_data(part):
    loop = asyncio.get_event_loop()
    tasks = []
    line_instances = []
    stats = ''

    with open('source/' + const.csv_file, 'r') as input_file, \
            open('source/ZIP_' + str(part) + '.txt', 'w+') as output_file:
        lines = input_file.readlines()
        start = (part - 1) * const.REQUESTS_AT_ONCE
        end = part * const.REQUESTS_AT_ONCE \
            if part != const.TOTAL_PARTS_AMOUNT \
            else const.REQUESTS_AT_ONCE * (const.TOTAL_PARTS_AMOUNT - 1) + const.REQUESTS_AT_LAST
        print('part :: {}, delta :: {}'.format(part, end - start))

        for c in range(1, len(lines)):
            temp = LineRecord(c, lines[c], part)
            line_instances.append(temp)

        print_app_in_process_time(time_start, 'LineRecord formed')
        inst_set = list(set(line_instances))
        print(len(inst_set))

        stats += '***** PART :: {} *****\n'.format(part)
        stats += 'Amount of requests :: {}\n\n'.format(len(inst_set[start:end]))

        for i in range(start, end):
            task = asyncio.ensure_future(
                fetch_and_write_data(inst_set[i], i-start)
            )
            tasks.append(task)

        loop.run_until_complete(asyncio.wait(tasks))

        success_count = 0
        failed_requests = 0
        failed_requests_info = '\n\n'

        for i in range(start, end):
            item = inst_set[i]

            if item.is_done:
                success_count += 1
                output_file.write(item.completed_line)
            else:
                failed_requests += 1
                if item.response_status == 'OVER_QUERY_LIMIT':
                    print(item.url)
                    failed_requests_info += '***{};{}\n'.format(
                        item.line, item.response_status
                    )
                else:
                    failed_requests_info += '{};{}\n'.format(
                        item.line, item.response_status
                    )

        stats += 'Success count :: {}\nFailed requests :: {}\n{}'.format(
            success_count, failed_requests, failed_requests_info
        )

        with open('source/ZIP_' + str(part) + '_stats.txt', 'w+') as output_stats:
            output_stats.write(stats)

        print_app_in_process_time(time_start, 'It takes')


def combine_parts(num_parts):
    with open('source/ZIP_FULL_INFO.txt', 'w+') as output_file:
        for i in range(1, num_parts + 1):
            with open('source/ZIP_' + str(i) + '.txt', 'r') as input_file:
                lines = input_file.readlines()

                for line in lines:
                    output_file.write(line)

    print_app_in_process_time(time_start, 'It takes')
