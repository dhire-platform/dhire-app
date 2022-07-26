import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('#FDFDFF', '#212121')(props),
      color: mode('#212121', '#FDFDFF')(props),
    },

    ':root': {
      '--chakra-colors-primary-400': mode('#7C82FB', '#94d3ac')(props),
      '--chakra-colors-primary-500': mode('#5F63FC', '#29c7ac')(props),
    },
  }),
};
