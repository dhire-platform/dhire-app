import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '@/config/chakra.config';
import WebsiteLayout from 'src/components/layout';
import { redirect } from 'next/dist/server/api-utils';
import DashboardLayout from 'src/components/HOC/UserLayout.HOC';
import { useAuthStore } from 'src/app/authStore';

function MyApp({ Component, pageProps }: AppProps) {
  const isAuth = useAuthStore((state: any) => state.isAuth);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        {isAuth ? (
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
  );
}

export default MyApp;
