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
  Button,
  Text,
  Heading,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useLocalStore } from 'src/app/localStore';
import { useProfileStore } from 'src/app/profileStore';
import Achievement from 'src/components/dashboard/profile/Achievement';
import Education from 'src/components/dashboard/profile/Education';
import Experience from 'src/components/dashboard/profile/Education';
import ProfileComponent from 'src/components/dashboard/profile/ProfileComponent';
import EditProfileComponent from 'src/components/dashboard/profile/ProfileEditModal';
import SkillsComponent from 'src/components/dashboard/profile/SkillsComponent';

const Profile = () => {
  const { userProfile } = useProfileStore();
  const { set_edit_mode, edit_mode } = useLocalStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // use meidaQuery to get width of scrren
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <EditProfileComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
                <Center w='full'>
                  {userProfile.name?.length ? (
                    <Flex
                      mx='auto'
                      h={{ base: 'full', md: 'clamp(54rem,180vh, 60rem)' }}
                      gap='2rem'
                      flexWrap={'wrap'}
                      alignItems='center'
                      alignContent={'center'}
                      justifyContent={'top'}
                      flexDirection={{ base: 'row', md: 'column' }}
                    >
                      <ProfileComponent />
                      <Education />
                      <SkillsComponent />
                      <Achievement />
                      {/* <Experience /> */}
                    </Flex>
                  ) : (
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
                      <Heading
                        mb='2rem'
                        rounded='full'
                        bg='blackAlpha.50'
                        p='1rem 1.5rem'
                        fontSize='6xl'
                      >
                        📝
                      </Heading>
                      <Text pb='1rem' fontSize='xl'>
                        There is nothing to show
                      </Text>
                      <Text maxW='28rem' color={'blackAlpha.400'} fontSize='md'>
                        You have not entered any data yet. Click on Edit button
                        to enter data to show on your profile{' '}
                      </Text>
                      <Button
                        _hover={{
                          bg: 'blackAlpha.100',
                        }}
                        rounded='md'
                        border='1px solid'
                        borderColor={'blackAlpha.400'}
                        fontSize={'sm'}
                        pl='1rem'
                        pr='1rem'
                        mt='1rem'
                        variant='unstyled'
                        onClick={onOpen}
                        fontWeight='300'
                      >
                        Edit Profile
                      </Button>
                    </Center>
                  )}
                </Center>
              </TabPanel>
              <TabPanel>
                <Text size='xl' fontWeight='600'>
                  <Container minW='full' h='100vh'>
                    Coming Soon
                  </Container>
                </Text>
              </TabPanel>
              <TabPanel>
                <Text size='xl' fontWeight='600'>
                  <Container minW='full' h='100vh'>
                    Coming Soon
                  </Container>
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Stack
            direction='row'
            justify='space-between'
            align={'start'}
          ></Stack>
        </Container>
      </Container>
    </>
  );
};

export default Profile;
