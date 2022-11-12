import { IJobs } from '@/interfaces/store/data/job.interface';
import { skill } from '@/interfaces/response.interface';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { JobType } from 'src/lib/enums/enums';
import create from 'zustand';
import produce from 'immer';
import axios from 'axios';
import {
  IJobStore,
  IStoreDataResponse,
} from '@/interfaces/store/jobStore.interface';

const jobType: JobType[] = [];
const skills: skill[] = [];

const job = {
  jobType,
  skills,
};

export const useJobStore = create<IJobStore>((set, get) => ({
  job: [],

  createJob: async (data: IJobs): Promise<IStoreDataResponse> => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/jobPost', data)
        .then((newJob) => {
          set(
            produce((draft) => {
              draft.job = [...draft.job, newJob.data];
            })
          );

          resolve({
            success: true,
            message: 'new job posted succesfully',
            data: newJob.data,
          });
        })
        .catch((err) => {
          console.log(err.response.data.error);
          reject({
            success: true,
            message: 'error posting new job',
            data: err,
          });
        });
    });
  },

  updateJob: (data: IJobs) => {
    set(
      produce((draft) => {
        draft.job = data;
      })
    );
  },
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('jobStore', useJobStore);
}
