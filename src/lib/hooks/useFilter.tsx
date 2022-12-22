import { IFilter } from '@/interfaces/filter.interface';
import { IJobs } from '@/interfaces/store/data/job.interface';

type filterProps = {
  all_filters: Array<IFilter>;
  fullArray: IJobs[];
};

function performIntersection(arr1: any[], arr2: any[]) {
  const intersectionResult = arr1.filter((x) => arr2.indexOf(x) !== -1);

  return intersectionResult;
}

export const useFilter = ({ all_filters, fullArray }: filterProps) => {
  let filteredArray: IJobs[] = [...fullArray];

  all_filters.forEach((filter) => {
    let newFilteredData: IJobs[];
    if (filter.compare) {
      let { base, compareTo } = filter.compare;
      newFilteredData = filteredArray.filter((item) => {
        let value = item[base[0] as keyof IJobs] || 0;
        let value2 = item[base[1] as keyof IJobs] || 0;
        if (compareTo[0] < value && compareTo[1] > value2) {
          return item;
        }
      });
    } else if (filter.sort) {
      newFilteredData = filteredArray.sort((a, b) => {
        let value1 = new Date(a[filter.filter_type as keyof IJobs] as Date);
        let value2 = new Date(b[filter.filter_type as keyof IJobs] as Date);
        return value1.getTime() - value2.getTime();
      });
      newFilteredData =
        filter.sort === 'increasing'
          ? newFilteredData.reverse()
          : newFilteredData;
    } else if (filter.search) {
      newFilteredData = filteredArray.filter((item) => {
        let value = item[filter.filter_type as keyof IJobs] as string;
        if (value.toLowerCase().includes(filter.filter_values[0])) {
          return item;
        }
      });
    } else {
      newFilteredData = filteredArray.filter((item) => {
        let value = item[filter.filter_type as keyof IJobs] as string[];

        let selected = performIntersection(filter.filter_values, value);
        if (selected[0]) return item;
        return;
      });
    }

    filteredArray =
      filter.filter_values.length > 0 ? [...newFilteredData] : filteredArray;
  });
  return filteredArray;
};
