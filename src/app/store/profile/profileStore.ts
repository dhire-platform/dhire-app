import axios from 'axios';
import create from 'zustand';
import produce from 'immer';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { immer } from 'zustand/middleware/immer';

import {
  IStoreDataResponse,
  IProfileStore,
} from 'src/interfaces/store/profileStore.interface';
import {
  IUser,
  IUserProfile,
  IExperience,
  ISocial,
  ISkill,
  IWallet,
  IEducation,
  IProject,
} from 'src/interfaces/store/data/data.index';

const social: ISocial = {};
const experience: IExperience[] = [];
const education: IEducation[] = [];
const projects: IProject[] = [];
const skill: ISkill[] = [];
const wallet: IWallet = {
  connected: false,
  loading: false,
};
const user: IUser = {
  id: undefined,
  wallet: wallet,
  type: undefined,
  name: undefined,
  username: undefined,
};
const userProfile: IUserProfile = {
  userId: undefined,
  bio: undefined,
  image: undefined,
  skills: skill,
  location: undefined,
  website: undefined,
  experience: experience,
  education: education,
  projects: projects,
  social: social,
};

export const useProfileStore = create<IProfileStore>((set, get) => ({
  user: user,
  createNewUser: (data: IUser): Promise<IStoreDataResponse> => {
    return new Promise((resolve, reject) => {
      const newUserData = {
        wallet: data.wallet?.walletId,
        type: data.type,
        name: data.name,
        username: data.username,
      };
      axios
        .post('/api/user', newUserData)
        .then((newUser) => {
          const NewUser: IUser = {
            id: newUser.data.id,
            name: newUser.data.name,
            wallet: data.wallet,
            username: newUser.data.username,
          };
          set(
            produce((draft) => {
              draft.user = NewUser;
            })
          );
          resolve({
            success: true,
            message: 'new user created succesfully',
            data: newUser.data,
          });
        })
        .catch((err) => {
          reject({
            success: true,
            message: 'error creating new user',
            data: err,
          });
        });
    });
  },
  updateUser: async (data: IUser) => {
    set(
      produce((state) => {
        state.user = data;
      })
    );
  },

  userProfile: userProfile,
  createNewUserProfile: (data: IUserProfile): Promise<IStoreDataResponse> => {
    return new Promise((resolve, reject) => {
      set(
        produce((draft) => {
          draft.userProfile.image = data.image;
        })
      );
      const userData = {
        userId: get().user.id,
        name: get().user.name,
        bio: data.bio,
        image: data.image,
      };
      axios
        .post(`/api/userProfile`, userData)
        .then((res) => {
          resolve({
            success: false,
            message: 'User profile created succesfully',
            data: res.data,
          });
        })
        .catch((err) => {
          resolve({
            success: false,
            message: 'server response error ',
            data: err,
          });
        });
    });
  },
  updateUserProfile: (data: IUserProfile) => {
    set(
      produce((state) => {
        state.userProfile = data;
      })
    );
  },

  wallet: wallet,
  updateWallet: (wallet: IWallet) => {
    new Promise((resolve) => {
      set(
        produce((state) => {
          state.wallet = wallet;
        })
      );
      resolve({
        success: true,
        message: 'Wallet Set Successful',
        data: wallet,
      });
    });
  },

  skill: skill,
  setSkills: (skills: string) => {
    return new Promise((resolve, reject) => {
      //
    });
  },

  projects: projects,

  education: education,

  experience: experience,
  setExperience: (data: any) => {
    set(
      produce((state) => {
        state.userProfile.experience.push[data];
      })
    );
  },
  social: social,
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('profileStore', useProfileStore);
}
