import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BiNotepad } from 'react-icons/bi';
import {
  BsFillBriefcaseFill,
  BsHourglassSplit,
  BsTrophy,
} from 'react-icons/bs';
import { HiAcademicCap } from 'react-icons/hi';
import { FaUserTie } from 'react-icons/fa';
import { TbTools } from 'react-icons/tb';
import { MdLocationOn } from 'react-icons/md';

const UserApplication = () => {
  const fields = [
    {
      field: 'Experience',
      icon: BsFillBriefcaseFill,
    },
    {
      field: 'About Me',
      icon: BiNotepad,
    },
    {
      field: 'Education',
      icon: HiAcademicCap,
    },
    {
      field: 'Employment',
      icon: FaUserTie,
    },
    {
      field: 'Key Skills',
      icon: TbTools,
    },
    {
      field: 'Prefered location',
      icon: MdLocationOn,
    },
    {
      field: 'Achievement',
      icon: BsTrophy,
    },
    {
      field: 'Notice Period',
      icon: BsHourglassSplit,
    },
  ];
  return (
    <Container maxW="90%" mx="auto" mb="3rem">
      <Heading textAlign="center" fontSize={'2rem'} my={'1rem'}>
        Application
      </Heading>
      <VStack
        w="full"
        bg="rgba(255,255,255,0.6)"
        borderRadius={'50px'}
        overflow="hidden"
        gap={'50px'}
        pb="2rem"
      >
        <Box
          w="full"
          h="100px"
          bg="linear-gradient(90deg, rgba(127, 127, 213, 0.44) 0.93%, #86A8E7 59.1%, #91EAE4 120.46%)"
        >
          <HStack pos="relative" top="50%" px="5%" gap="20px">
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=female"
              w="100px"
              h="100px"
              borderRadius={'50%'}
            />
            <VStack alignItems={'flex-start'}>
              <Heading>Kia</Heading>
              <Heading>Antonoc</Heading>
            </VStack>
          </HStack>
        </Box>
        <VStack alignItems="flex-start" w="full" color={'#333'} p={'50px 5%'}>
          <VStack alignItems="flex-start">
            <HStack>
              <Icon as={BsFillBriefcaseFill} w={6} h={6} />
              <Heading fontWeight={600} fontSize={['1.5rem']}>
                Experience
              </Heading>
            </HStack>
            <Text fontSize={['1rem']}>
              Specialise in UI/UX Design with 5-Years of Experience.
            </Text>
          </VStack>

          <VStack alignItems="flex-start" w="full">
            <Heading>About Me</Heading>
            <Text>
              I am flexible, reliable and possess excellent time keeping skills.
              I am an enthusiastic, self-motivated, reliable, responsible and
              hard working person. I am a mature team worker and adaptable to
              all challenging situations. I am able to work well both in a team
              environment as well as using own initiative.
            </Text>
          </VStack>
          <VStack>
            <Heading>Education</Heading>
            <Text>Specialise in UI/UX Design with 5-Years of Experience.</Text>
          </VStack>
          <VStack>
            <Heading>Employment</Heading>
            <Text>Specialise in UI/UX Design with 5-Years of Experience.</Text>
          </VStack>
          <VStack>
            <Heading>Key Skills</Heading>
            <Text>Specialise in UI/UX Design with 5-Years of Experience.</Text>
          </VStack>
          <VStack>
            <Heading>Prefered location</Heading>
            <Text>Specialise in UI/UX Design with 5-Years of Experience.</Text>
          </VStack>
          <VStack>
            <Heading>Achievement</Heading>
            <Text>
              I am flexible, reliable and possess excellent time keeping skills.
              I am an enthusiastic, self-motivated, reliable, responsible and
              hard working person. I am a mature team worker and adaptable to
              all challenging situations. I am able to work well both in a team
              environment as well as using own initiative.
            </Text>
          </VStack>
          <VStack>
            <Heading>Notice Period</Heading>
            <Text>2 months</Text>
          </VStack>
        </VStack>
        <HStack>
          <Button colorScheme={'green'} variant={'outline'}>
            Interview
          </Button>
          <Button colorScheme={'red'} variant={'outline'}>
            Reject
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};
export default UserApplication;
