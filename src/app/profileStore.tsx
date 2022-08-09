import {
  IEducation,
  IExperience,
  IProfile,
  IProject,
  ISocial,
} from 'src/definitions/IUser';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAuthStore = create((set) => ({
  profile: {
    id: '',
    user: '',
    userId: '',
    bio: '',
    image: '',
    skills: [],
    location: '',
    website: '',
    achievement: '',
  },
  experiences: [],
  projects: [],
  education: {
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: true,
    location: '',
    description: '',
  },
  socials: {
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    github: '',
  },
  setProfile: () => set((state: IProfile) => ({ profile: state })),
  setEducation: () => set((state: IEducation) => ({ education: state })),
  setProjects: (projects: IProject[]) =>
    set((state: any) => ({ project: [projects, ...state.projects] })),
  setExperience: (experiences: IExperience[]) =>
    set((state: { experience: IExperience[] }) => ({
      project: [experiences, ...state.experience],
    })),
  setSocials: () => set((state: ISocial) => ({ socials: state })),
}));
