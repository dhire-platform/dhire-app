import { Container, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { IProfileStore } from '@/interfaces/store/profileStore.interface';
import Background from '../Background';
import Navbar from '../navigation/navbar';
import CreateUserModal from '../modals/CreateUserModal';
import { useWalletConnection } from 'src/lib/hooks/useWalletConnection/useWalletConnection';
import UserTypeModal from '../modals/UserTypeModal';
import { roleEnum } from 'src/lib/enums/enums';

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
    </Container>
  );
};

export default Layout;
