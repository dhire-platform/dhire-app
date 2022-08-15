import { useState, useEffect, useRef } from 'react';
import { Container, Flex, Image, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import DashboardNavbar from './DashboardNav';
import LandingPageNavbar from './LandingPageNav';
import { useProfileStore } from 'src/app/profileStore';
import { useLocalStore } from 'src/app/localStore';
import { usePersistanceStore } from 'src/app/persistanceStore';
import { IProfileStore } from 'src/definitions/definitions';

const Navbar = () => {
  const setPubKey = useProfileStore((state: any) => state.setPubKey);
  const user = useProfileStore((state: IProfileStore) => state.user);
  const { userId, userName, setUserName, setUserId } = usePersistanceStore();

  const wallet = useWallet();

  const wallet_connected_toast = useToast();
  useEffect(() => {
    if (wallet.connected) {
      console.log('wallet connected 💰');
      //setPubKey(wallet.publicKey?.toBase58);
      // request to backend for data
    } else if (wallet.disconnecting) {
      console.log('wallet is disconnecting 💰');
    } else if (!wallet.connected) {
      console.log('wallet not connected 💰');
    }
  }, [wallet.connected]);

  return (
    <Container minW={'full'} p='0'>
      {user.wallet ? (
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
