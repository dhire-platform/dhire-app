import axios from 'axios';
import { IProfile, skill } from 'src/definitions/definitions';
import create from 'zustand';
import { roleEnum } from 'src/enums/enums';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { IProfileStore, SkillLevel } from 'src/definitions/definitions';
import Experience from 'src/components/dashboard/profile/Experience';
import { persist } from 'zustand/middleware';

export const useProfileStore = create<IProfileStore>((set, get) => ({
  user: {
    id: '',
    userName: '',
    walletId: '',
    name: '',
    role: roleEnum.RECRUIT,
    about: '',
    achievements: '',
    image: '',
    experience: [
      {
        company: '',
        title: '',
        description: '',
        from: new Date('2024-07-21'),
        to: new Date('2024-07-21'),
      },
    ],
    skills: [
      { name: 'hello', level: SkillLevel.ADVANCED },
      { name: 'world', level: SkillLevel.BEGINNER },
    ],
    location: '',
    website: '',
    achievement: '',
  },
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
        walletId: wallet,
      },
    })),

  setSkills: async (skills: string[]) => {
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
     todo: add update skills and achievements/education inside this function & do both requests in one request
    */

  createUser: async (data: any): Promise<any> => {
    console.log(data);
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
          set((prevState: any) => ({
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
            },
          }));

          axios
            .post('/api/userProfile', {
              walletId: data.walletId,
              bio: data.about,
              image: data.image,
              skills: get().user.skills,
            })
            .then((response: any) => {
              console.log(
                '3 - res for user profile create ',
                response.statusText
              );
              resolve(res);
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

  setUser: async (data: any) => {
    set((prevState: any) => ({
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
        .then((res) => resolve(res))
        .catch((err) => reject(err));
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

  setExperience: async (data: any): Promise<any> => {
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
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  },
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('profileStore', useProfileStore);
}
