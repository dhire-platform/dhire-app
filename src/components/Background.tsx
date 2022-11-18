import { Box, Container, useMediaQuery } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';

const Background = () => {
  const [isLargerThan720] = useMediaQuery('(min-width: 720px)');
  const wallet = useWallet();
  return (
    <Container
      zIndex={1}
      maxW={'full'}
      display="flex"
      alignItems={'center'}
      justifyContent="center"
    >
      <Container
        top="0"
        maxW="130rem"
        position={'absolute'}
        zIndex="-1"
        overflow="hidden"
        h="100%"
        pt="20rem"
        _after={{
          // pink
          content: '""',
          position: 'absolute',
          background: '#F5CAFC',
          top: `${isLargerThan720 ? '6rem' : '8rem'}`,
          left: `${isLargerThan720 ? '0' : '-3rem'}`,
          width: `${isLargerThan720 ? '50rem' : '20rem'}`,
          height: `${isLargerThan720 ? '30rem' : '20rem'}`,
          borderRadius: '50%',
          opacity: `${isLargerThan720 ? '0.5' : '0.9'}`,
          filter: 'blur(90px)',
          zIndex: '-1',
        }}
      >
        <Box
          // blue blurr
          _after={{
            content: '""',
            position: 'absolute',
            background: '#89D0F0',
            top: `${isLargerThan720 ? '-10rem' : 'calc(-12rem)'}`,
            left: `${isLargerThan720 ? '50%' : '20rem'}`,
            width: '30rem',
            height: '30rem',
            opacity: '0.3',
            borderRadius: '50%',
            filter: 'blur(100px)',
            zIndex: '-1',
          }}
        ></Box>
        <Box
          _after={{
            content: '""',
            position: 'absolute',
            background: '#7EF9FF',
            top: '40rem',
            left: '10rem',
            width: `${isLargerThan720 ? '50rem' : '30rem'}`,
            height: `${isLargerThan720 ? '50rem' : '20rem'}`,
            opacity: `${isLargerThan720 ? '0.4' : '0.95'}`,
            borderRadius: '50%',
            filter: 'blur(100px)',
            zIndex: '-1',
          }}
        />
        <Box
          bg="white"
          position={'absolute'}
          top={['22%', '32%', '15%']}
          left={['-30%', '15%', '-20%']}
          opacity="0.35"
          w={['105rem', '105rem', '130rem']}
          h={['16rem', '16rem', '22rem']}
          transform={['rotate(55deg)', 'rotate(55deg)', 'rotate(45deg)']}
        />
        <Box
          position="absolute"
          top={['2%', '10%', '45%']}
          left={['-205%', '-95%', '40%']}
          bg="white"
          opacity="0.35"
          w={['105rem', '105rem', '130rem']}
          h={['16rem', '16rem', '22rem']}
          transform={['rotate(55deg)', 'rotate(55deg)', 'rotate(45deg)']}
        ></Box>
        <Box
          _after={{
            content: '""',
            position: 'absolute',
            background: '#027FFE',
            top: `${isLargerThan720 ? '65rem' : '65rem'}`,
            right: '0',
            width: '50rem',
            height: '70rem',
            opacity: '0.25',
            borderRadius: '50%',
            filter: 'blur(200px)',
            zIndex: '-1',
          }}
        />
        <Box
          // blue blurr
          _after={{
            content: '""',
            position: 'absolute',
            background: '#F5CAFC',
            top: `${
              isLargerThan720 ? 'calc(215vh - 10rem)' : 'calc(295vh - 10rem)'
            }`,
            left: `${isLargerThan720 ? '0' : '-2rem'}`,
            width: '50rem',
            height: '50rem',
            opacity: '0.4',
            borderRadius: '50%',
            filter: 'blur(160px)',
            zIndex: '-1',
          }}
        ></Box>
        <Box
          _after={{
            content: '""',
            position: 'absolute',
            background: '#7EF9FF', //
            width: `${isLargerThan720 ? '60rem' : '80rem'}`,
            height: `${isLargerThan720 ? '60rem' : '80rem'}`,
            top: `${isLargerThan720 ? 'calc(285vh - 10rem)' : 'calc(380vh)'}`,
            left: `${isLargerThan720 ? '10%' : '20rem'}`,
            opacity: '0.35',
            borderRadius: '50%',
            filter: 'blur(100px)',
            zIndex: '-1',
          }}
        />
        <Box
          bg="white"
          position={'absolute'}
          top={['calc(45% + 300vh)', 'calc(45% + 200vh)', 'calc(15% + 200vh)']}
          left={['-180% ', '-140vw', '-25%']}
          opacity="0.35"
          w={['155rem', '155rem', '130rem']}
          h={['16rem', '16rem', '22rem']}
          transform={['rotate(55deg)', 'rotate(55deg)', 'rotate(45deg)']}
          // blur circle
        />
        <Box
          position="absolute"
          top={['calc(10% + 200vh)', 'calc(25% + 200vh)', 'calc(45% + 200vh)']}
          left={['-140%', '-140vw', '35%']}
          bg="white"
          opacity="0.35"
          w={['105rem', '175rem', '130rem']}
          h={['16rem', '16rem', '22rem']}
          transform={['rotate(55deg)', 'rotate(55deg)', 'rotate(45deg)']}
        ></Box>
        <Box
          _after={{
            content: '""',
            position: 'absolute',
            background: '#027FFE',
            bottom: `${isLargerThan720 ? '5%' : '20rem'}`,
            left: `${isLargerThan720 ? '58rem' : '-20rem'}`,
            width: '80rem',
            height: '80rem',
            opacity: '0.25',
            borderRadius: '50%',
            filter: 'blur(200px)',
            zIndex: '-1',
          }}
        />
      </Container>
    </Container>
  );
};

export default Background;
