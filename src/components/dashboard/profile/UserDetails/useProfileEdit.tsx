import { ISocial } from '@/interfaces/store/data/socials.interface';
import { IUserProfile } from '@/interfaces/store/data/userProfile.interface';
import axios from 'axios';
import { useLocalStore } from 'src/app/store/local/localStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';

const useProfileEdit = ({
  isOpen,
  onClose,
  reset,
}: any): ((values: any) => Promise<any>) => {
  const { updateUserProfile } = useProfileStore();

  const { user } = useProfileStore();
  const { set_edit_mode } = useLocalStore();
  async function onSubmit(values: any) {
    let data: IUserProfile = {};
    let result = 'success';
    let { youtube, twitter, facebook, linkedin, instagram, github } = values;
    let social = { youtube, twitter, facebook, linkedin, instagram, github };
    Object.keys(values).forEach((key: any) => {
      data =
        values[key] && !social[key as keyof ISocial]
          ? { ...data, [key]: values[key] }
          : data;
    });
    Object.keys(social).forEach((key) => {
      data = social[key as keyof ISocial]
        ? { ...data, social: { ...data.social, [key]: values[key] } }
        : data;
    });
    try {
      const res = await axios.put(`/api/userProfile/` + user.id, data);

      updateUserProfile(res.data);
    } catch (err) {
      // console.log('error in update user profile route', err);
      result = 'error';
    }
    reset();
    onClose();
    set_edit_mode(false);
    return result;
  }
  return onSubmit;
};

export default useProfileEdit;
