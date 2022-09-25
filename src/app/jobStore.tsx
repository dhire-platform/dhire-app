import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';

type Job = {
  job_title: string;
  job_company: string;
  job_company_image: string;
  job_salary_min: number;
  job_salary_max: number;
  job_location: string;
  job_description: string;
  job_type: number;
  job_experience_level: number;
};

interface IJobStore {
  job: Job;
  createJob: (data: any) => any;
}

const job = {
  job_title: '',
  job_company: '',
  job_company_image: '',
  job_salary_min: 0,
  job_salary_max: 0,
  job_location: '',
  job_description: '',
  job_type: 0,
  job_experience_level: 0,
};

export const useProfileStore = create<IJobStore>((set, get) => ({
  job: job,

  createJob: async (data: any): Promise<any> => {
    console.log('loging job data - ', data);
    return new Promise((resolve) => {
      resolve(true);
    });
  },
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('profileStore', useProfileStore);
}
