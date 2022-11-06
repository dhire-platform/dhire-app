import { UserProfile } from 'src/interfaces/response.interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { usePersistanceStore } from 'src/app/store/persistance/persistanceStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { roleEnum } from 'src/lib/enums/enums';
import { IUserProfile } from '@/interfaces/store/data/userProfile.interface';

export default async function getUserByWallet(
  walletId: string
): Promise<IUserProfile | undefined> {
  // const {  setWallet } = useProfileStore();
  const { setPersistanceUser } = usePersistanceStore();
  const router = useRouter();
  console.log('2- getting user by wallet');
  try {
    //todo: handel internet connectivity issues
    const res = await axios.get(`/api/user/${walletId}`);
    console.log('does user exist - ', res.data);

    if (!res.data) return undefined;

    const userProfileResponse = await axios.get(
      '/api/userProfile/' + res.data.id
    );

    const userProfile = userProfileResponse.data as IUserProfile;
    console.log('user profile details - ', userProfile);

    // setUser(res.data);
    // setUserProfile(userProfile);
    setPersistanceUser(res.data);
    // setWallet({
    //   walletId: userProfile.user?.wallet?.walletId,
    //   walletName: userProfile.user?.wallet?.walletName,
    //   connected: true,
    //   loading: false,
    // });
    router.push(
      (res.data.type === roleEnum.RECRUIT ? '/profile/' : '/recruiter/') +
        res.data.id
    );

    return userProfile as IUserProfile;
  } catch (error) {
    return undefined;
  }
}
