import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { useProfileStore } from 'src/app/profileStore';
import { IProfileStore, IWallet } from 'src/definitions/definitions';
import { roleEnum } from 'src/enums/enums';

export const useWalletConnection = (onOpen: any, onClose: any, isOpen: any) => {
  const wallet = useWallet();
  const router = useRouter();
  const setWallet2 = useProfileStore(
    (state: IProfileStore) => state.setWallet2
  );
  const { user, setUser, setWallet, loading } = useProfileStore();
  const { setPersistanceUser } = usePersistanceStore();

  useEffect(() => {
    console.log('wallet - ', wallet.connected);
    if (wallet.connected) {
      // check is user logedin or  not

      // if user is
      axios
        .get('/api/user/' + wallet.publicKey?.toBase58())
        .then((res: any) => {
          console.log('api response - ', res);
          if (res?.data?.id) {
            setUser({
              name: res.data.name,
              userName: res.data.username,
              id: res.data.id,
              walletId: res.data.wallet,
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
              walletId: res.data.wallet,
              walletName: '',
              connected: true,
              loading: false,
            };
            setWallet2(walletData);
            setPersistanceUser({
              userId: res.data.id as string,
              userName: res.data.username as string,
              userWalletId: res.data.wallet as string,
            });
            router.push('/profile/' + res.data.id);
          } else {
            // create a new user
            onOpen();
          }
        })
        .catch(() => {
          isOpen;
          // now show the modal to create account
          // w.disconnect();
        });
      // .finally(() => {
      //   console.log('wallet is connected and user is found or not found ❌');
      // });
    } else if (!wallet.connected) {
      setWallet('');
      const walletData: IWallet = {
        walletId: undefined,
        walletName: undefined,
        connected: false,
        loading: false,
      };
      setWallet2(walletData);
      setPersistanceUser({ userId: '', userName: '', userWalletId: '' });
      router.push('/');
    }
  }, [wallet.connected]);

  return [user];
};
