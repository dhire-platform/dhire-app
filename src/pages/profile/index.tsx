import {
  Box,
  Center,
  Container,
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStore } from 'src/app/localStore';
import { useProfileStore } from 'src/app/profileStore';
import Achievement from 'src/components/dashboard/profile/Achievement';
import Education from 'src/components/dashboard/profile/Education';
import Experience from 'src/components/dashboard/profile/Education';
import ProfileComponent from 'src/components/dashboard/profile/ProfileComponent';
import EditProfileComponent from 'src/components/dashboard/profile/ProfileEditModal';
import SkillsComponent from 'src/components/dashboard/profile/SkillsComponent';
import { ErrorMessage } from '@hookform/error-message';

const Profile = () => {
  const { user } = useProfileStore();
  const editProfile = useProfileStore((state: any) => state.editProfile);
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

  // use meidaQuery to get width of scrren
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <Container maxW='full' py='4rem' bg={'#FBFBFB'} color={'black'} px='0'>
        <Container p='1rem' maxW='8xl' my='2rem'>
          <Tabs
            variant={'unstyled'}
            orientation={isMobile ? 'vertical' : 'horizontal'}
          >
            <TabList alignItems={'start'}>
              <Tab>
                <Text
                  fontSize='lg'
                  fontWeight='600'
                  //  _selected={{ fontSize: 'xl', fontWeight: '800' }}
                >
                  Profile
                </Text>
              </Tab>
              <Tab isDisabled>
                <Text fontSize='lg' fontWeight='600'>
                  Dashboard
                </Text>
              </Tab>
              <Tab isDisabled>
                <Text fontSize='lg' fontWeight='600'>
                  Settings
                </Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Center px='1rem' w='full'>
                  <Center
                    border='1px dashed'
                    borderColor={'blackAlpha.300'}
                    textAlign={'center'}
                    flexDirection={'column'}
                    w='100%'
                    rounded='md'
                    maxW='5xl'
                    h='50vh'
                  >
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Center flexDirection='column' gap='1rem' align={'start'}>
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
                                  message:
                                    'User Name can not contain white spacing',
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
                        <Button
                          isLoading={isSubmitting}
                          type='submit'
                          colorScheme='blue'
                          mr={3}
                        >
                          Submit
                        </Button>
                      </Center>
                    </form>
                  </Center>
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Container>
    </>
  );
};

export default Profile;
