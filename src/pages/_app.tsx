import theme from '@/config/chakra.config';
import { ChakraProvider, ColorModeProvider, Progress } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { usePersistanceStore } from 'src/app/store/persistance/persistanceStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';

import Layout from 'src/components/HOC/Layout.HOC';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider: any = dynamic(
  () => import('../context/WalletConnectionProvider'),
  {
    ssr: false,
  }
);
function MyApp({ Component, pageProps, router }: AppProps) {
  const { user } = useProfileStore();
  const { user: persistenceUser } = usePersistanceStore();

  return (
    <WalletConnectionProvider>
      <ChakraProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorModeProvider>
      </ChakraProvider>
    </WalletConnectionProvider>
  );
}

export default MyApp;
