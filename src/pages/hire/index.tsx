import { Box, Center, Container, Heading, keyframes } from '@chakra-ui/react';
import React from 'react';

const animationKeyframes = keyframes`
  from {
    background-position: 0 0;
  to {
    background-position: 100% 100%;
  }
`;
const animation1 = `${animationKeyframes} 2s infinite alternate-reverse`;
const animation2 = `${animationKeyframes} 3s infinite alternate-reverse`;

const index = () => {
  return (
    <Container maxW="full" h="70vh">
      <Center w="full" py="4rem" h="60vh">
        <Heading
          maxW="60rem"
          fontWeight={'800'}
          letterSpacing="-0.03em"
          lineHeight={['54px', '72px', '102px']}
          fontSize={['48px', '60px', '94px']}
        >
          <Box
            as="span"
            bgGradient="linear(to-l, #6AADF1, #81F2F8, #7D8FFF, #6AADF1)"
            bgClip="text"
            backgroundPosition={'-100%'}
            backgroundSize={'300%'}
            animation={animation2}
          >
            Coming Soon
          </Box>
        </Heading>
      </Center>
    </Container>
  );
};

export default index;
