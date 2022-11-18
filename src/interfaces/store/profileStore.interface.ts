import {
  IUser,
  IUserProfile,
  IWallet,
  ISkill,
  IProject,
  IEducation,
  ISocial,
  IExperience,
  IRecruiterProfile,
  ICompany,
} from './data/data.index';

export interface IStoreDataResponse {
  success: boolean;
  message: string;
  data:
    | IUserProfile
    | IRecruiterProfile
    | IWallet
    | ISkill
    | IProject
    | IEducation
    | ISocial
    | IExperience
    | IUser
    | ICompany;
}
export interface IProfileStore {
  user: IUser;
  createNewUser: (data: IUser) => Promise<IStoreDataResponse>;
  updateUser: (data: IUser) => void;
  resetUser: () => void;
  userProfile: IUserProfile;
  createNewUserProfile: (data: IUserProfile) => Promise<IStoreDataResponse>;
  updateUserProfile: (data: IUserProfile) => void;

  recruiterProfile: IRecruiterProfile;
  createNewRecruiterProfile: (
    data: IRecruiterProfile
  ) => Promise<IStoreDataResponse>;
  wallet: IWallet;
  updateRecruiterProfile: (data: IRecruiterProfile) => void;

  company: ICompany;
  createNewCompany: (data: ICompany) => Promise<IStoreDataResponse>;
  updateCompany: (data: ICompany) => void;

  updateWallet: (wallet: IWallet) => void;

  experience: IExperience[];
  setExperience: (experience: IExperience) => void;

  skill: ISkill[];
  setSkills: (skills: string) => void;

  projects: IProject[];

  education: IEducation[];

  social: ISocial;
}
