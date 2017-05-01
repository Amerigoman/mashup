import math


ZIP_CODE_QUANTITY = 26188
REQUESTS_AT_ONCE = 2400
TOTAL_PARTS_AMOUNT = math.ceil(ZIP_CODE_QUANTITY / REQUESTS_AT_ONCE)
REQUESTS_AT_LAST = ZIP_CODE_QUANTITY - (
    REQUESTS_AT_ONCE * (TOTAL_PARTS_AMOUNT - 1)
)

txt_file = 'HText.txt'
csv_file = 'H.csv'


if __name__ == '__main__':
    print('Parts amount :: {}\nRequest at last :: {}'.format(
        TOTAL_PARTS_AMOUNT, REQUESTS_AT_LAST)
    )
