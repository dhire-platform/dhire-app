import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLocalStore } from 'src/app/localStore';
import { useProfileStore } from 'src/app/profileStore';
import { IProfile } from 'src/definitions/definitions';

const useProfileEdit = ({
  isOpen,
  onClose,
}: any): [(values: any) => Promise<any>, IProfile] => {
  const editProfile = useProfileStore((state: any) => state.editProfile);

  const { user } = useProfileStore();
  const { edit_mode, set_edit_mode } = useLocalStore();

  const toast_profile_created = useToast({
    status: 'success',
    position: 'bottom',
    title: 'Profile Created Successfully',
    containerStyle: {
      width: '300px',
      maxWidth: '100%',
    },
  });
  const toast_profile_updated = useToast({
    status: 'success',
    position: 'bottom',
    title: 'Profile Updated Successfully',
    containerStyle: {
      width: '300px',
      maxWidth: '100%',
    },
  });

  async function onSubmit(values: any) {
    console.log(values);
    const { name, image, about } = values;

    const data = { name, userName: user.userName, about, image };
    const profileEditResponse = await editProfile(data);
    //   .then((res: any) => {
    //     console.log('res', res);
    //     toast_profile_updated();
    //   })
    //   .catch((err: any) => {
    //     console.log('error, ', err);
    //   });
    onClose();

    set_edit_mode(false);
  }
  return [onSubmit, user];
};

export default useProfileEdit;
