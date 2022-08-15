import { Container, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useProfileStore } from 'src/app/profileStore';
import Background from '../Background';
import Footer from '../navigation/footer';
import Navbar from '../navigation/navbar';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { user } = useProfileStore();

  useEffect(() => {
    //    conle.log('public key - ', pubKey);
  }, [user.wallet, router]);

  return (
    <Container
      display='flex'
      flexDirection='column'
      justifyContent={'space-between'}
      maxW='full'
      p='0'
      zIndex='1'
    >
      {user.wallet.length > 0 ? '' : <Background />}
      <Navbar />
      {children}
      {user.wallet.length > 0 ? '' : <Footer />}
    </Container>
  );
};

export default Layout;
