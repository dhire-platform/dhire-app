import { IJob } from './store/data/job.interface';

export interface ISearch {
  data: [IJob];
  searchValue: string;
}
