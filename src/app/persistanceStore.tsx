import create from 'zustand';
import { persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
type persistDataType = {
  userId: string;
  userWalletId: string;
  userName: string;
};
interface IPersistanceStore {
  userId: string;
  userWalletId: string;
  userName: string;
  setPersistanceUser: (data: persistDataType) => void;
}

export const usePersistanceStore = create<IPersistanceStore>()(
  persist(
    (set) => ({
      userId: '' as string,
      userWalletId: '' as string,
      userName: '' as string,
      setPersistanceUser: (data: persistDataType) => {
        set(data);
      },
    }),
    { name: 'dhire' }
  )
);

if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  mountStoreDevtool('localStore', usePersistanceStore);
}
