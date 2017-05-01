import time


def print_app_in_process_time(start_time, description):
    current_time = time.time()
    delta = current_time - start_time
    print('{} :: in process {} sec ...'.format(description, delta))
