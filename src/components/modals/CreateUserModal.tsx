import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { useWallet } from '@solana/wallet-adapter-react';
import { useForm } from 'react-hook-form';
import { useCreateAccount } from 'src/lib/hooks/createUser/useCreateUser';

const CreateUserModal = ({ isOpen, onOpen, onClose }: any) => {
  console.log('1 - create user process ( modal component )');
  const connected_wallet = useWallet();
  const submit = useCreateAccount(onClose);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({});

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        connected_wallet.disconnect();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent p="1rem" pb="2rem">
        <ModalHeader fontWeight={'700'}>Tell Us About Yourself</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(submit)}>
          <ModalBody display="flex" flexDirection={'column'} gap="1rem" pb={6}>
            {/* Full Name */}
            <FormControl isRequired>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <Input
                isRequired
                id="name"
                placeholder="Name"
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
                name="name"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/*userName */}
            <FormControl isRequired>
              <FormLabel htmlFor="name">User Name</FormLabel>
              <InputGroup>
                <InputLeftAddon>@</InputLeftAddon>
                <Input
                  isRequired
                  type="text"
                  id="userName"
                  placeholder="User Name"
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
                name="userName"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/*Profile Picture URL */}
            <FormControl>
              <FormLabel htmlFor="image">Profile Picture</FormLabel>
              <InputGroup>
                <InputLeftAddon>URL:</InputLeftAddon>
                <Input
                  type="url"
                  id="image"
                  placeholder="Image URL"
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
                name="image"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter p="0rem 1rem">
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Create Account
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
