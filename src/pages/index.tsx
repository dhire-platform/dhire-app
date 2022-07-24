import config from '@/config/general.config';
import { Button, Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import SEO from 'src/components/SEO/SEO';

const Home: NextPage = () => {
  return (
    <div>
      <SEO
        title={`${config.general.name}`}
        description={`${config.general.name} is a decentralized hiring platform`}
        image={``}
      />
      <Container maxW='full' p='0'></Container>
    </div>
  );
};

export default Home;
