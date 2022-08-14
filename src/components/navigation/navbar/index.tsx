import { useState, useEffect, useRef } from 'react';
import { Container, Flex, Image, useToast } from '@chakra-ui/react';
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
  const { set_wallet_connected } = useLocalStore();

  const wallet = useWallet();

  const wallet_connected_toast = useToast();

  useEffect(() => {
    if (wallet.connected) {
      set_wallet_connected(true);
      console.log(wallet.wallet?.adapter.name);
      setPublicKey(wallet?.publicKey?.toBase58()!);
      if (publicKey.length > 0) {
        setPubKey(publicKey);
        wallet_connected_toast({
          icon: (
            <Image
              minW='2.5rem'
              minH='2.5rem'
              mr={'1rem'}
              src={`${wallet.wallet?.adapter.icon}`}
            />
          ),
          colorScheme: 'blackAlpha',
          variant: 'success',
          position: 'bottom',
          title: `${wallet.wallet?.adapter.name} wallet Connected`,
          description: ` Enter your details to get started`,
          duration: 2500,
          containerStyle: {
            width: '360px',
            maxWidth: '100%',
            border: '1px solid gray',
            borderRadius: '8px',
          },
        });
      }
    } else if (!wallet.connected) {
      set_wallet_connected(false);
      setPublicKey('');
      setPubKey(publicKey);
      // wallet_disconnected_toast();
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
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
        </LandingPageNavbar>
      )}
    </Container>
  );
};
export default Navbar;
