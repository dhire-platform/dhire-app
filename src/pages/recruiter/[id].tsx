import {
  Center,
  Container,
  Flex,
  Heading,
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
import { useEffect, useState } from 'react';
import EditProfileComponent from 'src/components/dashboard/profile/UserDetails/ProfileEditModal';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { roleEnum } from 'src/lib/enums/enums';
import { AboutOrganisation } from 'src/components/dashboard/recruiter/AboutOrganisation';
import { RecruiterProcess } from 'src/components/dashboard/recruiter/RecruiterProcess';
import { Schedule } from 'src/components/dashboard/recruiter/Schedule';
import { ActionButtons } from 'src/components/dashboard/recruiter/ActionButtons';
import { Applications } from 'src/components/hire/Applications';
import UserApplication from 'src/components/modals/UserApplication';
import { BiArrowBack, BiHome, BiHomeAlt } from 'react-icons/bi';
import JobsList from 'src/components/dashboard/recruiter/JobList';
import { useJobStore } from 'src/app/store/job/jobStore';
import { BsBriefcase } from 'react-icons/bs';
import { IJobs } from '@/interfaces/store/data/job.interface';
import { IUserProfile } from '@/interfaces/store/data/userProfile.interface';
import { JobDetails } from 'src/components/hire/JobDetails';

const Recruiter = () => {
  const [userDetails, setUserDetails] = useState<IUserProfile>();
  const [applicantDetails, setApplicantDetails] = useState<IJobs>();
  const [jobDetails, setJobDetails] = useState<IJobs>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const { user, recruiterProfile, company } = useProfileStore();
  const { job } = useJobStore();
  const nav_width = { base: '50px', lg: '150px' };
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
                onClick={() => {
                  setUserDetails(undefined);
                  setJobDetails(undefined);
                  setApplicantDetails(undefined);
                }}
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
            <TabPanels ml={nav_width}>
              <TabPanel p={[2, 4]}>
                <Center w="full">
                  <Flex
                    w="full"
                    mx="auto"
                    minH={{ base: 'full', md: 'clamp(54rem,180vh, 60rem)' }}
                    gap="2rem"
                    alignItems="center"
                    alignContent={'center'}
                    justifyContent={'top'}
                    flexDirection={'column'}
                  >
                    <ActionButtons />
                    <AboutOrganisation />
                    <RecruiterProcess />
                    <Schedule />
                  </Flex>
                </Center>
              </TabPanel>
              <TabPanel p={0}>
                <Center w="full" pos="relative">
                  {userDetails ? (
                    <UserApplication
                      setUserDetails={setUserDetails}
                      userDetails={userDetails}
                    />
                  ) : applicantDetails ? (
                    <Applications
                      openUser={setUserDetails}
                      applicantDetails={applicantDetails}
                    />
                  ) : jobDetails ? (
                    <JobDetails
                      job={jobDetails}
                      setJobDetails={setJobDetails}
                    />
                  ) : (
                    <VStack pt={3} w="95%">
                      <ActionButtons />
                      <JobsList
                        openJob={setJobDetails}
                        openApplicant={setApplicantDetails}
                      />
                    </VStack>
                  )}
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
