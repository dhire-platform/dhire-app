import { roleEnum } from 'src/enums/enums';
interface IUseStore {
  isAuth: boolean;
  setAuth: (value: boolean) => any;
}
interface IProfile {
  id?: string;
  userName: string;
  name: string;
  role?: roleEnum;
  about?: string;
  achievements?: string;
  image?: string;
  skills?: string[];
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

export type { IProfile, IExperience, IEducation, ISocial, IProject, IUseStore };
