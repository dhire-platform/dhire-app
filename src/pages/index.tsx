import config from '@/config/general.config';
import {
  Button,
  Container,
  Box,
  Center,
  Flex,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Heading,
  useMediaQuery,
  Avatar,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  useColorModeValue,
  Textarea,
  IconButton,
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
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useLocalStore } from 'src/app/localStore';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { useProfileStore } from 'src/app/profileStore';
import ChooseUs from 'src/components/landing/Home/ChooseUs';
import Hero from 'src/components/landing/Home/Hero/Hero';
import Scroll from 'src/components/landing/Home/Hero/Scroll';
import Philosophy from 'src/components/landing/Home/Philosophy';
import Section1 from 'src/components/landing/Home/Sections/Section1';
import Section2 from 'src/components/landing/Home/Sections/Section2';
import SEO from 'src/components/SEO/SEO';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const Home: NextPage = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { user } = useProfileStore();
  const createUser = useProfileStore((state: any) => state.createUser);

  const router = useRouter();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

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

  async function onSubmit(values: any) {
    const { name, userName, image, about } = values;

    const data = { name, userName, about, image };
    const url = '/profile/' + userName;
    createUser(data)
      .then((res: any) => {
        router
          .push(url)
          .then(() => {
            //onClose();
          })
          .catch((err: any) => console.log(err));
      })
      .catch((err: any) => {
        console.log('Error From Server - ', err.message);
      });
  }

  const ModalViewContainer = () => {
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

  return (
    <>
      <SEO
        title={`${config.general.name}`}
        description={`${config.general.name} is a decentralized hiring platform`}
        image={`https://solana.ghost.io/content/images/2022/06/solana-network-upgrades.png`}
      />
      <Container maxW='full' p='0'>
        <ModalViewContainer />
        <Hero />
        <Scroll />
        <ChooseUs />
        <Philosophy />
        <Section1 />
        <Section2 />
      </Container>
    </>
  );
};

export default Home;
