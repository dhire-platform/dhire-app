import { Container, useDisclosure } from '@chakra-ui/react';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { IProfileStore } from '@/interfaces/store/profileStore.interface';
import Background from '../Background';
import Navbar from '../navigation/navbar';
import CreateUserModal from '../modals/CreateUserModal';
import { useWalletConnection } from 'src/lib/hooks/useWalletConnection/useWalletConnection';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  //const wallet = useProfileStore((state: IProfileStore) => state.wallet);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useWalletConnection(isOpen, onOpen);

  return (
    <Container
      background={'white'}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxW="full"
      p="0"
      zIndex="1"
    >
      {user.wallet?.walletId ? '' : <Background />}
      <CreateUserModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Navbar />
      {children}
    </Container>
  );
};

export default Layout;
