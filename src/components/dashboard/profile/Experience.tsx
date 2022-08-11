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

const Experience = () => {
  return (
    <Center
      w='clamp(16rem, 42vw, 36rem)'
      rounded='lg'
      flexDirection={'column'}
      justifyContent='start'
      gap='1rem'
      p='1.5rem'
      alignItems='start'
      border='1px solid'
      color='gray.200'
    >
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
            src='http://logok.org/wp-content/uploads/2021/11/Facebook-Logo-2019-1536x1152.png'
            size='md'
            bg='white'
          />
          <Stack direction={'column'}>
            <Heading fontSize={'xl'}>Facebook</Heading>
            <Text fontSize='md'>Aug 2022, Present</Text>
            <Divider />
            <Heading fontSize={'lg'}>Frontend Developer</Heading>
            <Text fontSize={'sm'} color='gray.500'>
              Design full feature of batmobile autopilot. Userfloe, high
              feadility mockup.
            </Text>
          </Stack>
        </Stack>
        <Stack direction={'row'}>
          <Avatar
            src='http://logok.org/wp-content/uploads/2021/11/Facebook-Logo-2019-1536x1152.png'
            size='md'
            bg='white'
          />
          <Stack direction={'column'}>
            <Heading fontSize={'xl'}>FAcebook</Heading>
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

export default Experience;
