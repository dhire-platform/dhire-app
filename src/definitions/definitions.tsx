import { roleEnum } from 'src/enums/enums';

interface IPagination {
  onPageChange: any;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

type IJob = {
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

interface IProfileStore {
  user: IProfile;
  experience: IExperience[];
  projects: IProject[];
  education: IEducation;
  socials: ISocial;
  setWallet: (pubKey: string) => void;
  editProfile: (data: IProfile) => Promise<any>;
  createUser: (data: any) => any;
  setSkills: (skills: string[]) => any;
  getUser: () => void;
  deleteUser: () => void;
  setExperience: (experience: IExperience[]) => void;
}

interface IUseStore {
  isAuth: boolean;
  setAuth: (value: boolean) => any;
}

type skill = {
  name: string;
  level: SkillLevel;
};
interface IProfile {
  id?: string;
  userName: string;
  wallet: string;
  name: string;
  role?: roleEnum;
  about?: string;
  achievements?: string;
  image?: string;
  skills?: skill[];
  location?: string;
  website?: string;
  achievement?: string;
}
interface IExperience {
  company?: string;
  image?: string;
  designation?: string;
  from?: string;
  to?: string;
  current?: boolean;
  location?: string;
  description?: string;
}

interface IEducation {
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  from?: string;
  to?: string;
  current?: boolean;
  location?: string;
  description?: string;
}

interface IProject {
  title: string;
  link?: string;
  from?: string;
  to?: string;
  current?: boolean;
  description?: string;
}

interface ISocial {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export enum SkillLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export type {
  IPagination,
  IProfileStore,
  IJob,
  IProfile,
  IExperience,
  IEducation,
  ISocial,
  IProject,
  IUseStore,
};
