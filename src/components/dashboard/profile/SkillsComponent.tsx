import {
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Tag,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProfileStore } from 'src/app/profileStore';
import { IProfile } from 'src/definitions/IUser';
import { MdOutlineEdit } from 'react-icons/md';
import { useLocalStore } from 'src/app/localStore';

const SkillsComponent = () => {
  const { userProfile } = useProfileStore();
  const { set_edit_mode } = useLocalStore();
  const skills: string[] = userProfile.skills!;

  //console.log('skills -', skills);
  return (
    <Center
      bg='white'
      w='clamp(16rem, 42vw, 36rem)'
      rounded='lg'
      flexDirection={'column'}
      justifyContent='start'
      gap='1rem'
      p='1.5rem'
      alignItems='start'
      border={'1px solid'}
      color='blackAlpha.200'
    >
      {skills[0] ? (
        <>
          <Stack w='full' justifyContent='space-between' direction={'row'}>
            <Heading color={'black'} fontSize='xl'>
              Skills
            </Heading>
          </Stack>
          <Flex
            gap='0.7rem'
            minW='100%'
            wrap='wrap'
            color={'black'}
            maxW='36rem'
          >
            {skills?.map((skill: string) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </Flex>
        </>
      ) : (
        <>
          <Stack
            border={'1px dashed'}
            borderColor='gray.200'
            p='3rem 1rem'
            rounded='md'
            align={'center'}
            direction={'column'}
            w='full'
          >
            <Heading
              //  p='1rem 1rem'
              //  bg='blackAlpha.200'
              rounded={'full'}
              color={'black'}
              fontSize='xl'
            >
              Skills
            </Heading>
            <Text pb='1.5rem' color='blackAlpha.400'>
              Add Your Skills by editing your profile.
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
              Add Skills
            </Box>
          </Stack>
        </>
      )}
    </Center>
  );
};

export default SkillsComponent;
