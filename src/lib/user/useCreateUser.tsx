import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { useProfileStore } from 'src/app/profileStore';

export const useCreateAccount = (onClose: any) => {
  const connected_wallet = useWallet();
  const { createUser, setUser } = useProfileStore();
  const { setPersistanceUser } = usePersistanceStore();

  async function submit(submittedData: any) {
    const Data = {
      name: submittedData.name,
      userName: submittedData.userName,
      image: submittedData.image,
      walletId: connected_wallet.publicKey?.toBase58(),
    };
    const createdUser = await createUser(Data);

    const postUser = await axios.post(`/api/userProfile`, {
      userId: createdUser.data.id,
    });

    console.log(
      'new user profile updated response - ',
      postUser,
      ' created user - ',
      createdUser
    );

    const persistData = {
      userId: createdUser.data.id as string,
      userName: createdUser.data.username as string,
      userWalletId: createdUser.data.wallet as string,
    };
    setPersistanceUser(persistData);
    onClose();
  }
  return [submit];
};
