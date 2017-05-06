from bin.file_handling import make_part_of_data, combine_parts
from bin import constants as const


if __name__ == '__main__':
    # for i in range(1, 4):
    #     make_part_of_data(i)

    # for i in range(4, const.TOTAL_PARTS_AMOUNT + 1):
    #     make_part_of_data(i)

    combine_parts(const.TOTAL_PARTS_AMOUNT)
