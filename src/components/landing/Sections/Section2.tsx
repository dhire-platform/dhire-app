import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const Section2 = () => {
  return (
    <Container maxW='6xl' py='5rem'>
      <Flex alignItems={'center'} justifyContent='space-around'>
        <Center alignItems='start' gap='0.7rem' flexDirection={'column'}>
          <Heading fontSize={['32px', '42px', '42px']}>
            Hire the best tech talent
          </Heading>
          <Text
            maxW='36rem'
            fontSize={['', '', '26px']}
            fontWeight='500'
            color='#686868'
          >
            Your culture. Your Future.
          </Text>
          <Button>Start Hiring</Button>
        </Center>
        <Center
          w={{ base: '15rem', md: '20rem' }}
          minH='20rem'
          position='relative'
        >
          <Image
            src='/assets/Saly.png'
            alt='saly'
            layout='fill'
            objectFit='contain'
          />
        </Center>
      </Flex>
    </Container>
  );
};

export default Section2;
