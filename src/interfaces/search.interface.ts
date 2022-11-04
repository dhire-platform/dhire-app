import { IJob } from './job/job.interface';

export interface ISearch {
  data: [IJob];
  searchValue: string;
}
