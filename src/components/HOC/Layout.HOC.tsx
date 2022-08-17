import { Container } from '@chakra-ui/react';
import { useProfileStore } from 'src/app/profileStore';
import Background from '../Background';
import Footer from '../navigation/footer';
import Navbar from '../navigation/navbar';
import { IProfileStore } from 'src/definitions/definitions';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  const user = useProfileStore((state: IProfileStore) => state.user);

  return (
    <Container
      display='flex'
      flexDirection='column'
      justifyContent={'space-between'}
      maxW='full'
      p='0'
      zIndex='1'
    >
      {user.walletId ? '' : <Background />}
      <Navbar />
      {children}
      {user.walletId ? '' : <Footer />}
    </Container>
  );
};

export default Layout;
