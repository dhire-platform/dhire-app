import config from '@/config/general.config';
import { Center, Container, Spinner, useDisclosure } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useProfileStore } from 'src/app/profileStore';
import ChooseUs from 'src/components/landing/Home/ChooseUs';
import Hero from 'src/components/landing/Home/Hero/Hero';
import Scroll from 'src/components/landing/Home/Hero/Scroll';
import Philosophy from 'src/components/landing/Home/Philosophy';
import Section1 from 'src/components/landing/Home/Sections/Section1';
import Section2 from 'src/components/landing/Home/Sections/Section2';
import CreateUserModal from 'src/components/modals/CreateUser';
import SEO from 'src/components/SEO/SEO';
import { IProfileStore } from 'src/definitions/definitions';

const Home: NextPage = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const wallet = useProfileStore((state: IProfileStore) => state.wallet);

  return (
    <>
      <SEO
        title={`${config.general.name}`}
        description={`${config.general.name} is a decentralized hiring platform`}
        image={`https://solana.ghost.io/content/images/2022/06/solana-network-upgrades.png`}
      />
      {!wallet.walletId ? (
        <Container maxW="full" p="0">
          <CreateUserModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
          <Hero />
          <Scroll />
          <ChooseUs />
          <Philosophy />
          <Section1 />
          <Section2 />
        </Container>
      ) : (
        <Container>
          <Center w="full" h="80vh">
            <Spinner size="xl" />
          </Center>
        </Container>
      )}
    </>
  );
};

export default Home;
