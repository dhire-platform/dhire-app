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
    skills: [
      { name: 'hello', level: SkillLevel.ADVANCED },
      { name: 'world', level: SkillLevel.BEGINNER },
    ],
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

  setWallet: (wallet?: string) =>
    set((state: { user: any }) => ({
      ...state,
      user: {
        ...state.user,
        wallet,
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
    return new Promise((resolve, reject) => {
      axios
        .post('/api/user', {
          name: data.name,
          type: roleEnum.RECRUIT,
          wallet: data.wallet,
          username: data.userName,
        })
        .then((res) => {
          set((prevState: any) => ({
            user: {
              id: res.data.id,
              name: res.data.name,
              userName: res.data.username,
              about: get().user.about,
              image: data.image,
              wallet: get().user.wallet,
              role: get().user.role,
              skills: get().user.skills,
              location: get().user.location,
              website: get().user.website,
              achievement: get().user.achievement,
            },
          }));
          console.log('1 - res for user create ', res.statusText);
          axios
            .post('/api/userProfile', {
              walletId: data.wallet,
              bio: data.about,
              image: data.image,
              skills: get().user.skills,
            })
            .then((response: any) => {
              console.log('2 - res for user profile create ', response.statusText);
              resolve(response);
            })
            .catch((e) => {
              resolve(e);
            });
        })
        .catch((err) => {
          resolve(err);
        });
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

  editProfile: async (data: any): Promise<any> => {
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
      skills: get().user.skills,
      experience: get().experience,
      education: get().education,
      projects: get().projects,
    };

    axios
      .put(`/api/user/${get().user.id}`, userData)
      .then((res) => {
        console.log('create user response from server - ', res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
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
  mountStoreDevtool('profileStore', useProfileStore);
}
