import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Flex,
  Image,
  useDisclosure,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputLeftAddon,
  Input,
  FormControl,
  FormLabel,
  Text,
  Textarea,
} from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import DashboardNavbar from './DashboardNav';
import LandingPageNavbar from './LandingPageNav';
import { useProfileStore } from 'src/app/profileStore';
import { useLocalStore } from 'src/app/localStore';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { IProfileStore } from 'src/definitions/definitions';
import axios from 'axios';
import EditProfileComponent from 'src/components/dashboard/profile/ProfileEditModal';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';
import { IProfile } from 'src/definitions/IUser';
import { ErrorMessage } from '@hookform/error-message';

const Navbar = () => {
  const { createUser } = useProfileStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useProfileStore((state: IProfileStore) => state.user);
  const setWallet = useProfileStore((state: IProfileStore) => state.setWallet);
  const router = useRouter();
  const wallet = useWallet();

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

  const onSubmit = async (data: any) => {
    const { name, userName } = data;

    const Data = { name, userName, wallet: wallet.publicKey?.toBase58()! };

    createUser(Data)
      .then((res: any) => {
        console.log(
          '3 - From profile component passed data - ',
          res.statusText
        );
        // store do not give any response after connection so lets check for id in store and
        if (res.data.id) {
          console.log(
            '4 - Are we getting anything inside user - ',
            res.data.id
          );
          router
            .push('/profile/' + res.data.id)
            .then(() => close())
            .catch((e) => console.log(e));
        } else {
          console.log('error in creating user check navbar component');
        }
      })
      .catch((err: any) => {
        console.log('Error From Server - ', err.message);
      });
  };

  useEffect(() => {
    if (wallet.connected) {
      console.log('wallet connected 💰');
      // set the wallet key in user store  so that the top nav will change

      // request to backend for data after wallet is connected before user is logged in
      const userId = wallet.publicKey?.toBase58();

      //todo: reduce the lag | tha lag in loading the /profile route is due to api request taking time
      axios
        .get('/api/user/62fb5547fce175c4caf61e13')
        .then((res) => {
          console.log(res);
          // if we get a okay response from the backend then we will connect the wallet and add the recieved data to the user profile store
        })
        .catch((err) => {
          // if we get bakc error then the user does not exist and we need to create a user by opening the modal
          onOpen();

          // now we set the wallet address in local store in order to change the ui
          setWallet(wallet.publicKey?.toBase58()!);
        });
    } else if (!wallet.connected) {
      console.log('wallet not connected 💰');
      setWallet('');
      // if wallet is not connected then redirect to home page
      router.push('/');
    }
  }, [wallet.connected]);

  return (
    <Container minW={'full'} p='0'>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody
                display='flex'
                flexDirection={'column'}
                gap='1rem'
                pb={6}
              >
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
      </>
      {user.wallet ? (
        <DashboardNavbar>
          <WalletMultiButton />
        </DashboardNavbar>
      ) : (
        <LandingPageNavbar>
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
        </LandingPageNavbar>
      )}
    </Container>
  );
};
export default Navbar;
