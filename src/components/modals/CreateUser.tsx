import config from '@/config/general.config';
import {
  Button,
  Container,
  Text,
  FormLabel,
  FormControl,
  Input,
  Textarea,
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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useProfileStore } from 'src/app/profileStore';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useWallet } from '@solana/wallet-adapter-react';
import { usePersistanceStore } from 'src/app/persistanceStore';

const CreateUserModal = ({ onClose, onOpen, isOpen }: any) => {
  const { user } = useProfileStore();
  const createUser = useProfileStore((state: any) => state.createUser);
  const { userId, userWalletId, setPersistanceUser } = usePersistanceStore();

  const router = useRouter();
  const connected_wallet = useWallet();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
      walletId: connected_wallet.publicKey?.toBase58(),
    };
    createUser(Data)
      .then((res: any) => {
        console.log('creating user - ', res);
        if (res.data.id) {
          console.log('new user created 🙋🏻‍♂️', res.statusText);
          const persistData = {
            userId: res.data.id as string,
            userName: res.data.username as string,
            userWalletId: res.data.wallet as string,
          };
          console.log(persistData);
          setPersistanceUser(persistData);
          router.push('/profile/' + res.data.id);
          onClose();
        } else {
          console.log('error in creating user check navbar component');
        }
      })
      .catch((err: any) => {
        console.log('Error From Server - ', err.message);
      });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
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
            <FormControl isRequired>
              <FormLabel htmlFor='name'>User Name</FormLabel>
              <InputGroup>
                <InputLeftAddon>@</InputLeftAddon>
                <Input
                  isRequired
                  type='text'
                  id='userName'
                  placeholder='User Name'
                  {...register('userName', {
                    required: 'This is Required',
                    minLength: {
                      value: 5,
                      message: 'minimum number of character for username is 5',
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
  );
};

export default CreateUserModal;
