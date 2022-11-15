import {
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

const User = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const { user } = useProfileStore();
  let nav_width = { base: '50px', lg: '150px' };
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
              bg="rgba(255,255,255,0.4)"
              mx={0}
              pt={'20px'}
              h="100vh"
              pos="fixed"
              w={nav_width}
            >
              <Tab
                _selected={{
                  bg: 'black',
                  color: 'white',
                }}
                borderLeft={'1px solid transparent'}
                fontSize={{ base: 'xl', lg: 'lg' }}
                fontWeight="600"
                w="100%"
                mt="40px"
              >
                <Icon as={BiHomeAlt} display={{ lg: 'none' }} my={2} />
                <Text
                  w="full"
                  textAlign={'left'}
                  pl={3}
                  display={{ base: 'none', lg: 'inline-block' }}
                >
                  Dashboard
                </Text>
              </Tab>
              <Tab
                _selected={{
                  bg: 'black',
                  color: 'white',
                }}
                borderLeft={'1px solid transparent'}
                fontSize={{ base: 'xl', lg: 'lg' }}
                fontWeight="600"
                w="100%"
              >
                <Icon as={BsBriefcase} display={{ lg: 'none' }} my={2} />
                <Text
                  w="full"
                  textAlign={'left'}
                  pl={3}
                  display={{ base: 'none', lg: 'inline-block' }}
                >
                  Jobs
                </Text>
              </Tab>
            </TabList>
            <TabPanels ml={nav_width} pt={'50px'}>
              <TabPanel>
                <Center w="full">
                  <Flex
                    mx="auto"
                    w="100%"
                    h={{ base: 'full', md: 'clamp(54rem,180vh, 60rem)' }}
                    gap="2rem"
                    flexWrap={'wrap'}
                    alignItems="center"
                    alignContent={'center'}
                    justifyContent={'top'}
                    flexDirection={{ base: 'row', md: 'column' }}
                  >
                    <ProfileComponent />
                    <Education />
                    <SkillsComponent />
                    <Achievement />
                    <Projects />
                  </Flex>
                </Center>
              </TabPanel>
              <TabPanel>
                <Text size="xl" fontWeight="600">
                  <Container minW="full" h="100vh">
                    <Jobs />
                  </Container>
                </Text>
              </TabPanel>
              <TabPanel>
                <Text size="xl" fontWeight="600">
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
