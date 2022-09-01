import axios from 'axios';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { IProfile, IProfileStore, IWallet } from 'src/definitions/definitions';
import { roleEnum, SkillLevel } from 'src/enums/enums';
import create from 'zustand';

const user = {
  id: undefined,
  userName: undefined,
  walletId: undefined,
  name: undefined,
  role: roleEnum.RECRUIT,
  about: undefined,
  achievements: undefined,
  image: undefined,
  experience: [],
  skills: [],
  location: undefined,
  website: undefined,
  achievement: undefined,
};

const wallet = {
  walletId: undefined,
  walletName: undefined,
  connected: false,
  loading: false,
};

const socials = {
  youtube: undefined,
  twitter: undefined,
  facebook: undefined,
  linkedin: undefined,
  instagram: undefined,
  github: undefined,
};

export const useProfileStore = create<IProfileStore>((set, get) => ({
  loading: false,
  error: undefined,
  user: user,
  wallet: wallet,
  skill: [],
  projects: [],
  education: {},
  socials: socials,

  setWallet: (wallet?: string) => {
    set((state: { user: any }) => ({
      ...state,
      user: {
        ...state.user,
        walletId: wallet,
      },
    }));
  },

  setWallet2: (wallet: IWallet) => {
    wallet.loading = true;
    set(() => ({ wallet: wallet }));
  },

  setSkills: async (skills: string[]) => {
    set((state: { user: any }) => ({
      ...state,
      loading: true,
    }));

    const skillsArr = skills.map((skill) => ({
      name: skill,
      level: SkillLevel.BEGINNER,
    }));
    set((state: { user: any }) => ({
      ...state,
      user: {
        ...state.user,
        skills: [...skillsArr],
      },
    }));
    console.log(get().user);
    axios
      .put(`/api/userProfile/${get().user.id}`, get().user)
      .then((res) => {
        console.log('skills update response ', res);

        console.log('skills -', get().user.skills);
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
      });
  },

  /**
     * function:  creates a new user
     * @params:    newUserData
     * @returns:   none
     * @route:    /api/user
     * Note: it also creates a user profile bu hitting the url /api/user/{id}
     todo: add update skills and achievements/education inside this function & do both requests in one request
    */

  createUser: async (data: any): Promise<any> => {
    set((state: { user: any }) => ({
      ...state,
      loading: true,
    }));
    return new Promise((resolve) => {
      axios
        .post('/api/user', {
          name: data.name,
          type: roleEnum.RECRUIT,
          wallet: data.walletId,
          username: data.userName,
        })
        .then((res) => {
          {
            /*
          res.data = {
            createdAt: "2022-08-16T19:10:09.283Z"
            id: "62fbeb9163a9e4f1652c1ddf"
            name: "Irfan Asif"
            type: "APPLICANT"
            updatedAt: "2022-08-16T19:10:09.283Z"
            username: "demonicirfan"
            wallet: "FkaHjeKxxVj4gzXmzeq4vsJEgWNRKCEjefFDQvuy6sGi" }

         */
          }
          set(() => ({
            user: {
              id: res.data.id,
              name: res.data.name,
              userName: res.data.username,
              about: get().user.about,
              image: data.image,
              walletId: data.walletId,
              role: get().user.role,
              skills: get().user.skills,
              location: get().user.location,
              website: get().user.website,
              achievement: get().user.achievement,
            } as IProfile,
          }));

          axios
            .post('/api/userProfile', {
              walletId: data.walletId,
              bio: data.about,
              image: data.image,
              skills: get().user.skills,
            })
            .then((response: any) => {
              // eslint-disable-next-line prettier/prettier
              console.log(
                '3 - res for user profile create ',
                response.statusText
              );
              resolve(res);
              set((state: { user: any }) => ({
                ...state,
                loading: false,
              }));
            })
            .catch((e) => {
              resolve(e);
              set((state: { user: any }) => ({
                ...state,
                loading: false,
              }));
            });
        })
        .catch((err) => {
          resolve(err);
        });
    });
  },

  setUser: async (data: any) => {
    set((_prevState: any) => ({
      user: {
        ...data,
      },
    }));
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
    set((state: { user: any }) => ({
      ...state,
      loading: true,
    }));
    return new Promise((resolve, reject) => {
      set((prevState: any) => ({
        user: {
          ...prevState.user,
          ...data,
          skills: [
            { name: 'hello', level: SkillLevel.ADVANCED },
            { name: 'world', level: SkillLevel.BEGINNER },
          ],
        },
      }));

      const userData = get().user as IProfile;
      console.log('user - ', userData);

      axios
        .put(`/api/userProfile/${get().user.id}`, userData)
        .then((res) => {
          set((state: { user: any }) => ({
            ...state,
            loading: false,
          }));
          resolve(res);
        })
        .catch((err) => {
          set((state: { user: any }) => ({
            ...state,
            loading: false,
          }));
          reject(err);
        });
    });
  },

  getUser: async () => {
    set((state: { user: any }) => ({
      ...state,
      loading: true,
    }));
    axios
      .get('/api/user')
      .then((res) => {
        console.log(res);
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
      });
  },

  deleteUser: async () => {
    set((state: { user: any }) => ({
      ...state,
      loading: true,
    }));
    axios
      .delete('/api/user')
      .then((res) => {
        console.log(res);
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
      });
  },

  setExperience: async (data: any): Promise<any> => {
    set((state: { user: any }) => ({
      ...state,
      loading: true,
    }));
    return new Promise((resolve, reject) => {
      if (get().user.experience?.length) {
        set((prevState: IProfileStore) => ({
          user: {
            ...prevState.user,
            experience: [...data, ...prevState.user.experience!],
          },
        }));
      } else {
        set((prevState: IProfileStore) => ({
          user: {
            ...prevState.user,
            experience: [...data],
          },
        }));
      }

      console.log('user data after adding experience ', get().user);
      axios
        .put('/api/userProfile/' + get().user.id, get().user)
        .then((res) => {
          resolve(res);
          set((state: { user: any }) => ({
            ...state,
            loading: false,
          }));
        })
        .catch((e) => {
          reject(e);
          set((state: { user: any }) => ({
            ...state,
            loading: false,
          }));
        });
    });
  },
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('profileStore', useProfileStore);
}
