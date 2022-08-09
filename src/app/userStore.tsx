import { roleEnum } from 'src/enums/enums';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IUseStore {
  name: string;
  role: roleEnum;
}

export const useUserStore = create((set) => ({
  name: 'user',
  role: '',
  setUser: () =>
    set((state: IUseStore) => ({ name: state.name, role: state.role })),
}));
