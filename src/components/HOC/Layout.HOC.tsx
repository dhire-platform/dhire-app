import { Container } from '@chakra-ui/react';
import { useProfileStore } from 'src/app/profileStore';
import { IProfileStore } from 'src/definitions/definitions';
import Background from '../Background';
import Footer from '../navigation/footer';
import Navbar from '../navigation/navbar';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  const wallet = useProfileStore((state: IProfileStore) => state.wallet);

  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxW="full"
      p="0"
      zIndex="1"
    >
      {wallet.walletId ? '' : <Background />}
      <Navbar />
      {children}
      {wallet.walletId ? '' : <Footer />}
    </Container>
  );
};

export default Layout;
