import { IUserProfile } from '@/interfaces/store/data/userProfile.interface';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
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
    let data = {};
    Object.keys(values).forEach((key: any) => {
      data = values[key] ? { ...data, [key]: values[key] } : data;
    });
    axios
      .put(`/api/userProfile/` + user.id, data)
      .then((res) => {
        //console.log('update user profile route response', res);
        updateUserProfile(res.data);
      })
      .catch((err) => {
        // console.log('error in update user profile route', err);
      });
    reset();
    onClose();
    set_edit_mode(false);
  }
  return onSubmit;
};

export default useProfileEdit;
