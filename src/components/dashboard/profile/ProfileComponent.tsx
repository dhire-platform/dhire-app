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
      <>
        <Stack direction={'row'} gap='0.5rem' w='full'>
          <Avatar
            size='lg'
            name={userProfile.name}
            colorScheme='black'
            src={userProfile.image}
          />
          <Stack w='full' direction={'column'}>
            <Heading color={'black'} fontSize='xl'>
              {userProfile.name}
            </Heading>
            <Text color='gray.400'>{userProfile.bio}</Text>
          </Stack>
        </Stack>
        <Heading
          fontWeight='300'
          fontSize={'md'}
          noOfLines={3}
          color={'black'}
          w='100%'
          maxW='36rem'
        >
          {userProfile.about}
        </Heading>
      </>
    </Center>
  );
};

export default ProfileComponent;
