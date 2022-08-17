import { roleEnum } from 'src/enums/enums';

type skill = {
  name: string;
  level: SkillLevel;
};

interface IUseStore {
  isAuth: boolean;
  setAuth: (value: boolean) => any;
}

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
  projects: IProject[];
  education: IEducation;
  socials: ISocial;
  setWallet: (pubKey: string) => void;
  setUser: (data: IProfile) => void;
  editProfile: (data: IProfile) => Promise<any>;
  createUser: (data: any) => any;
  setSkills: (skills: string[]) => any;
  getUser: () => void;
  deleteUser: () => void;
  setExperience: (experience: IExperience[]) => Promise<any>;
}

interface IUseStore {
  isAuth: boolean;
  setAuth: (value: boolean) => any;
}

interface IProfile {
  id?: string;
  userName: string;
  walletId: string;
  name: string;
  role?: roleEnum;
  about?: string;
  achievements?: string;
  image?: string;
  skills?: skill[];
  experience?: IExperience[];
  location?: string;
  website?: string;
  achievement?: string;
}
interface IExperience {
  company?: string;
  image?: string;
  designation?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  location?: string;
  description?: string;
}

interface IEducation {
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  from?: Date;
  to?: Date;
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
  skill,
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
