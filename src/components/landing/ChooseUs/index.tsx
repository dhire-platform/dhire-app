import { Button, Center, Container, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const ChooseUs = () => {
  return (
    <Container maxW='4xl' py='8rem'>
      <Center alignItems='start' gap='1rem' flexDirection={'column'}>
        <Heading fontSize={['32px', '48px', '60px']}>Why choose us?</Heading>
        <Text maxW='36rem'>
          Being a transparent On-chain platform, both users and organizations
          will experience easy job-hunting and on-boarding, with no
          intermediary. As a user, you get fast and mandatory feedback on your
          application from the organization
        </Text>
        <Button>Learn More</Button>
      </Center>
    </Container>
  );
};

export default ChooseUs;
