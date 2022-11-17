import {
  Box,
  Center,
  Container,
  Flex,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Jobs from 'src/components/dashboard/jobs/Jobs';
import Achievement from 'src/components/dashboard/profile/Achievement';
import Education from 'src/components/dashboard/profile/Education';
import ProfileComponent from 'src/components/dashboard/profile/ProfileComponent';
import EditProfileComponent from 'src/components/dashboard/profile/UserDetails/ProfileEditModal';
import SkillsComponent from 'src/components/dashboard/profile/SkillsComponent';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { roleEnum } from 'src/lib/enums/enums';
import Projects from 'src/components/dashboard/profile/Projects';
import { BiHomeAlt } from 'react-icons/bi';
import { BsBriefcase } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import Profile from 'src/components/dashboard/userApplication/Profile';

const User = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const { user } = useProfileStore();
  let nav_width = { base: '50px', lg: '150px' };
  const renderTab = (tab: string, icon: any) => {
    return (
      <Tab
        _selected={{
          bg: 'black',
          color: 'white',
        }}
        borderLeft={'1px solid transparent'}
        fontSize={{ base: 'xl', lg: 'lg' }}
        fontWeight="600"
        w="100%"
        mt="10px"
      >
        <Icon as={icon} display={{ lg: 'none' }} my={2} />
        <Text
          w="full"
          textAlign={'left'}
          pl={3}
          display={{ base: 'none', lg: 'inline-block' }}
        >
          {tab}
        </Text>
      </Tab>
    );
  };
  useEffect(() => {
    if (user.type === roleEnum.RECRUITER) router.push('/recruiter/' + user.id);
  }, [router]);
  return (
    <>
      <EditProfileComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Container
        maxW="full"
        bgGradient={
          'linear-gradient(to bottom, #bcc0e65e , rgba(255,255,255,1) 100%)'
        }
        color={'black'}
        px="0"
      >
        <Container p="0" maxW="8xl" my="2rem">
          <Tabs
            variant={'unstyled'}
            orientation={isMobile ? 'vertical' : 'horizontal'}
          >
            <TabList
              alignItems={'start'}
              borderRight="1px solid #F1F1F1"
              bg="rgba(255,255,255,0.6)"
              mx={0}
              pt={'60px'}
              h="100vh"
              pos="fixed"
              w={nav_width}
            >
              {renderTab('Dashboard', BiHomeAlt)}
              {renderTab('Profile', FaUserAlt)}
              {renderTab('Jobs', BsBriefcase)}
            </TabList>
            <TabPanels ml={nav_width} pt={'50px'}>
              <TabPanel>
                <Center w="full">
                  <Flex
                    mx="auto"
                    w="100%"
                    p={'10px'}
                    // h={{ base: 'full', md: 'clamp(54rem,180vh, 60rem)' }}
                    gap="2rem"
                    justifyContent={'space-evenly'}
                    flexDirection={{ base: 'column', md: 'row' }}
                  >
                    <VStack w={{ base: '100%', md: '47%' }} gap={'1rem'}>
                      <ProfileComponent />
                      <Education />
                    </VStack>
                    <VStack w={{ base: '100%', md: '47%' }} gap={'1rem'}>
                      <SkillsComponent />
                      <Achievement />
                      <Projects />
                    </VStack>
                  </Flex>
                </Center>
              </TabPanel>
              <TabPanel pt={0}>
                <Text as="div" size="xl" fontWeight="600">
                  <Container minW="full" h="100vh" p={[0, 0, 2]} pt={0}>
                    <Profile />
                  </Container>
                </Text>
              </TabPanel>
              <TabPanel p={0}>
                <Text as="div" size="xl" fontWeight="600">
                  <Container minW="full" p={[0, 0, '1rem']}>
                    <Jobs />
                  </Container>
                </Text>
              </TabPanel>
              <TabPanel>
                <Text as="div" size="xl" fontWeight="600">
                  <Container minW="full" h="100vh">
                    Coming Soon
                  </Container>
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Stack
            direction="row"
            justify="space-between"
            align={'start'}
          ></Stack>
        </Container>
      </Container>
    </>
  );
};

export default User;
