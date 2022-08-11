import {
  Avatar,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const Education = () => {
  return (
    <Center
      w='clamp(16rem, 42vw, 36rem)'
      rounded='lg'
      flexDirection={'column'}
      justifyContent='start'
      color={useColorModeValue('white', 'blackAlpha.600')}
      gap='1rem'
      p='1.5rem'
      alignItems='start'
      border='1px solid'
      borderColor={'gray.100'}
    >
      <Stack alignContent={'start'} direction={'column'}>
        <Heading color={'black'} fontSize='xl'>
          Education
        </Heading>
        <Text color='gray.500'>
          CBSC Animation, AAFT Chhattisgarh, Raipur 2022.
        </Text>
      </Stack>{' '}
      <Divider />
      <Heading color={'black'} fontSize='xl'>
        Experience
      </Heading>
      <Flex
        py='1rem'
        gap='0.7rem'
        minW='100%'
        wrap='wrap'
        color={'black'}
        maxW='36rem'
      >
        <Stack direction={'row'}>
          <Avatar
            src='http://logok.org/wp-content/uploads/2015/09/Google-logo-2015-G-icon-1024x768.png'
            size='md'
            bg='white'
          />
          <Stack direction={'column'}>
            <Heading fontSize={'xl'}>Google</Heading>
            <Text fontSize='md'>Aug 2022, Present</Text>
            <Divider />
            <Heading fontSize={'lg'}>Lead UX Designer</Heading>
            <Text fontSize={'sm'} color='gray.500'>
              Design full feature of batmobile autopilot. Userfloe, high
              feadility mockup.
            </Text>
          </Stack>
        </Stack>
        <Stack direction={'row'}>
          <Avatar
            src='http://logok.org/wp-content/uploads/2015/09/Google-logo-2015-G-icon-1024x768.png'
            size='md'
            bg='white'
          />
          <Stack direction={'column'}>
            <Heading fontSize={'xl'}>Google</Heading>
            <Text fontSize='md'>Aug 2022, Present</Text>
            <Divider />
            <Heading fontSize={'lg'}>Lead UX Designer</Heading>
            <Text fontSize={'sm'} color='gray.500'>
              Design full feature of batmobile autopilot. Userfloe, high
              feadility mockup.
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Center>
  );
};

export default Education;
