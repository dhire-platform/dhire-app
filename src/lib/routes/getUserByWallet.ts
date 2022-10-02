import { UserProfile } from '@/interfaces/response.interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { useProfileStore } from 'src/app/profileStore';
import { IProfile } from 'src/definitions/definitions';
import { roleEnum } from 'src/enums/enums';
export default async function getUserByWallet(
  walletId: string
): Promise<IProfile | undefined> {
  const { setUser, setWallet2 } = useProfileStore();
  const { setPersistanceUser } = usePersistanceStore();
  const router = useRouter();

  try {
    //todo: handel internet connectivity issues
    const res = await axios.get(`/api/user/${walletId}`);
    if (!res.data) return undefined;
    const userProfile = await axios.get('/api/userProfile/' + res.data.id);
    const user: IProfile = {
      id: userProfile.data.userId,
      role: roleEnum.RECRUIT,
      about: userProfile.data.bio,
      image: userProfile.data.image,
      skills: userProfile.data.skills,
      experience: userProfile.data.experience,
      location: userProfile.data.location,
      website: userProfile.data.website,
      achievement: userProfile.data.achievement,
      userName: res.data.userName,
      walletId: res.data.walletId,
      achievements: res.data.achievement,
    };
    console.log('user - ', user)
    setUser(user);
    setPersistanceUser({
      userId: user.id as string,
      userName: user.userName as string,
      userWalletId: user.walletId as string,
    });
    setWallet2({
      walletId: user.walletId,
      walletName: '',
      connected: true,
      loading: false,
    });
    router.push('/profile/' + user.id);

    return user as IProfile;
  } catch (error) {
    return undefined;
  }
}
