import {
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

const JobDetails = () => {
  return (
    <Container maxW="4xl" bg="white" overflow="hidden" h="fit-content" p="1rem">
      <Stack p="1rem" spacing="1.5rem" mx="auto">
        <Stack spacing={'1rem'} align={'center'} direction={'row'}>
          <Center
            border="0.5px solid black"
            rounded="md"
            m="0.5rem"
            w={{ base: '3rem', md: 'full' }}
            h={{ base: '3rem', md: '4rem' }}
            maxW="4rem"
            position="relative"
          >
            <Image
              src={
                'http://logok.org/wp-content/uploads/2015/09/Google-logo-2015-G-icon-1024x768.png'
              }
              alt="Job Logo"
              layout="fill"
              objectFit="contain"
              style={{
                borderRadius: '6px',
              }}
            />
          </Center>
          <VStack spacing="0.4rem">
            <Heading fontSize={'2xl'}>Lead Product Design</Heading>
            <HStack gap="1rem" w="full">
              <Text>Company Name</Text>
              <Text>Location</Text>
            </HStack>
          </VStack>
        </Stack>
        <Divider />
        <HStack px="2rem" gap="2rem">
          <VStack spacing="0" alignItems={'start'}>
            <Text fontSize="sm" color="gray.500" fontWeight={'500'}>
              Experience
            </Text>
            <Text fontSize="md">Minimum 1 Years</Text>
          </VStack>
          <VStack spacing="0" alignItems={'start'}>
            <Text fontSize="sm" color="gray.500" fontWeight={'500'}>
              Work Type
            </Text>
            <Text fontSize="md">Senior Level</Text>
          </VStack>
          <VStack spacing="0" alignItems={'start'}>
            <Text fontSize="sm" color="gray.500" fontWeight={'500'}>
              Salary
            </Text>
            <Text fontSize="md">$80k - $110k/year</Text>
          </VStack>
        </HStack>
        <Divider />
        <VStack alignItems={'start'}>
          <Text fontSize="lg">Overview</Text>
          <Text fontSize="sm" color="gray.500" fontWeight="500">
            On the other hand, we denounce with righteous indignation and
            dislike men who are so beguiled and demoralized by the charms of
            pleasure of the moment, so blinded by desire, that they cannot
            foresee the pain and trouble that are bound to ensue; and equal
            blame belongs to those who fail in their duty through weakness of
            will, which is the same as saying through shrinking from toil and
            pain. These cases are perfectly simple and easy to distinguish. In a
            free hour, when our power of choice is untrammelled and when nothing
            prevents our being able to do what we like best, every pleasure is
            to be welcomed and every pain avoided.
          </Text>
        </VStack>
        <VStack alignItems={'start'}>
          <Text fontSize="lg">Job Description</Text>
          <Text px="1rem" fontSize="sm" color="gray.500" fontWeight="500">
            <ul>
              <li> Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
              <li>
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </li>
              <li>Duis aute irure dolor in reprehenderit</li>
            </ul>
          </Text>
        </VStack>
      </Stack>
    </Container>
  );
};

export default JobDetails;
