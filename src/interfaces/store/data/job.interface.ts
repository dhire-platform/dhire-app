import {
  ApplicantStatus,
  JobLevel,
  JobType,
  SalaryType,
} from 'src/lib/enums/enums';
import { skill } from '../../response.interface';

export type IJob = {
  id: string;
  job_title: string;
  job_company: string;
  job_company_image: string;
  job_salary_min: number;
  job_salary_max: number;
  job_location: any;
  job_description: string;
  job_type: number;
  job_experience_level: number;
};
export type Applicant = {
  user_id: string;
  interview_step: string;
  next_interview_date: Date;
  archieved: boolean;
  status: ApplicantStatus;
};

export type IJobs = {
  title: string;
  description: string[];
  location: string;
  from: Date;
  id?: string;
  companyId?: string; // this is userProfile id
  jobLevel?: JobLevel;
  jobType: JobType[];
  minSalary?: number;
  maxSalary?: number;
  salaryType?: SalaryType;
  applicants?: Applicant[];
  recruiterProfileUserId?: string; // this is user id
  skills: skill[];
  benefits: string[];
  userId?: string;
};
