import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePersistanceStore } from 'src/app/store/persistance/persistanceStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';
//import getUserByWallet from '../getUserByWallet';
import { IUserProfile } from '@/interfaces/store/data/userProfile.interface';
import axios from 'axios';

/** checks if wallet is connected or if the user is present in the local storage and then fetches user data*/
export const useWalletConnection = (isOpen: boolean, onOpen: () => void) => {
  const wallet = useWallet();
  const router = useRouter();

  const { user, updateWallet, updateUser, updateUserProfile } =
    useProfileStore();
  const {
    removePersistanceUser,
    setPersistanceUser,
    user: persistenceUser,
  } = usePersistanceStore();
  // check if the wallet is connected or not before the app starts
  useEffect(() => {
    console.log(
      'useEffect called inside useWalletConnection HOOK - ',
      wallet.connected
    );
    if (!wallet.connected) {
      // the screen refreshes due to this it takes time for wallet to throw wallet.connected = true
      console.log('wallet not connected');
      removePersistanceUser();
      //  removeUser();
      updateWallet({
        connected: false,
        loading: false,
      });
      router.push('/');
      return;
    } else {
      updateWallet({
        connected: true,
        loading: false,
        walletId: wallet.publicKey?.toBase58(),
        walletName: 'find the wallet name',
      });
      console.log('wallet connected');
      axios
        .get(`/api/user/${wallet.publicKey?.toBase58()}`)
        .then((res) => {
          if (!res.data) return onOpen();
          axios
            .get('/api/userProfile/' + res.data.id)
            .then((userProfileResponse) => {
              console.log('user profile response - ', userProfileResponse);
              const userProfile = userProfileResponse.data as IUserProfile;
              updateUser(res.data);
              updateUserProfile(userProfile);
              setPersistanceUser(res.data);
              router.push('/profile/' + res.data.id);
              return userProfile as IUserProfile;
            })
            .catch((e) => {
              console.log('1. error - ', e);
            });
        })
        .catch(() => {
          onOpen();
        });
    }
  }, [wallet.connected]);

  return user;
};
