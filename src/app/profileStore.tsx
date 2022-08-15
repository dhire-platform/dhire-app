import axios from 'axios';
import {
  IEducation,
  IExperience,
  IProfile,
  IProject,
  ISocial,
} from 'src/definitions/IUser';
import { roleEnum } from 'src/enums/enums';
import create, { StoreApi } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { IProfileStore, SkillLevel } from 'src/definitions/definitions';
// const myMiddleware = (f: any) =>
//   devtools(
//     persist(f)
//   );

export const useProfileStore = create<IProfileStore>((set, get) => ({
  user: {
    id: '',
    userName: '',
    wallet: '',
    name: '',
    role: roleEnum.RECRUIT,
    about: '',
    achievements: '',
    image: '',
    skills: ['hello', 'world'],
    location: '',
    website: '',
    achievement: '',
  },
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

  setPubKey: (publicKey: string) =>
    set((state: { user: any }) => ({
      ...state,
      user: {
        ...state.user,
        wallet: publicKey,
      },
    })),

  // todo: manage this request in a better way
  setSkills: async (skills: string[]) => {
    axios
      .put(`/api/user/${get().user.id}`, {
        skills: skills,
      })
      .then((res) => {
        console.log('skills update response ', res);
        set((state: { user: any }) => ({
          ...state,
          user: {
            ...state.user,
            skills,
          },
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  /** 
     * function:  creates a new user
     * @params:    newUserData
     * @returns:   none
     * @route:    /api/user
     * Note: it also creates a user profile bu hitting the url /api/user/{id}
     todo@1 : separate both the routes in backend and frontend
     todo@2: add update skills and achievements/education inside this function & do both requests in one request
       */

  createUser: async (data: any): Promise<any> => {
    axios
      .post('/api/user', {
        name: data.name,
        type: roleEnum.RECRUIT,
        wallet: get().user.wallet,
        username: data.userName,
      })
      .then((res) => {
        console.log(res);
        set((prevState: any) => ({
          user: {
            id: res.data.id,
            name: res.data.name,
            userName: res.data.username,
            about: data.about,
            image: data.image,
            ...prevState,
          },
        }));
        axios
          .post('/api/user', {
            userId: res.data.id,
            bio: data.about,
            image: data.image,
            skills: get().user.skills,
          })
          .then((res: any) => {
            console.log('update store response from server ', res);
            return res;
          })
          .catch((e) => {
            console.log('update store error from server ', e);
            return e;
          });
      })
      .catch((e) => {
        console.log('store error ', e);
        return e;
      });
  },

  /**
   * function:  gets the user profile
   * @params:    none
   * @returns:   none
   * @route:    `/api/user/${get().user.id}`
   * Note: it updates the user profile and gets back the response from the server
   * todo: handle error state & return type to the function
   */

  editProfile: async (data: IProfile) => {
    set((prevState: any) => ({
      user: {
        id: get().user.id,
        userName: prevState.user.userName,
        name: data.name,
        about: data.about,
        image: data.image,
        ...prevState,
      },
    }));

    const userData = {
      bio: get().user.about,
      image: get().user.image,
      skills: [
        { name: 'hello', level: SkillLevel.ADVANCED },
        { name: 'world', level: SkillLevel.BEGINNER },
      ],
      experience: get().experience,
      education: get().education,
      projects: get().projects,
    };
    console.log('data - ', userData, '\nuserid -', get().user.id);

    axios
      .put(`/api/user/${get().user.id}`, userData)
      .then((res) => {
        console.log('create user response from server - ', res);
      })
      .catch((err) => {
        console.log(err);
      });
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
}));

if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  mountStoreDevtool('profileStore', useProfileStore);
}
