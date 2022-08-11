import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '@/config/chakra.config';
import WebsiteLayout from 'src/components/layout';
import DashboardLayout from 'src/components/HOC/UserLayout.HOC';
import dynamic from 'next/dynamic';
import { useProfileStore } from 'src/app/profileStore';
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider: any = dynamic(
  () => import('../context/WalletConnectionProvider'),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  const { pubKey, userProfile } = useProfileStore();
  const publicKey = pubKey;
  return (
    <WalletConnectionProvider>
      <ChakraProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          {publicKey ? (
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          ) : (
            <WebsiteLayout>
              <Component {...pageProps} />
            </WebsiteLayout>
          )}
        </ColorModeProvider>
      </ChakraProvider>
    </WalletConnectionProvider>
  );
}

export default MyApp;
