import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import Navbar from '../components/navigation/navbar/index';
import { ChildInterface } from '@/interfaces/children/child.interface';
import Background from './Background';
import Footer from './navigation/footer';

const Layout = ({ children }: ChildInterface) => {
  return (
    <Container
      //minH='100vh'
      display='flex'
      flexDirection='column'
      justifyContent={'space-between'}
      maxW='full'
      p='0'
      zIndex='1'
    >
      <Background />
      <Navbar />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
