import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { Button } from 'theme/components/button';
import { fonts } from 'theme/fonts';
import { styles } from 'theme/styles';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  fonts,
  components: {
    Button,
  },
});

export default theme;
