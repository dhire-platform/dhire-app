import { getByWalletResponse } from '@/interfaces/response.interface';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { useProfileStore } from 'src/app/profileStore';
import { IWallet } from 'src/definitions/definitions';
import { roleEnum } from 'src/enums/enums';
import getUserByWallet from '../routes/getUserByWallet';

export const useWalletConnection = (isOpen: boolean, onOpen: () => void) => {
  const wallet = useWallet();
  const router = useRouter();

  const { user, setUser, setWallet2 } = useProfileStore();
  const { setPersistanceUser } = usePersistanceStore();

  useEffect(() => {
    if (!wallet.connected) {
      router.push('/');
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
      return;
    }

    getUserByWallet(wallet.publicKey?.toBase58() as string)
      .then((userData: getByWalletResponse) => {
        setUser({
          name: userData.name,
          userName: userData.username,
          id: userData.id,
          walletId: userData.wallet,
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

        const walletData: IWallet = {
          walletId: userData.wallet,
          walletName: '',
          connected: true,
          loading: false,
        };
        setWallet2(walletData);
        setPersistanceUser({
          userId: userData.id as string,
          userName: userData.username as string,
          userWalletId: userData.wallet as string,
        });
        router.push('/profile/' + userData.id);
      })

      .catch(() => {
        onOpen();
      });
  }, [wallet.connected]);

  return [user];
};
