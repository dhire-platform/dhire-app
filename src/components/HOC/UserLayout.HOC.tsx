import { Container } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container minW='full' minH='100vh'>
      {children}
    </Container>
  );
};

export default Layout;
