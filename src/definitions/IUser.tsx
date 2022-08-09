interface IUseStore {
  isAuth: boolean;
  setAuth: (value: boolean) => any;
}
interface IProfile {
  userProfile: {
    id?: string;
    user?: string;
    userId?: string;
    bio?: string;
    image?: string;
    skills?: string[];
    location?: string;
    website?: string;
    achievement?: string;
    experience?: IExperience;
    education?: IEducation;
    projects?: IProject;
    social?: ISocial;
  };
}
interface IExperience {
  company?: string;
  designation?: string;
  from?: string;
  to?: string;
  current?: boolean;
  location?: string;
  description?: string;
}

interface IEducation {
  education: {
    school?: string;
    degree?: string;
    fieldOfStudy?: string;
    from?: string;
    to?: string;
    current?: boolean;
    location?: string;
    description?: string;
  };
}

interface IProject {
  project: {
    title: string;
    link?: string;
    from?: string;
    to?: string;
    current?: boolean;
    description?: string;
  };
}

interface ISocial {
  socials: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
}

export type { IProfile, IExperience, IEducation, ISocial, IProject, IUseStore };
