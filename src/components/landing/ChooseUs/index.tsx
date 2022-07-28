import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);

const variant1 = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.4,
      ease: 'easeOut',
    },
  },
  hidden: { opacity: 0, y: 100 },
};
const variant2 = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.6,
      ease: 'easeOut',
    },
  },
  hidden: { opacity: 0, y: 100 },
};
const variant3 = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.8,
      ease: 'easeOut',
    },
  },
  hidden: { opacity: 0, y: 100 },
};

const ChooseUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <Container maxW='6xl' py='8rem'>
      <Flex
        justify='space-between'
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems='center'
      >
        <Center
          w={{ base: '22rem', md: '25rem' }}
          minH='25rem'
          position='relative'
        >
          <Image
            src='/assets/Saly.png'
            alt='saly'
            layout='fill'
            objectFit='contain'
          />
        </Center>
        <Center
          p='1rem'
          ref={ref}
          alignItems={{ base: 'center', md: 'start' }}
          textAlign={{ base: 'center', md: 'start' }}
          gap='1.2rem'
          flexDirection={'column'}
        >
          <MotionBox animate={controls} variants={variant1} initial='hidden'>
            <Heading fontSize={['32px', '48px', '60px']}>
              Why choose us?
            </Heading>
          </MotionBox>
          <MotionBox animate={controls} variants={variant2} initial='hidden'>
            <Text maxW='36rem'>
              Being a transparent On-chain platform, both users and
              organizations will experience easy job-hunting and on-boarding,
              with no intermediary. As a user, you get fast and mandatory
              feedback on your application from the organization
            </Text>
          </MotionBox>
          <MotionBox animate={controls} variants={variant3} initial='hidden'>
            <Button>Learn More</Button>
          </MotionBox>
        </Center>
      </Flex>
    </Container>
  );
};

export default ChooseUs;
