import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

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
            bgGradient='linear(to-l, #6AADF1, #6B79D2)'
            bgClip='text'
          >
            {' '}
            Job{' '}
          </Box>
          that matches your{' '}
          <Box
            as='span'
            bgGradient='linear(to-l, #6AADF1, #6B79D2)'
            bgClip='text'
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
