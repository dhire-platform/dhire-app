import { IUser } from '@/interfaces/store/data/user.interface';
import { IUserProfile } from '@/interfaces/store/data/userProfile.interface';
import axios from 'axios';

type FieldProps = {
  del: number;
  type: string;
};
export const deleteField = (
  { del, type }: FieldProps,
  toast: any,
  user: IUser,
  userProfile: IUserProfile,
  updateUserProfile: any
) => {
  let newEdu = userProfile.education?.filter((edu, index) => index !== del);
  let newExp = userProfile.experience?.filter((edu, index) => index !== del);
  let newProject = userProfile.projects?.filter((edu, index) => index !== del);
  let delObj =
    type === 'edu'
      ? { education: newEdu }
      : type === 'exp'
      ? { experience: newExp }
      : { projects: newProject };
  axios
    .put('/api/userProfile/' + user.id, { ...delObj })
    .then((res) => {
      toast({
        position: 'top',
        title: 'DONE !!',
        description: 'Successfully Deleted.',
        status: 'success',
        duration: 1000,
        isClosable: true,
        containerStyle: {
          marginTop: '10%',
        },
      });
      updateUserProfile(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return;
};
