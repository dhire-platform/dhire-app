import { Box, Center, Container, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthStore } from 'src/app/authStore';
import { Redirect } from 'src/helpers/Redirect';

const Dashboard = () => {
  const isAuth = useAuthStore((state: any) => state.isAuth);
  if (!isAuth) {
    Redirect('/');
  }
  return (
    <Container maxW='full' h='70vh'>
      <Center w='full' py='4rem' h='60vh'>
        <Heading
          maxW='60rem'
          fontWeight={'600'}
          letterSpacing='-0.03em'
          lineHeight={['54px', '72px', '102px']}
          fontSize={['48px', '60px', '94px']}
        >
          Coming Soon
        </Heading>
      </Center>
    </Container>
  );
};

export default Dashboard;
