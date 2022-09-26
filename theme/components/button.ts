import { StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Button = {
  baseStyles: {
    bg: 'green',
  },
  backgroundColor: 'black',
  variants: {
    solid: (props: StyleFunctionProps) => ({
      fontWeight: '500',
      bg: props.colorMode === 'dark' ? 'white' : 'black',
      color: props.colorMode === 'dark' ? 'black' : 'white',
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
    }),
    outline: (props: StyleFunctionProps) => ({
      fontWeight: '500',
      bg: 'transparent',
      rounded: 'lg',
      color: props.colorMode === 'dark' ? 'white' : 'black',
      _hover: {
        bg: 'transparent',
        color: props.colorMode === 'dark' ? 'black' : 'black',
        shadow: 'xl',
        transform: 'translateY(-0.1rem)',
        transition: 'all 0.2s ease-in-out',
      },
      _active: {
        bg: 'transparent',
        color: props.colorMode === 'dark' ? 'black' : 'black',
        shadow: 'xl',
        transform: 'translateY(-0.1rem)',
        transition: 'all 0.2s ease-in-out',
      },
    }),
  },
  sizes: {
    md: {
      fontSize: '18px',
      p: '0.5rem 1rem',
    },
    sm: {
      fontSize: '15px',
      p: '0.5rem 1rem',
    },
  },
};
