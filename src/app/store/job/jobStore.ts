import { IJobs } from '@/interfaces/job/job.interface';
import { skill } from '@/interfaces/response.interface';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { JobType } from 'src/lib/enums/enums';
import create from 'zustand';
import produce from 'immer';
import axios from 'axios';

interface IJobStore {
  job: IJobs;
  createJob: (data: IJobs) => any;
}

const jobType: JobType[] = [];
const skills: skill[] = [];

const job = {
  jobType,
  skills,
};

export const useProfileStore = create<IJobStore>((set, get) => ({
  job: job,

  createJob: async (data: IJobs): Promise<any> => {
    set(
      produce((draft) => {
        draft.job = data;
      })
    );
    return new Promise((resolve, reject) => {
      axios
        .post('/api/jobPost', data)
        .then((newJob) => {
          set(
            produce((draft) => {
              draft.job = newJob;
            })
          );

          resolve({
            success: true,
            message: 'new job posted succesfully',
            data: newJob.data,
          });
        })
        .catch((err) => {
          reject({
            success: true,
            message: 'error posting new job',
            data: err,
          });
        });
    });
  },
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('profileStore', useProfileStore);
}
