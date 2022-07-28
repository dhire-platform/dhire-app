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

const Section1 = () => {
  return (
    <Container maxW='6xl'>
      <Flex
        flexDir={{ base: 'column', md: 'row-reverse' }}
        alignItems={'center'}
        justifyContent='space-around'
      >
        <Center
          alignItems={{ base: 'center', md: 'start' }}
          gap='0.7rem'
          flexDirection={'column'}
          p='2rem'
          textAlign={{ base: 'center', md: 'start' }}
        >
          <Heading fontSize={['32px', '42px', '42px']}>
            Access the work you love
          </Heading>
          <Text
            maxW='36rem'
            fontSize={['20px', '22px', '26px']}
            fontWeight='500'
            color='#686868'
          >
            You work. Your Future.
          </Text>
          <Button>Start Hunting</Button>
        </Center>
        <Center
          w={{ base: '20rem', md: '20rem' }}
          minH='20rem'
          position='relative'
        >
          <Image
            src='/assets/Saly.webp'
            alt='saly'
            layout='fill'
            objectFit='contain'
          />
        </Center>
      </Flex>
    </Container>
  );
};

export default Section1;
