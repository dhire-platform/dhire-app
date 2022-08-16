import { useEffect } from 'react';
import {
  Container,
  useDisclosure,
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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import DashboardNavbar from './DashboardNav';
import LandingPageNavbar from './LandingPageNav';
import { useProfileStore } from 'src/app/profileStore';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { IProfileStore } from 'src/definitions/definitions';
import axios from 'axios';
import EditProfileComponent from 'src/components/dashboard/profile/ProfileEditModal';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';
import { IProfile } from 'src/definitions/definitions';
import { ErrorMessage } from '@hookform/error-message';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, setWallet, createUser } = useProfileStore();
  const { userId, userWalletId, setPersistanceUser } = usePersistanceStore();

  const router = useRouter();
  const connected_wallet = useWallet();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({});

  const onSubmit = async (submittedData: any) => {
    const Data = {
      name: submittedData.name,
      userName: submittedData.userName,
      image: submittedData.image,
      wallet: connected_wallet.publicKey?.toBase58(),
    };

    createUser(Data)
      .then((res: any) => {
        if (res.data.id) {
          const persistData = {
            userId: res.data.id as string,
            userName: res.data.username as string,
            userWalletId: res.data.wallet as string,
          };
          console.log(persistData);
          setPersistanceUser(persistData);
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
    if (connected_wallet.connected) {
      //todo: reduce the lag | tha lag in loading the /profile route is due to api request taking time
      if (userId.length > 0) {
        axios
          .get('/api/user/' + userId)
          .then((res) => {
            console.log('res.data', res.data);
            if (res.data !== null && res.data.wallet === userWalletId) {
              const Data = res.data;
              setUser(Data);
              router.push('/profile/' + userId);
            } else if (res.data.wallet === userWalletId) {
              console.log('user is connecting with a different wallet');
            } else {
              onOpen();
              setWallet(connected_wallet.publicKey?.toBase58()!);
            }
            axios
              .get('/api/userProfile/' + userId)
              .then((res) => console.log('userprofile res- ', res))
              .catch((e) => console.log(e));
          })
          .catch((err) => {
            onOpen();
            setWallet(connected_wallet.publicKey?.toBase58()!);
          });
      } else {
        onOpen();
      }
    } else if (!connected_wallet.connected) {
      setWallet('');
      router.push('/');
    }
  }, [connected_wallet.connected]);

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
