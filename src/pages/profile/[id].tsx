import {
  Center,
  Container,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import Jobs from 'src/components/dashboard/jobs/Jobs';
import Achievement from 'src/components/dashboard/profile/Achievement';
import Education from 'src/components/dashboard/profile/Education';
import ProfileComponent from 'src/components/dashboard/profile/ProfileComponent';
import EditProfileComponent from 'src/components/dashboard/profile/UserDetails/ProfileEditModal';
import SkillsComponent from 'src/components/dashboard/profile/SkillsComponent';

const User = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <EditProfileComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Container
        maxW="full"
        py="4rem"
        bgGradient={
          'linear-gradient(to bottom, #bcc0e65e , rgba(255,255,255,1) 100%)'
        }
        color={'black'}
        px="0"
      >
        <Container p="1rem" maxW="8xl" my="2rem">
          <Tabs
            variant={'unstyled'}
            orientation={isMobile ? 'vertical' : 'horizontal'}
          >
            <TabList alignItems={'start'}>
              <Tab
                _selected={{
                  borderLeft: '1px solid black',
                }}
                borderLeft={'1px solid transparent'}
                fontSize="lg"
                fontWeight="600"
              >
                <Text>Dashboard</Text>
              </Tab>
              <Tab
                _selected={{
                  borderLeft: '1px solid black',
                }}
                borderLeft={'1px solid transparent'}
                fontSize="lg"
                fontWeight="600"
              >
                <Text>Jobs</Text>
              </Tab>
              <Tab isDisabled>
                <Text fontSize="lg" fontWeight="600">
                  Profile
                </Text>
              </Tab>
              <Tab isDisabled>
                <Text fontSize="lg" fontWeight="600">
                  Settings
                </Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Center w="full">
                  <Flex
                    mx="auto"
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
                    {/* <Experience /> */}
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
