import { IUser } from '@/interfaces/store/data/user.interface';
import produce from 'immer';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface IPersistanceStore {
  user?: IUser;
  setPersistanceUser: (data: IUser) => {
    success: boolean;
    data: IUser;
  };
  removePersistanceUser: () => { success: boolean };
}

export const usePersistanceStore = create<IPersistanceStore>()(
  persist(
    (set) => ({
      user: undefined,
      setPersistanceUser: (data: IUser) => {
        set(
          produce((draft) => {
            draft.user = data;
          })
        );
        return { success: true, data };
      },
      removePersistanceUser: () => {
        set({ user: undefined });
        return { success: true };
      },
    }),
    { name: 'dhire' }
  )
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('localStore', usePersistanceStore);
}
