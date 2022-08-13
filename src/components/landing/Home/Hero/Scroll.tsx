import { Box, Center, Container, keyframes, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useRef } from 'react';

const Svg = () => {
  return (
    <Center w='2rem' h='1rem'>
      <svg viewBox='0 0 22 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M1.13062 0.58606L10.9611 10.4165L20.7916 0.58606'
          stroke='black'
          strokeLinecap='round'
        />
      </svg>
    </Center>
  );
};

const animationKeyframes = keyframes`
   0% {opacity:0}
   40% {opacity:1}
   80% {opacity:0}
   100% {opacity:0}
`;
const animation1 = `${animationKeyframes} 2s -1s infinite`;
const animation2 = `${animationKeyframes} 2s -0.5s infinite`;
const animation3 = `${animationKeyframes} 2s 0s infinite`;

const Scroll = () => {
  return (
    <Container maxW='full' mx='auto' py='4rem'>
      <Center flexDirection='column'>
        <Box display='flex' flexDirection='column'>
          <Box as={motion.div} animation={animation1}>
            <Svg />
          </Box>
          <Box as={motion.div} animation={animation2}>
            <Svg />
          </Box>
          <Box as={motion.div} animation={animation3}>
            <Svg />
          </Box>
        </Box>
      </Center>
    </Container>
  );
};

export default Scroll;
