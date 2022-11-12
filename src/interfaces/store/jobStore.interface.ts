import { IJobs } from './data/data.index';

export interface IStoreDataResponse {
  success: boolean;
  message: string;
  data: IJobs;
}
export interface IJobStore {
  job: IJobs[];
  createJob: (data: IJobs) => any;
  updateJob: (data: IJobs) => any;
}
