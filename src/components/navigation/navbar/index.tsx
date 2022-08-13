import { useState, useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import DashboardNavbar from './DashboardNav';
import LandingPageNavbar from './LandingPageNav';
import { useProfileStore } from 'src/app/profileStore';
import { useLocalStore } from 'src/app/localStore';

const Navbar = () => {
  const { setPubKey, pubKey } = useProfileStore();
  const [publicKey, setPublicKey] = useState(pubKey);
  const { wallet_connected, set_wallet_connected } = useLocalStore();

  const wallet = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (wallet.connected) {
      set_wallet_connected(true);
      // if connected then save the value of pubKey and redirect to /profile
      setPublicKey(wallet?.publicKey?.toBase58()!);

      if (publicKey.length > 0) {
        setPubKey(publicKey);
      }
      router.replace('/profile');
    } else {
      set_wallet_connected(false);
      // if wallet disconnected then remove the value of pubkey and redirect to home page
      setPublicKey('');
      setPubKey(publicKey);
      router.replace('/');
    }
  }, [publicKey, wallet.connected]);

  return (
    <Container minW={'full'} p='0'>
      {publicKey ? (
        <DashboardNavbar>
          <WalletMultiButton />
        </DashboardNavbar>
      ) : (
        <LandingPageNavbar>
          <WalletMultiButton />
        </LandingPageNavbar>
      )}
    </Container>
  );
};
export default Navbar;
