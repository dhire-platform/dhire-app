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
  setProfile: (profile: IProfile) => void;
  setPubKey: (pubKey: string) => void;
}

export const useProfileStore = create<IProfileStore>((set) => ({
  userProfile: {
    id: '',
    name: '',
    role: roleEnum.RECRUIT,
    bio: '',
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
  setProfile: (data: IProfile) => {
    set((prevState) => ({
      userProfile: {
        name: data.name,
        bio: data.bio,
        skills: data.skills,
        ...prevState,
      },
    }));
  },

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
