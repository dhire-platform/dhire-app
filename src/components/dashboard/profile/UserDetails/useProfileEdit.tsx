import { IUserProfile } from '@/interfaces/store/data/userProfile.interface';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocalStore } from 'src/app/store/local/localStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';

const useProfileEdit = ({
  isOpen,
  onClose,
}: any): ((values: any) => Promise<any>) => {
  const { updateUserProfile } = useProfileStore();

  const { user } = useProfileStore();
  const { set_edit_mode } = useLocalStore();
  async function onSubmit(values: any) {
    console.log(values);
    const { name, image, about } = values;

    const data = { bio: about, image };
    axios
      .put(`/api/userProfile/` + user.id, data)
      .then((res) => {
        console.log('update user profile route response', res);
        updateUserProfile(data);
      })
      .catch((err) => {
        console.log('error in update user profile route', err);
      });
    onClose();
    set_edit_mode(false);
  }
  return onSubmit;
};

export default useProfileEdit;
