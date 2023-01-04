import { Center, Container, Spinner, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { IProfileStore } from '@/interfaces/store/profileStore.interface';
import Background from '../Background';
import Navbar from '../navigation/navbar';
import CreateUserModal from '../modals/CreateUserModal';
import { useWalletConnection } from 'src/lib/hooks/useWalletConnection/useWalletConnection';
import UserTypeModal from '../modals/UserTypeModal';
import { roleEnum } from 'src/lib/enums/enums';
import { useWallet } from '@solana/wallet-adapter-react';
import Footer from '../navigation/footer';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<any>();
  //const wallet = useProfileStore((state: IProfileStore) => state.wallet);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenType,
    onOpen: onOpenType,
    onClose: onCloseType,
  } = useDisclosure();

  const user = useWalletConnection(isOpenType, onOpenType);

  const { user: userDetails } = useProfileStore();
  const wallet = useWallet();
  const router = useRouter();
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
      {!wallet.connected ? <Background /> : ''}
      {wallet.connected &&
        (!userDetails.id || router.pathname === '/') &&
        !isOpen &&
        !isOpenType && (
          <Center
            w="100%"
            h="100vh"
            bg={'rgba(0,0,0,0.95)'}
            pos={'fixed'}
            top={0}
            zIndex={99999}
          >
            <Spinner
              color="white"
              w={['40px', '60px', '100px']}
              h={['40px', '60px', '100px']}
            />
          </Center>
        )}
      <UserTypeModal
        isOpen={isOpenType}
        onOpen={onOpenType}
        onClose={onCloseType}
        openNext={onOpen}
        setUserData={setUserData}
      />
      <CreateUserModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        userData={userData || { userType: roleEnum.RECRUIT }}
      />
      <Navbar />
      {children}
      {!wallet.connected ? <Footer /> : ''}
    </Container>
  );
};

export default Layout;
