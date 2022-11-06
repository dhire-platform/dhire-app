import {
  IUser,
  IUserProfile,
  IWallet,
  ISkill,
  IProject,
  IEducation,
  ISocial,
  IExperience,
} from './data/data.index';

export interface IStoreDataResponse {
  success: boolean;
  message: string;
  data:
    | IUserProfile
    | IWallet
    | ISkill
    | IProject
    | IEducation
    | ISocial
    | IExperience
    | IUser;
}
export interface IProfileStore {
  user: IUser;
  createNewUser: (data: IUser) => Promise<IStoreDataResponse>;
  updateUser: (data: IUser) => void;

  userProfile: IUserProfile;
  createNewUserProfile: (data: IUserProfile) => Promise<IStoreDataResponse>;
  updateUserProfile: (data: IUserProfile) => void;

  wallet: IWallet;
  updateWallet: (wallet: IWallet) => void;

  experience: IExperience[];
  setExperience: (experience: IExperience) => void;

  skill: ISkill[];
  setSkills: (skills: string) => void;

  projects: IProject[];

  education: IEducation[];

  social: ISocial;
}
