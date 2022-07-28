import config from '@/config/general.config';
import { Button, Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import ChooseUs from 'src/components/landing/ChooseUs';
import Hero from 'src/components/landing/Hero/Hero';
import Scroll from 'src/components/landing/Hero/Scroll';
import Philosophy from 'src/components/landing/Philosophy';
import Section1 from 'src/components/landing/Sections/Section1';
import Section2 from 'src/components/landing/Sections/Section2';
import SEO from 'src/components/SEO/SEO';

const Home: NextPage = () => {
  return (
    <div>
      <SEO
        title={`${config.general.name}`}
        description={`${config.general.name} is a decentralized hiring platform`}
        image={`https://solana.ghost.io/content/images/2022/06/solana-network-upgrades.png`}
      />
      <Container maxW='full' p='0'>
        <Hero />
        <Scroll />
        <ChooseUs />
        <Philosophy />
        <Section1 />
        <Section2 />
      </Container>
    </div>
  );
};

export default Home;
