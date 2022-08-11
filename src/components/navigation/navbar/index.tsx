import { useState, useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import DashboardNavbar from './DashboardNav';
import LandingPageNavbar from './LandingPageNav';
import { useProfileStore } from 'src/app/profileStore';
import { IProfile } from 'src/definitions/IUser';
import { Redirect } from 'src/helpers/Redirect';

const Navbar = () => {
  const { setPubKey, pubKey } = useProfileStore();
  const [publicKey, setPublicKey] = useState(pubKey);
  const wallet = useWallet();
  const router = useRouter();

  useEffect(() => {
    console.log('pubkey - ', publicKey);
    if (wallet.connected && wallet.publicKey) {
      setPublicKey(wallet?.publicKey?.toBase58());
      if (publicKey) {
        setPubKey(publicKey);
        router.push('/profile');
      }
    } else {
      setPublicKey('');
      router.push('/');
    }
  }, [publicKey, wallet.connected, wallet.publicKey]);

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
