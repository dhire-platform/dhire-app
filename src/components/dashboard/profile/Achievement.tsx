import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useProfileStore } from 'src/app/profileStore';

const Achievement = () => {
  const { userProfile } = useProfileStore();
  return (
    <Center
      w='clamp(16rem, 42vw, 36rem)'
      rounded='lg'
      flexDirection={'column'}
      justifyContent='start'
      gap='1rem'
      p='1.5rem'
      alignItems='start'
      border='1px solid'
      color='gray.200'
    >
      {userProfile.achievement ? (
        <>
          <Stack alignContent={'start'} direction={'row'}>
            <Heading color={'black'} fontSize='xl'>
              Achievement
            </Heading>
          </Stack>
          <Flex
            gap='0.7rem'
            minW='100%'
            wrap='wrap'
            color={'black'}
            maxW='36rem'
          >
            <Text>{userProfile.achievement}</Text>
          </Flex>
        </>
      ) : (
        <>
          <Stack
            border={'1px dashed'}
            borderColor='gray.200'
            p='1rem'
            rounded='md'
            align={'center'}
            direction={'column'}
            w='full'
          >
            <Heading color={'black'} fontSize='xl'>
              Achievements
            </Heading>
            <Text pb='1rem' color='gray.400'>
              Edit profile to Enter Achievements
            </Text>
            <Button fontSize={'xs'} my='1rem'>
              Edit Profile
            </Button>
          </Stack>
        </>
      )}
    </Center>
  );
};

export default Achievement;
