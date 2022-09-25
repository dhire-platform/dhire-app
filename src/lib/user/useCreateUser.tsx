import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { useProfileStore } from 'src/app/profileStore';

export const useCreateAccount = (onClose: any) => {
  const connected_wallet = useWallet(); // doubt here, import connected_wallet from global store
  const createUser = useProfileStore((state: any) => state.createUser);
  const { setPersistanceUser } = usePersistanceStore();
  const router = useRouter();

  function submit(submittedData: any) {
    const Data = {
      name: submittedData.name,
      userName: submittedData.userName,
      image: submittedData.image,
      walletId: connected_wallet.publicKey?.toBase58(),
    };
    createUser(Data)
      .then((res: any) => {
        if (res.data.id) {
          router.push(`/profile/${res.data.id}`);
          const persistData = {
            userId: res.data.id as string,
            userName: res.data.username as string,
            userWalletId: res.data.wallet as string,
          };
          console.log('data pushed to persistence storage');
          setPersistanceUser(persistData);
        } else {
          console.log('error in creating user check navbar component');
        }
      })
      .catch((err: any) => {
        console.log('Error From Server - ', err.message);
      })
      .finally(() => {
        onClose();
      });
  }

  function modalClose() {
    console.log('modal close wallet disconnect');
    connected_wallet.disconnect();
    onClose();
  }

  return [submit];
};
