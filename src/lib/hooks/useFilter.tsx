import { IFilter } from '@/interfaces/filter.interface';
import { IJobs } from '@/interfaces/store/data/job.interface';

type filterProps = {
  all_filters: Array<IFilter>;
  fullArray: any[];
};

function performIntersection(arr1: any[] = [], arr2: any[] = []) {
  const intersectionResult = arr1.filter((x) => arr2.indexOf(x) !== -1);

  return intersectionResult;
}

export const useFilter = ({ all_filters, fullArray }: filterProps) => {
  let filteredArray: any[] = [...fullArray];

  all_filters.forEach((filter) => {
    let newFilteredData: any[];
    if (filter.compare) {
      let { base, compareTo } = filter.compare;
      newFilteredData = filteredArray.filter((item: any) => {
        let value = item[base[0]] || 0;
        let value2 = item[base[1]] || 0;
        if (compareTo[0] < value && compareTo[1] > value2) {
          return item;
        }
      });
    } else if (filter.sort) {
      newFilteredData = filteredArray.sort((a: any, b: any) => {
        let value1 = new Date(a[filter.filter_type] as Date);
        let value2 = new Date(b[filter.filter_type] as Date);
        return value1.getTime() - value2.getTime();
      });
      newFilteredData =
        filter.sort === 'increasing'
          ? newFilteredData.reverse()
          : newFilteredData;
    } else if (filter.search) {
      newFilteredData = filteredArray.filter((item: any) => {
        let value =
          filter.filter_type === 'bio'
            ? item.UserProfile[0]?.bio
            : (item[filter.filter_type] as string);
        if (value && value.toLowerCase().includes(filter.filter_values[0])) {
          return item;
        } else return;
      });
    } else {
      newFilteredData = filteredArray.filter((item: any) => {
        let value = item[filter.filter_type] as string[];
        if (filter.filter_type === 'skills') {
          value = item.UserProfile[0]?.skills.map((s: any) => s.name);
        }

        let selected = performIntersection(filter.filter_values, value);
        console.log(value, selected);
        if (selected[0]) return item;
        return;
      });
    }

    filteredArray =
      filter.filter_values.length > 0 ? [...newFilteredData] : filteredArray;
  });
  return filteredArray;
};
