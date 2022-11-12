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
import { roleEnum } from 'src/lib/enums/enums';
import { useCreateRecruiterAccount } from 'src/lib/hooks/createUser/useCreateRecruiter';
import { useCreateAccount } from 'src/lib/hooks/createUser/useCreateUser';

const CreateUserModal = ({
  isOpen,
  onOpen,
  onClose,
  userData: { name, userType },
}: any) => {
  const connected_wallet = useWallet();
  const submit =
    userType === roleEnum.RECRUIT
      ? useCreateAccount(onClose)
      : useCreateRecruiterAccount(onClose);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({});

  const addRecruiterFields = () => {
    return (
      <>
        {/* COMPANY NAME */}
        <FormControl isRequired>
          <FormLabel htmlFor="company">Company name</FormLabel>
          <Input
            isRequired
            id="company"
            placeholder="XYZ Coorporation"
            {...register('company', {
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
            name="company"
            render={({ message }) => (
              <Text fontSize="sm" color="red.500" py="0.5rem">
                {message}
              </Text>
            )}
          />
        </FormControl>

        {/* COMPANY WEBSITE */}
        <FormControl>
          <FormLabel htmlFor="website">Website</FormLabel>
          <Input
            id="website"
            placeholder="xyz.com"
            {...register('website', {
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
            name="website"
            render={({ message }) => (
              <Text fontSize="sm" color="red.500" py="0.5rem">
                {message}
              </Text>
            )}
          />
        </FormControl>

        {/* COMPANY LOCATION */}
        <FormControl>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            id="location"
            placeholder="Location"
            {...register('location', {
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
            name="location"
            render={({ message }) => (
              <Text fontSize="sm" color="red.500" py="0.5rem">
                {message}
              </Text>
            )}
          />
        </FormControl>
      </>
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        console.log('modal close wallet disconnect');
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
                defaultValue={name}
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
                  defaultValue={name}
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

            {userType === roleEnum.RECRUITER && addRecruiterFields()}
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
