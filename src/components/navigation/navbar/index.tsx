import { Container } from '@chakra-ui/react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import DashboardNavbar from './DashboardNav';
import LandingPageNavbar from './LandingPageNav';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { useWallet } from '@solana/wallet-adapter-react';

// write props
const Navbar = () => {
  const { user } = useProfileStore((state) => state);
  const wallet = useWallet();
  return (
    <Container minW={'full'} p="0" background={'transparent'} zIndex={2}>
      {user?.id && wallet.connected ? (
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
