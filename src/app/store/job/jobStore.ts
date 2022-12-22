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
          console.log(err);
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

  editJob: async (data: IJobs): Promise<IStoreDataResponse> => {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/jobPost/' + data.id, data)
        .then((newJob) => {
          set(
            produce((draft) => {
              let newData = draft.job.filter(
                (item: IJobs) => item.id !== newJob.data.id
              );
              draft.job = [...newData, newJob.data];
            })
          );
          resolve({
            success: true,
            message: 'Job updated succesfully',
            data: newJob.data,
          });
        })
        .catch((err) => {
          console.log(err);
          reject({
            success: true,
            message: 'error updating job',
            data: err,
          });
        });
    });
  },
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('jobStore', useJobStore);
}
