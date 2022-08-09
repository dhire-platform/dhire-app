import { Container, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import DashboardNavbar from '../navigation/dashboard/navbar';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <Container bg={useColorModeValue('white', 'black')} maxW='full' p='0'>
      <Container
        maxW={'full'}
        p='0'
        display={router.pathname === '/setup' ? 'none' : 'block'}
      >
        <DashboardNavbar />
      </Container>
      {children}
    </Container>
  );
};

export default DashboardLayout;
