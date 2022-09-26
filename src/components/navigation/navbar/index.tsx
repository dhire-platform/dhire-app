import { Container, useDisclosure } from '@chakra-ui/react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import CreateUserModal from 'src/components/modals/CreateUser';
import { useWalletConnection } from 'src/lib/wallet/useWalletConnection';
import DashboardNavbar from './DashboardNav';
import LandingPageNavbar from './LandingPageNav';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useWalletConnection(isOpen, onOpen);

  return (
    <Container minW={'full'} p="0">
      <CreateUserModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      {user.walletId ? (
        <DashboardNavbar>
          <WalletMultiButton />
        </DashboardNavbar>
      ) : (
        <LandingPageNavbar>
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
        </LandingPageNavbar>
      )}
    </Container>
  );
};
export default Navbar;
