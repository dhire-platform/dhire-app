import theme from '@/config/chakra.config';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useProfileStore } from 'src/app/profileStore';
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
  const route = useRouter();

  const ProtectedRoute = ['profile'];
  ProtectedRoute.forEach((protectedRoute) => {
    route.pathname.split('/').forEach((element) => {
      if (protectedRoute === element) {
        if (!user) {
          router.push('/');
        }
      }
    });
  });

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
