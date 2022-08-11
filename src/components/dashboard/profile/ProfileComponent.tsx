/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Center,
  Heading,
  Stack,
  Text,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  useColorModeValue,
  Textarea,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineEdit } from 'react-icons/md';
import { useProfileStore } from 'src/app/profileStore';

const ProfileComponent = () => {
  const { userProfile } = useProfileStore();
  return (
    <Center
      bg={useColorModeValue('white', 'blackAlpha.600')}
      w='clamp(16rem, 42vw, 36rem)'
      rounded='lg'
      flexDirection={'column'}
      gap='1rem'
      p='1.5rem'
      alignItems='start'
      border='1px solid'
      borderColor={'gray.100'}
      color={'black'}
    >
      {userProfile.name ? (
        <>
          <Stack direction={'row'} w='full'>
            <Avatar
              size='lg'
              name={userProfile.name}
              colorScheme='black'
              src='https://www.whatsappprofiledpimages.com/whatsapp-profile-images/'
            />
            <Stack w='full' direction={'column'}>
              <Heading color={'black'} fontSize='xl'>
                {userProfile.name}
              </Heading>
              <Text color='gray.400'>{userProfile.bio}</Text>
            </Stack>
          </Stack>
          <Text color={'black'} w='100%' maxW='36rem'>
            Experienced UI/UX Designer with a strong bachground with marketing,
            Communication and psychology.
          </Text>
        </>
      ) : (
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
            Profile
          </Heading>
          <Text pb='1rem' color='gray.400'>
            Edit profile to Enter details
          </Text>
          <Button fontSize={'xs'} my='1rem'>
            Edit Profile
          </Button>
        </Stack>
      )}
    </Center>
  );
};

export default ProfileComponent;
