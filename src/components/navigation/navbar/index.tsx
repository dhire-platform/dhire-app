import { useEffect } from 'react';
import { Container, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import DashboardNavbar from './DashboardNav';
import LandingPageNavbar from './LandingPageNav';
import { useProfileStore } from 'src/app/profileStore';
import { usePersistanceStore } from 'src/app/persistanceStore';
import axios from 'axios';
import CreateUserModal from 'src/components/modals/CreateUser';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, setWallet, createUser } = useProfileStore();
  const { userId, userWalletId, setPersistanceUser } = usePersistanceStore();

  const router = useRouter();
  const w = useWallet();

  useEffect(() => {
    if (w.connected) {
      console.log('wallet is connected ✅');
      // when wallet is connected check in the bakcend for key ( if wallet is connected fresh then there will be no keys stored locally so we dont need to check anything locally )
      console.log('wallet - ', w.publicKey?.toBase58());
      axios
        .get('/api/user/' + w.publicKey?.toBase58())
        .then((res: any) => {
          console.log(res);
          if (res?.data?.id) {
            console.log('wallet is connected and user is found 🤩', res.data);
            setUser({
              name: res.data.name,
              userName: res.data.username,
              id: res.data.id,
              walletId: res.data.wallet,
            });
            setPersistanceUser({
              userId: res.data.id as string,
              userName: res.data.username as string,
              userWalletId: res.data.wallet as string,
            });
            router.push('/profile/' + res.data.id);
          } else {
            console.log('wallet is connected and user is not found 🤩');
            onOpen();
          }
        })
        .catch((err: any) => {
          console.log('wallet is connected but user not found ❌', err.message);
          isOpen;
          // now show the modal to create account
          // w.disconnect();
        });
      // .finally(() => {
      //   console.log('wallet is connected and user is found or not found ❌');
      // });
    } else if (!w.connected) {
      console.log('wallet not connected ❌');
      setWallet('');
      setPersistanceUser({ userId: '', userName: '', userWalletId: '' });
      router.push('/');
    }
  }, [w.connected]);

  return (
    <Container minW={'full'} p='0'>
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
