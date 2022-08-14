import {
  Center,
  Container,
  Heading,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';

type Props = {
  children: JSX.Element;
};

const DashboardNavbar = ({ children }: Props) => {
  return (
    <>
      <Container
        color={'black'}
        bg={useColorModeValue('white', 'blackAlpha.800')}
        zIndex={'999'}
        position='fixed'
        filter={'blur(100)'}
        borderBottom='1px solid'
        borderColor={'gray.100'}
        p='0'
        maxW='full'
      >
        <Stack
          maxW={'95rem'}
          mx='auto'
          direction={'row'}
          align={'center'}
          justifyContent='space-between'
          p='1rem 2rem'
        >
          <Center>
            <Heading fontSize='2xl'>dhire.</Heading>
          </Center>
          <Stack direction='row' align='center'>
            {children}
          </Stack>
        </Stack>
      </Container>{' '}
    </>
  );
};

export default DashboardNavbar;
