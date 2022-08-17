import {
  Avatar,
  Box,
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
import { useLocalStore } from 'src/app/localStore';
import { useProfileStore } from 'src/app/profileStore';

const Achievement = () => {
  const { user } = useProfileStore();
  const { set_edit_mode } = useLocalStore();

  return (
    <Center
    shadow={'lg'}
      bg='white'
      w={{ base: '100%', md: 'clamp(16rem, 42vw, 36rem)' }}
      rounded='lg'
      flexDirection={'column'}
      justifyContent='start'
      gap='1rem'
      p='1.5rem'
      alignItems='start'
      border='1px solid'
      color='blackAlpha.200'
    >
      {user.achievement ? (
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
            <Text>{user.achievement}</Text>
          </Flex>
        </>
      ) : (
        <>
          <Stack
            border={'1px dashed'}
            borderColor='blackAlpha.400'
            p='3rem 1rem'
            rounded='md'
            align={'center'}
            direction={'column'}
            w='full'
          >
            <Heading color={'black'} fontSize='xl'>
              Achievements
            </Heading>
            <Text pb='1.5rem' color='blackAlpha.400'>
              You have not added any Achievements yet.
            </Text>
            <Box
              onClick={() => set_edit_mode(true)}
              as='button'
              outline='1px solid gray'
              p='0.2rem 0.6rem'
              rounded='sm'
              fontSize={'xs'}
              my='1rem'
              color='black'
            >
              Add Achievements
            </Box>
          </Stack>
        </>
      )}
    </Center>
  );
};

export default Achievement;
