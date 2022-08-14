import axios from 'axios';
import {
  IEducation,
  IExperience,
  IProfile,
  IProject,
  ISocial,
} from 'src/definitions/IUser';
import { roleEnum } from 'src/enums/enums';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IProfileStore {
  userProfile: IProfile;
  pubKey: string;
  experience: IExperience[];
  projects: IProject[];
  education: IEducation;
  socials: ISocial;
  // setSkills?: (skills: string[]) => void;
  setProfile: (profile: IProfile, pubKey: string) => void;
  setSkills: (skills: string[]) => void;
  getUser: () => void;
  deleteUser: () => void;
  setExperience: (experience: IExperience[]) => void;
  setPubKey: (pubKey: string) => void;
}

export const useProfileStore = create<IProfileStore>((set) => ({
  userProfile: {
    id: '',
    userName: '',
    name: '',
    role: roleEnum.RECRUIT,
    about: '',
    achievements: '',
    image: '',
    skills: [],
    location: '',
    website: '',
    achievement: '',
  },
  pubKey: '',
  experience: [],
  projects: [],
  education: {},
  socials: {
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    github: '',
  },

  setSkills: (skills: string[]) => {
    set((state) => ({
      ...state,
      userProfile: {
        ...state.userProfile,
        skills,
      },
    }));
  },

  setProfile: async (data: IProfile, pubKey: string) => {
    axios
      .post('/api/user', {
        name: data.name,
        type: 'APPLICANT',
        wallet: pubKey,
        username: data.userName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    set((prevState) => ({
      userProfile: {
        name: data.name,
        userName: data.userName,
        skills: data.skills,
        about: data.about,
        image: data.image,
        ...prevState,
      },
    }));
  },

  getUser: async () => {
    axios
      .get('/api/user')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteUser: async () => {
    axios
      .delete('/api/user')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  setExperience: (data: any) =>
    set((prevState: IProfileStore) => ({
      experience: [data, ...prevState.experience],
    })),

  setPubKey: (publicKey: string) => set({ pubKey: publicKey }),

  // setEducation: () => set((state: IEducation) => ({ education: state })),
  // setProjects: (projects: IProject[]) =>
  //   set((state: any) => ({ project: [projects, ...state.projects] })),
  // setExperience: (experiences: IExperience[]) =>
  //   set((state: { experience: IExperience[] }) => ({
  //     project: [experiences, ...state.experience],
  //   })),
  // setSocials: () => set((state: ISocial) => ({ socials: state })),
}));
