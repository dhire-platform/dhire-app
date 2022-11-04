import { roleEnum, SkillLevel } from 'src/enums/enums';

export type skill = {
  name: string;
  level: SkillLevel;
};

export interface IUseStore {
  isAuth: boolean;
  setAuth: (value: boolean) => any;
}

export interface IPagination {
  onPageChange: any;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

export type IJob = {
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

export interface IProfileStore {
  loading: boolean;
  error: string | undefined;
  user: IProfile;
  wallet: IWallet;
  skill?: skill[];
  projects?: IProject[];
  education?: IEducation;
  socials?: ISocial;
  setWallet: (pubKey: string) => void;
  setWallet2: (wallet: IWallet) => void;
  setUser: (data: IProfile) => void;
  editProfile: (data: IProfile) => Promise<any>;
  createUser: (data: any) => any;
  setSkills: (skills: string[]) => any;
  getUser: () => void;
  deleteUser: () => void;
  setExperience: (experience: IExperience[]) => Promise<any>;
}

export interface IWallet {
  walletId: string | undefined;
  walletName?: string | undefined;
  connected: boolean;
  loading?: boolean;
}

export interface IUseStore {
  isAuth: boolean;
  setAuth: (value: boolean) => any;
}

export interface IProfile {
  id: string | undefined;
  userName: string | undefined;
  walletId: string | undefined;
  name: string | undefined;
  role: roleEnum;
  about: string | undefined;
  achievements: string | undefined;
  image: string | undefined;
  skills: skill[];
  experience: IExperience[];
  location: string | undefined;
  website: string | undefined;
  achievement: string | undefined;
}
export interface IExperience {
  company?: string;
  image?: string;
  designation?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  location?: string;
  description?: string;
}

export interface IEducation {
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  location?: string;
  description?: string;
}

export interface IProject {
  title: string;
  link?: string;
  from?: string;
  to?: string;
  current?: boolean;
  description?: string;
}

export interface ISocial {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export interface IFilter {
  filter_type: string;
  filter_values: any[];
  compare?: { min: number; max: number };
  sort?: 'increasing' | 'decreasing';
  search?: boolean;
}
