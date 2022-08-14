import create from 'zustand';

interface ILocalStore {
  wallet_connected: boolean;
  edit_mode: boolean;
  set_wallet_connected: (connected: boolean) => void;
  set_edit_mode: (edit_mode: boolean) => void;
}

export const useLocalStore = create<ILocalStore>((set) => ({
  wallet_connected: false,
  edit_mode: false,
  set_wallet_connected: (connected: boolean) =>
    set({ wallet_connected: connected }),
  set_edit_mode: (edit: boolean) => {
    console.log('edit mode  -', edit);
    set({ edit_mode: edit });
  },
}));
