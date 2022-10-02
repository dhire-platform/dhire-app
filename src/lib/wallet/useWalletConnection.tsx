import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { useProfileStore } from 'src/app/profileStore';
import { roleEnum } from 'src/enums/enums';
import getUserByWallet from '../routes/getUserByWallet';

export const useWalletConnection = (isOpen: boolean, onOpen: () => void) => {
  const wallet = useWallet();
  const router = useRouter();

  const { user, setUser, setWallet2 } = useProfileStore();
  const { setPersistanceUser, userName } = usePersistanceStore();

  useEffect(() => {
    if (!wallet.connected) {
      // the screen refreshes due to this it takes time for wallet to throw wallet.connected = true
      setPersistanceUser({
        userId: '',
        userName: '',
        userWalletId: '',
      });
      setUser({
        name: undefined,
        userName: undefined,
        id: undefined,
        walletId: undefined,
        role: roleEnum.RECRUIT,
        about: undefined,
        achievements: undefined,
        image: undefined,
        skills: [],
        experience: [],
        location: undefined,
        website: undefined,
        achievement: undefined,
      });
      setWallet2({
        walletId: '',
        walletName: '',
        connected: false,
        loading: false,
      });
      router.push('/');
      return;
    }

    getUserByWallet(wallet.publicKey?.toBase58() as string).catch(() => {
      onOpen();
    });
  }, [wallet.connected]);

  return [user];
};
