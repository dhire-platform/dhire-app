import { UserProfile } from 'src/interfaces/response.interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { usePersistanceStore } from 'src/app/store/persistance/persistanceStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { roleEnum } from 'src/lib/enums/enums';
import {
  IRecruiterProfile,
  IUserProfile,
} from '@/interfaces/store/data/userProfile.interface';
import { useJobStore } from 'src/app/store/job/jobStore';

export default async function getUserByWallet(
  walletId: string
): Promise<IUserProfile | undefined> {
  // const {  setWallet } = useProfileStore();
  const { setPersistanceUser, setPersistanceCompany } = usePersistanceStore();
  const { updateJob } = useJobStore();
  const {
    updateCompany,
    updateUser,
    updateUserProfile,
    updateRecruiterProfile,
  } = useProfileStore();
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

    const userProfile = userProfileResponse.data as
      | IUserProfile
      | IRecruiterProfile;
    console.log('user profile details - ', userProfile);

    // setUser(res.data);
    // setUserProfile(userProfile);
    setPersistanceUser(res.data);
    updateUser(res.data);
    if ('company' in userProfile) {
      const companyDetails = await axios.get(
        '/api/company/' + userProfile.company
      );
      setPersistanceCompany(companyDetails.data);
      updateCompany(companyDetails.data);
      updateRecruiterProfile(userProfile);
      axios
        .get('/api/company/getJobs?id=' + userProfile.company)
        .then((res) => {
          console.log(res.data);
          updateJob(res.data.jobPosts);
        });
    } else {
      updateUserProfile(userProfile);
    }
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
