import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  keyframes,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

const animationKeyframes = keyframes`
  from {
    background-position: 0 0;
  to {
    background-position: 100% 100%;
  }
`;
const animation1 = `${animationKeyframes} 2s infinite alternate-reverse`;
const animation2 = `${animationKeyframes} 3s infinite alternate-reverse`;

const Hero = () => {
  return (
    <Container maxW='6xl' py={['8rem', '11rem']}>
      <VStack textAlign={'center'} gap={['1rem', '1.5rem', '2rem']}>
        <Heading
          maxW='60rem'
          fontWeight={'800'}
          letterSpacing='-0.03em'
          lineHeight={['54px', '72px', '102px']}
          fontSize={['48px', '60px', '94px']}
        >
          Find a
          <Box
            as='span'
            bgGradient='linear( to-r, #6AADF1, #81F2F8, #7D8FFF, #6AADF1)'
            bgClip='text'
            backgroundPosition={'-100%'}
            backgroundSize={'300%'}
            animation={animation1}
          >
            {' '}
            Job{' '}
          </Box>
          that matches your{' '}
          <Box
            as='span'
            bgGradient='linear(to-l, #6AADF1, #81F2F8, #7D8FFF, #6AADF1)'
            bgClip='text'
            backgroundPosition={'-100%'}
            backgroundSize={'300%'}
            animation={animation2}
          >
            Passion
          </Box>
        </Heading>
        <Text
          px={['1rem', '1rem', '1.5rem']}
          fontSize={['md', 'xl']}
          maxW='50rem'
        >
          D-Hire is an onboarding hunting platform both for Talent and
          Enterprises. We enable you to engage with new talent before their
          first day
        </Text>
        <HStack spacing='1rem'>
          <Button px='2rem'>Explore</Button>
          <Button px='2rem' variant={'outline'} outline='1px solid black'>
            Join Discord
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Hero;
