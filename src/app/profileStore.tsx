/* eslint-disable no-async-promise-executor */
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

  createUser: async (data: {
    name: string;
    userName: string;
    image: string;
    walletId: string;
  }): Promise<any> => {
    set((state: { user: any }) => ({
      ...state,
      loading: true,
    }));
    return new Promise(async (resolve) => {
      const newUser = await axios.post('/api/user', {
        wallet: data.walletId,
        type: roleEnum.RECRUIT,
        name: data.name,
        username: data.userName,
      });

      console.log('2 - new user response ', newUser);
      if (!newUser.data.id) return;

      set(() => ({
        user: {
          id: newUser.data.id,
          name: newUser.data.name,
          userName: newUser.data.username,
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

      set((state: { user: IProfile }) => ({
        ...state,
        loading: false,
      }));
      resolve(newUser);
    });
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

  setUser: async (data: any) => {
    console.log('1 setUser called data passed = ', data);
    // set data to user
    set((state: { user: any }) => ({
      ...state,
      user: {
        ...data,
      },
    }));
    console.log('2 - user set to ', get().user);
  },

  editProfile: async (data: any): Promise<any> => {
    set((state: { user: any }) => ({
      ...state,
      loading: true,
    }));
    return new Promise(async (resolve, reject) => {
      set((prevState: any) => ({
        user: {
          ...prevState.user,
          about: data.about,
          image: data.image,
          name: data.name,
        },
      }));

      const userData = {
        walletId: data.walletId,
        name: data.name,
        bio: data.about,
        image: data.image,
      };

      console.log('update data - ', userData);
      try {
        const updateProfileRes = await axios.put(
          `/api/userProfile/${get().user.id}`,
          userData
        );
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
        resolve(updateProfileRes);
      } catch (error) {
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
        reject(error);
      }
    });
  },

  editUserInfo: async (data: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      set((prevState: any) => ({
        user: {
          about: data.about,
          image: data.image,
          name: data.name,
          ...prevState.user,
        },
      }));

      const userData = {
        walletId: data.walletId,
        name: data.name,
        bio: data.about,
        image: data.image,
      };

      console.log('update data - ', userData);
      try {
        const updateProfileRes = await axios.put(
          `/api/userProfile/${get().user.id}`,
          userData
        );
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
        resolve(updateProfileRes);
      } catch (error) {
        set((state: { user: any }) => ({
          ...state,
          loading: false,
        }));
        reject(error);
      }
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
