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
    '.wallet-adapter-button': {
      padding: '0rem 2rem',
      rounded: '6px',
      fontSize: '18px',
      lineHeight: '0',
      fontWeight: '400',
      height: '2.5rem',
      bg: mode('black', '#FDFDFF')(props),
      color: mode('#FDFDFF', 'black')(props),
      _hover: {
        bg: props.colorMode === 'dark' ? '#1e1e1e' : '#555555',
        color: props.colorMode === 'dark' ? 'black' : 'white',
        shadow: 'xl',
        transform: 'translateY(-0.1rem)',
        transition: 'all 0.2s ease-in-out',
      },
      _active: {
        bg: props.colorMode === 'dark' ? '#1e1e1e' : '#555555',
        color: props.colorMode === 'dark' ? 'black' : 'white',
        shadow: 'xl',
        transform: 'translateY(-0.1rem)',
        transition: 'all 0.2s ease-in-out',
      },
    },
    '.wallet-adapter-modal-wrapper': {
      bg: 'white',
      color: 'black',
    },
    '.wallet-adapter-modal-button-close': {
      bg: '#dbdbdb',
      color: 'black',
    },
    '.wallet-adapter-modal-title': {
      color: 'black',
    },
    '.wallet-adapter-modal-content': {
      color: 'black',
    },
    '.wallet-adapter-modal-list .wallet-adapter-button': {
      bg: 'white',
      color: 'black',
      border: '1px solid gray.100',
      _hover: {
        bg: 'gray.100',
        color: 'string',
        shadow: 'none',
        transform: 'translate(0)',
        transition: 'none',
      },
    },
    '.wallet-adapter-button-end-icon, .wallet-adapter-button-start-icon, ': {
     // display: 'none',
    },
    '.wallet-adapter-modal-list-more': {
      color: 'black',
    },
    '.wallet-adapter-modal-list-more .svg': {
      color: 'black',
    },
    '.wallet-adapter-modal-list-more-icon-rotate': {
      color: 'black',
    },
    '.wallet-adapter-dropdown-list': {
      bg: 'white',
      color: 'black',
      shadow: 'none',
      border: '1px solid',
      borderColor: 'gray.200',
      rounded: 'md',
    },
    '.wallet-adapter-dropdown-list-item': {
      bg: 'white',
      color: 'black',
      border: '1px solid gray.100',
      fontSize: 'lg',
      fontWeight: '400',
      padding: '0.5rem 1rem',
      textAlign: 'left',
      _hover: {
        bg: '#eaeaea',
        color: 'black',
        shadow: 'none',
        transform: 'translate(0)',
        transition: 'none',
      },
    },
    '.wallet-adapter-dropdown-list-item:not([disabled]):hover': {
      bg: '#eaeaea',
    },
  }),
};
