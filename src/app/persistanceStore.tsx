import create from 'zustand';
import { persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface IPersistanceStore {
  userId: string;
  userName: string;
  setUserId: (id: string) => void;
  setUserName: (name: string) => void;
}

export const usePersistanceStore = create<IPersistanceStore>()(
  persist(
    (set) => ({
      userId: '' as string,
      userName: '' as string,
      setUserId: (id: string) => set(() => ({ userId: id })),
      setUserName: (name: string) => set(() => ({ userName: name })),
    }),
    { name: 'dhire' }
  )
);

if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  mountStoreDevtool('localStore', usePersistanceStore);
}
