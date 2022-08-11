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
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProfileStore } from 'src/app/profileStore';
import { IProfile } from 'src/definitions/IUser';
import { MdOutlineEdit } from 'react-icons/md';

const SkillsComponent = () => {
  const { userProfile } = useProfileStore();
  const skills: string[] = userProfile.skills!;

  //console.log('skills -', skills);
  return (
    <Center
      w='clamp(16rem, 42vw, 36rem)'
      rounded='lg'
      flexDirection={'column'}
      justifyContent='start'
      gap='1rem'
      p='1.5rem'
      alignItems='start'
      border={'1px solid'}
      color='gray.200'
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
            p='1rem'
            rounded='md'
            align={'center'}
            direction={'column'}
            w='full'
          >
            <Heading color={'black'} fontSize='xl'>
              Skills
            </Heading>
            <Text pb='1rem' color='gray.400'>
              Edit profile to Enter Skills
            </Text>
            <Button fontSize={'xs'} my='1rem'>
              Add Skills
            </Button>
          </Stack>
        </>
      )}
    </Center>
  );
};

export default SkillsComponent;
