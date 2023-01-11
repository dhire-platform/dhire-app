import { ISocial } from '@/interfaces/store/data/socials.interface';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineMail } from 'react-icons/ai';
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import useProfileEdit from './useProfileEdit';
const socials = {
  youtube: <BsYoutube color="#A0AEC0" size="18px" />,
  twitter: <BsTwitter color="#A0AEC0" size="18px" />,
  facebook: <FaFacebook color="#A0AEC0" size="18px" />,
  linkedin: <BsLinkedin color="#A0AEC0" size="18px" />,
  instagram: <BsInstagram color="#A0AEC0" size="18px" />,
  github: <BsGithub color="#A0AEC0" size="18px" />,
};
const EditProfileComponent = ({ isOpen, onOpen, onClose }: any) => {
  const { user, userProfile } = useProfileStore();
  const router = useRouter();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({});

  const onSubmit = useProfileEdit({ isOpen, onClose, reset });
  const submitData = async (data: any) => {
    let result = await onSubmit(data);
    toast({
      position: 'top',
      title: result === 'error' ? 'Error!' : 'DONE !!',
      description: result === 'error' ? '' : 'Successfully Added.',
      status: result,
      duration: 1000,
      isClosable: true,
      containerStyle: {
        marginTop: '10%',
      },
    });
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      scrollBehavior="outside"
      size="xl"
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your Profile</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(submitData)}>
          <ModalBody display="flex" flexDirection={'column'} gap="1rem" pb={6}>
            {/*userName */}
            {router.pathname === '/profile' && (
              <FormControl isRequired>
                <FormLabel htmlFor="name">User Name</FormLabel>
                <InputGroup>
                  <InputLeftAddon>@</InputLeftAddon>
                  <Input
                    defaultValue={user?.username}
                    isRequired
                    type="text"
                    id="userName"
                    placeholder="User Name"
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
                  name="userName"
                  render={({ message }) => (
                    <Text fontSize="sm" color="red.500" py="0.5rem">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
            )}

            {/* EMAIL */}
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftAddon>
                  <Icon as={AiOutlineMail} />
                </InputLeftAddon>
                <Input
                  isRequired
                  defaultValue={userProfile.email}
                  type="text"
                  id="email"
                  placeholder="abc@xyz.com"
                  {...register('email', {
                    required: 'Enter your e-mail',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Enter a valid e-mail address',
                    },
                  })}
                />
              </InputGroup>
              <ErrorMessage
                errors={errors}
                name="email"
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

            {/* Location */}
            <FormControl>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                defaultValue={userProfile.location}
                placeholder="Your location"
                {...register('location')}
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

            {/* About */}
            <FormControl>
              <FormLabel htmlFor="bio">About</FormLabel>
              <Textarea
                id="bio"
                placeholder="About You"
                defaultValue={userProfile.bio}
                {...register('bio', {
                  maxLength: {
                    value: 200,
                    message: 'Maximum length should be 200',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="bio"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Socials</FormLabel>
              <Flex wrap={'wrap'} gap={3} justifyContent="space-between">
                {Object.keys(socials).map((key, index) => (
                  <InputGroup w={{ base: '100%', md: '48%' }} key={index}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={socials[key as keyof ISocial]}
                    />
                    <Input
                      placeholder="https://abc.com/xyz"
                      _placeholder={{ color: 'blackAlpha.500', fontSize: 'sm' }}
                      {...register(key)}
                      defaultValue={
                        userProfile.social
                          ? userProfile.social[key as keyof ISocial]
                          : ''
                      }
                    />
                  </InputGroup>
                ))}
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="blue"
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
