import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IAuth } from 'src/definitions/IAuth'

export const useAuthStore = create((set) => ({
  isAuth: false,
  setAuth: () => set((state: IAuth) => ({ isAuth: !state.isAuth })),
}));
