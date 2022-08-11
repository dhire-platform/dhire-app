import create from 'zustand';

interface ILocalStore {
  wallet_connected: boolean;
  set_wallet_connected: (connected: boolean) => void;
}

export const useLocalStore = create<ILocalStore>((set) => ({
  wallet_connected: false,
  set_wallet_connected: (connected: boolean) =>
    set({ wallet_connected: connected }),
}));
