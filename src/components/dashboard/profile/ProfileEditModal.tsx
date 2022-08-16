import {
  Avatar,
  Center,
  Heading,
  Stack,
  Text,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  useColorModeValue,
  Textarea,
  IconButton,
  Button,
  Drawer,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  useToast,
  Toast,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';
import { useLocalStore } from 'src/app/localStore';
import { useProfileStore } from 'src/app/profileStore';
import { IProfile } from 'src/definitions/IUser';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';
import { usePersistanceStore } from 'src/app/persistanceStore';

const EditProfileComponent = ({ isOpen, onOpen, onClose }: any) => {
  const editProfile = useProfileStore((state: any) => state.editProfile);
  const createUser = useProfileStore((state: any) => state.createUser);

  const { user } = useProfileStore();
  const { edit_mode, set_edit_mode } = useLocalStore();
  const { userId, userName, setUserId, setUserName } = usePersistanceStore();

  const router = useRouter();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

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

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      name: user.name,
      userName: user.userName,
      about: user.about,
      image: user.image,
    },
  });

  useEffect(() => {
    if (edit_mode) {
      isOpen;
    }
  }, [edit_mode]);

  async function onSubmit(values: any) {
    const { name, userName, image, about } = values;

    if (router.pathname === '/profile') {
      const data = { name, userName, about, image };
      const url = '/profile/' + userName;
      createUser(data)
        .then((res: any) => {
          router
            .push(url)
            .then(() => {
              toast_profile_created();
              onClose();
            })
            .catch((err: any) => console.log(err));
        })
        .catch((err: any) => {
          console.log('Error From Server - ', err.message);
        });
    } else {
      console.log('route is not profiles');
      const data = { name, userName: user.userName, about, image };
      console.log('data from modal to edit component = ', values);
      editProfile(data)
        .then((res: any) => {
          console.log('res', res);
          toast_profile_updated();
        })
        .catch((err: any) => {
          console.log('error, ', err);
        });
      onClose();
    }

    set_edit_mode(false);
  }

  useEffect(() => {
    console.log('store data ', user.id, user.userName);
    if (user.id && user.userName) {
      setUserId(user.id);
      setUserName(user.userName);
    }
  }, [user]);

  return (
    <Modal
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      scrollBehavior='outside'
      size='xl'
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your Profile</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody display='flex' flexDirection={'column'} gap='1rem' pb={6}>
            {/* Full Name */}
            <FormControl isRequired>
              <FormLabel htmlFor='name'>Full name</FormLabel>
              <Input
                isRequired
                id='name'
                placeholder='Name'
                {...register('name', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message:
                      'Entered value cant start/end or contain only white spacing',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name='name'
                render={({ message }) => (
                  <Text fontSize='sm' color='red.500' py='0.5rem'>
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/*userName */}
            {router.pathname === '/profile' && (
              <FormControl isRequired>
                <FormLabel htmlFor='name'>User Name</FormLabel>
                <InputGroup>
                  <InputLeftAddon>@</InputLeftAddon>
                  <Input
                    defaultValue={user.userName}
                    isRequired
                    type='text'
                    id='userName'
                    placeholder='User Name'
                    {...register('userName', {
                      required: 'This is Required',
                      minLength: {
                        value: 5,
                        message:
                          'minimum number of character for username is 5',
                      },
                      pattern: {
                        value: /^\w[a-zA-Z@#0-9.]*$/,
                        message: 'User Name can not contain white spacing',
                      },
                    })}
                  />
                </InputGroup>
                <ErrorMessage
                  errors={errors}
                  name='userName'
                  render={({ message }) => (
                    <Text fontSize='sm' color='red.500' py='0.5rem'>
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
            )}

            {/*Profile Picture URL */}
            <FormControl>
              <FormLabel htmlFor='image'>Profile Picture</FormLabel>
              <InputGroup>
                <InputLeftAddon>URL:</InputLeftAddon>
                <Input
                  type='url'
                  id='image'
                  placeholder='Image URL'
                  {...register('image', {
                    pattern: {
                      value:
                        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                      message: 'Enter a Valid URL',
                    },
                  })}
                />
              </InputGroup>
              <ErrorMessage
                errors={errors}
                name='image'
                render={({ message }) => (
                  <Text fontSize='sm' color='red.500' py='0.5rem'>
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* About */}
            <FormControl>
              <FormLabel htmlFor='name'>About</FormLabel>
              <Textarea
                id='about'
                placeholder='About You'
                {...register('about', {
                  maxLength: {
                    value: 200,
                    message: 'Maximum length should be 200',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name='about'
                render={({ message }) => (
                  <Text fontSize='sm' color='red.500' py='0.5rem'>
                    {message}
                  </Text>
                )}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              type='submit'
              colorScheme='blue'
              mr={3}
            >
              Save
            </Button>
            <Button variant={'outline'} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileComponent;
