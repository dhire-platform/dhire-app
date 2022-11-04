import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ILocalStore {
  wallet_connected: boolean;
  edit_mode: boolean;
  set_wallet_connected: (connected: boolean) => void;
  set_edit_mode: (edit_mode: boolean) => void;
}

export const useLocalStore = create(
  immer<ILocalStore>((set) => ({
    wallet_connected: false,
    edit_mode: false,
    set_wallet_connected: (connected: boolean) =>
      set((state: ILocalStore) => {
        state.wallet_connected = connected;
      }),
   
    set_edit_mode: (edit: boolean) => {
      console.log('edit mode  -', edit);
      set((state: ILocalStore) => {
        state.edit_mode = edit;
      });
    },
  }))
);
