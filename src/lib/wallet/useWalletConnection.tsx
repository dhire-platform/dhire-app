import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { useProfileStore } from 'src/app/profileStore';
import { IProfileStore } from 'src/definitions/definitions';
import { roleEnum } from 'src/enums/enums';
import getUserByWallet from '../routes/getUserByWallet';

export const useWalletConnection = (
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
) => {
  const wallet = useWallet();
  const { userId, userWalletId, removePersistanceUser } = usePersistanceStore();
  const router = useRouter();
  const setWallet2 = useProfileStore(
    (state: IProfileStore) => state.setWallet2
  );
  const { user, setUser, setWallet } = useProfileStore();
  const { setPersistanceUser } = usePersistanceStore();

  useEffect(() => {
    if (wallet.connected && !userId) {
      getUserByWallet(wallet.publicKey?.toBase58() as string).then((res) => {
        if (res.data) {
          setUser(res.data);
          setPersistanceUser(res.data);
          setWallet2(res.data.wallet);
          router.push('/profile');
        } else {
          onOpen();
        }
      });
    }

    if (userId.length > 0) {
      // get the user details from db if it was in persistance storage
      axios.get(`/api/user/${userId}`).then((res) =>
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
        })
      );
    }
    // if (wallet.connected && wallet.publicKey) {
    //   // <-- if wallet in local storage exists dont send request to server
    //   // axios
    //   // .get(`/api/user/${wallet.publicKey?.toBase58()}`) // todo: we need a route to get user from with user wallet it
    //   // we got two routes one to get user id and one to get user details using user id
    //   // for first time user we will have to send request using wallet id to get user id
    //   // for second time user we will get user id 9 but not fior first time user ) for db
    //   const userDetails = getUserByWallet(wallet.publicKey.toBase58())
    //     .then(async (res: any) => {
    //       if (res?.data?.id) {
    //         await router.push('/profile/' + res.data.id);
    //         setUser({
    //           name: res.data.name,
    //           userName: res.data.username,
    //           id: res.data.id,
    //           walletId: res.data.wallet,
    //           role: roleEnum.RECRUIT,
    //           about: undefined,
    //           achievements: undefined,
    //           image: undefined,
    //           skills: [],
    //           experience: [],
    //           location: undefined,
    //           website: undefined,
    //           achievement: undefined,
    //         });
    //         const walletData: IWallet = {
    //           walletId: res.data.wallet,
    //           walletName: '',
    //           connected: true,
    //           loading: false,
    //         };
    //         setWallet2(walletData);
    //         setPersistanceUser({
    //           userId: res.data.id as string,
    //           userName: res.data.username as string,
    //           userWalletId: res.data.wallet as string,
    //         });
    //       } else {
    //         // user does not exist create a new user
    //         onOpen();
    //       }
    //     })
    //     .catch((e) => {
    //       onOpen();
    //     });
    // } else {
    //   console.log('1 - user not in storage and wallet not connected');
    //   setWallet('');
    //   const walletData: IWallet = {
    //     walletId: undefined,
    //     walletName: undefined,
    //     connected: false,
    //     loading: false,
    //   };
    //   setWallet2(walletData);
    //   setPersistanceUser({ userId: '', userName: '', userWalletId: '' });
    //   router.push('/');
    // }
  }, [wallet.connected]);

  return [user];
};
