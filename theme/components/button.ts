/* eslint-disable import/no-anonymous-default-export */
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
        bg: props.colorMode === 'dark' ? '#D7D7D7' : '#555555',
        color: props.colorMode === 'dark' ? 'black' : 'white',
        shadow: 'xl',
        transform: 'translateY(-0.1rem)',
        transition: 'all 0.3s ease-in-out',
      },
      _active: {
        bg: props.colorMode === 'dark' ? '#D7D7D7' : '#555555',
        color: props.colorMode === 'dark' ? 'black' : 'white',
        shadow: 'xl',
        transform: 'translateY(-0.1rem)',
        transition: 'all 0.3s ease-in-out',
      },
    }),
  },
  sizes: {
    md: {
      fontSize: '20px',
    },
    sm: {
      fontSize: '15px',
      p: '0.5rem 1rem',
    },
  },
};
