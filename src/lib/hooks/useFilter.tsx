import { stringify } from 'querystring';
import { useMemo } from 'react';
import { IFilter } from '@/interfaces/filter.interface';
import { IJob } from '@/interfaces/job/job.interface';

type filterProps = {
  all_filters: Array<IFilter>;
  fullArray: IJob[];
};
// when add filter
//
export const useFilter = ({ all_filters, fullArray }: filterProps) => {
  let filteredArray: IJob[] = fullArray;

  all_filters.forEach((filter) => {
    console.log(filter.filter_values);
    let newFilteredData: IJob[];
    if (filter.compare) {
      newFilteredData = filteredArray.filter((item) => {
        let value = item[filter.filter_type as keyof IJob];
        if (
          filter.compare &&
          filter.compare.min < value &&
          filter.compare.max > value
        ) {
          return item;
        }
      });
    } else if (filter.sort) {
      newFilteredData = filteredArray.sort((a, b) => {
        let value1 = new Date(a[filter.filter_type as keyof IJob]);
        let value2 = new Date(b[filter.filter_type as keyof IJob]);
        return value1.getTime() - value2.getTime();
      });
      newFilteredData =
        filter.sort === 'increasing'
          ? newFilteredData.reverse()
          : newFilteredData;
    } else if (filter.search) {
      newFilteredData = filteredArray.filter((item) => {
        let value = item[filter.filter_type as keyof IJob];
        if (value.toLowerCase().includes(filter.filter_values[0])) {
          return item;
        }
      });
    } else {
      newFilteredData = filteredArray.filter((item) => {
        let value = item[filter.filter_type as keyof IJob];
        if (filter.filter_values.includes(value.toString())) {
          return item;
        }
      });
    }

    filteredArray =
      filter.filter_values.length > 0 ? [...newFilteredData] : filteredArray;
  });
  return filteredArray;
};
