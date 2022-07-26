import config from '@/config/general.config';
import { Button, Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import ChooseUs from 'src/components/landing/ChooseUs';
import Hero from 'src/components/landing/Hero/Hero';
import Scroll from 'src/components/landing/Hero/Scroll';
import Philosophy from 'src/components/landing/Philosophy';
import SEO from 'src/components/SEO/SEO';

const Home: NextPage = () => {
  return (
    <div>
      <SEO
        title={`${config.general.name}`}
        description={`${config.general.name} is a decentralized hiring platform`}
        image={``}
      />
      <Container maxW='full' p='0'>
        <Hero />
        <Scroll />
        <ChooseUs />
        <Philosophy />
      </Container>
    </div>
  );
};

export default Home;
