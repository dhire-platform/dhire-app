import {
  Center,
  Container,
  Flex,
  Heading,
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
import EditProfileComponent from 'src/components/dashboard/profile/UserDetails/ProfileEditModal';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { roleEnum } from 'src/lib/enums/enums';
import { AboutOrganisation } from 'src/components/dashboard/recruiter/AboutOrganisation';
import { RecruiterProcess } from 'src/components/dashboard/recruiter/RecruiterProcess';
import { Schedule } from 'src/components/dashboard/recruiter/Schedule';
import { ActionButtons } from 'src/components/dashboard/recruiter/ActionButtons';
import { Applications } from 'src/components/hire/Applications';

const Recruiter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const { user, recruiterProfile } = useProfileStore();
  const nav_width = '150px';
  useEffect(() => {
    if (user.type === roleEnum.RECRUIT) router.push('/profile/' + user.id);
  }, [router]);
  return (
    <>
      <EditProfileComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Container
        maxW="full"
        py="2.5rem"
        bgGradient={
          'linear-gradient(to bottom, #bcc0e65e , rgba(255,255,255,1) 100%)'
        }
        color={'black'}
        px="0"
      >
        <Container maxW="8xl" my="2rem" p={0}>
          <Tabs
            variant={'unstyled'}
            orientation={isMobile ? 'vertical' : 'horizontal'}
          >
            <TabList
              alignItems={'start'}
              borderRight="1px solid #F1F1F1"
              bg="rgba(255,255,255,0.4)"
              mx={0}
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
                fontSize="lg"
                fontWeight="600"
                w="100%"
                mb="20px"
                mt="40px"
              >
                <Text>Dashboard</Text>
              </Tab>
              <Tab
                _selected={{
                  bg: 'black',
                  color: 'white',
                }}
                borderLeft={'1px solid transparent'}
                fontSize="lg"
                fontWeight="600"
                w="100%"
              >
                <Text>Applications</Text>
              </Tab>
            </TabList>
            <TabPanels ml={nav_width}>
              <TabPanel>
                <Center w="full">
                  <Flex
                    w="full"
                    mx="auto"
                    minH={{ base: 'full', md: 'clamp(54rem,180vh, 60rem)' }}
                    gap="2rem"
                    flexWrap={'wrap'}
                    alignItems="center"
                    alignContent={'center'}
                    justifyContent={'top'}
                    flexDirection={{ base: 'row', md: 'column' }}
                  >
                    <ActionButtons />
                    <AboutOrganisation />
                    <RecruiterProcess />
                    <Schedule />
                  </Flex>
                </Center>
              </TabPanel>
              <TabPanel>
                <Center w="full">
                  <Flex
                    w="full"
                    mx="auto"
                    minH={'full'}
                    gap="2rem"
                    flexWrap={'wrap'}
                    alignItems="center"
                    alignContent={'center'}
                    justifyContent={'top'}
                    flexDirection={{ base: 'row', md: 'column' }}
                  >
                    <Applications />
                  </Flex>
                </Center>
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

export default Recruiter;
