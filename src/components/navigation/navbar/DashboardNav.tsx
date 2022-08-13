import {
  Center,
  Container,
  Heading,
  useColorModeValue,
  Drawer,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Stack,
  Button,
  useDisclosure,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
} from '@chakra-ui/react';
import Link from 'next/link';
import {
  FC,
  SyntheticEvent,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStore } from 'src/app/localStore';
import { useProfileStore } from 'src/app/profileStore';
import EditProfile from 'src/components/dashboard/Editprofile';
import { IProfile } from 'src/definitions/IUser';
import ChakraTagInput from 'src/helpers/ChakraTagInput';

type Props = {
  children: JSX.Element;
};

const DashboardNavbar = ({ children }: Props) => {
  const setProfile = useProfileStore((state: any) => state.setProfile);
  const { edit_mode, set_edit_mode } = useLocalStore();
  const { userProfile } = useProfileStore();
  const [tags, setTags] = useState(userProfile.skills);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    if (edit_mode) {
      onOpen();
    }
  }, [edit_mode]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: userProfile.name,
      bio: userProfile.bio,
      about: userProfile.about,
      image: userProfile.image,
    },
  });

  function onSubmit(values: any) {
    const { name, bio, image, about } = values;
    const data: IProfile = { name, bio, about, image, skills: tags };
    setProfile(data);
    onClose();
  }

  const handleTagsChange = useCallback(
    (event: SyntheticEvent, tags: string[]) => {
      setTags(tags);
    },
    []
  );

  return (
    <>
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
            <ModalBody
              display='flex'
              flexDirection={'column'}
              gap='1rem'
              pb={6}
            >
              {/* Full Name */}
              <FormControl>
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
                  })}
                />
                <FormErrorMessage>errors?.name?.message</FormErrorMessage>
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
                    {...register('image')}
                  />
                </InputGroup>
              </FormControl>

              {/*Short Bio */}
              <FormControl>
                <FormLabel htmlFor='name'>Short Bio</FormLabel>
                <Input id='bio' placeholder='Bio' {...register('bio')} />
              </FormControl>

              {/* About */}
              <FormControl>
                <FormLabel htmlFor='name'>About</FormLabel>
                <Input
                  id='about'
                  placeholder='About You'
                  {...register('about', {
                    maxLength: {
                      value: 200,
                      message: 'Maximum length should be 200',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.about && errors.about.message}
                </FormErrorMessage>
              </FormControl>

              {/* Skills */}
              <FormControl>
                <FormLabel htmlFor='name'>Skills</FormLabel>
                <ChakraTagInput
                  tags={tags}
                  onTagsChange={handleTagsChange}
                  //  colorScheme='red'
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
      <Container
        color={'black'}
        bg={useColorModeValue('white', 'blackAlpha.800')}
        zIndex={'999'}
        position='fixed'
        filter={'blur(100)'}
        borderBottom='1px solid'
        borderColor={'gray.100'}
        p='0'
        maxW='full'
      >
        <Stack
          maxW={'95rem'}
          mx='auto'
          direction={'row'}
          align={'center'}
          justifyContent='space-between'
          p='1rem 2rem'
        >
          <Center>
            <Heading fontSize='2xl'>dhire.</Heading>
          </Center>
          <Stack direction={'row'}>
            <Button
              onClick={onOpen}
              variant='outline'
              fontSize='md'
              _hover={{ transform: 'translate(0)', bg: 'gray.50' }}
              _active={{ transform: 'translate(0)', bg: 'gray.50' }}
            >
              Edit Profile
            </Button>{' '}
            <Stack direction='row' align='center'>
              {children}
            </Stack>
          </Stack>
        </Stack>
      </Container>{' '}
    </>
  );
};

export default DashboardNavbar;
