import { Box, Container, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

const Background = () => {
  const [isLargerThan720] = useMediaQuery('(min-width: 720px)');

  return (
    <Container
      maxW={'full'}
      display='flex'
      alignItems={'center'}
      justifyContent='center'
    >
      <Container
        top='0'
        maxW='130rem'
        position={'absolute'}
        zIndex='-1'
        overflow='hidden'
        h='100%'
        pt='20rem'
        _after={{
          // pink blurr
          content: '""',
          position: 'absolute',
          background: '#F5CAFC',
          top: '6rem',
          left: '0rem',
          width: `${isLargerThan720 ? '50rem' : '20rem'}`,
          height: `${isLargerThan720 ? '30rem' : '10rem'}`,
          borderRadius: '50%',
          opacity: '0.65',
          filter: 'blur(100px)',
          zIndex: '-1',
        }}
      >
        <Box
          // blue blurr
          _after={{
            content: '""',
            position: 'absolute',
            background: '#89D0F0',
            top: `${isLargerThan720 ? '-10rem' : '-12rem'}`,
            left: `${isLargerThan720 ? '50%' : '20rem'}`,
            width: '30rem',
            height: '30rem',
            opacity: '0.4',
            borderRadius: '50%',
            filter: 'blur(100px)',
            zIndex: '-1',
          }}
        ></Box>
        <Box
          _after={{
            content: '""',
            position: 'absolute',
            background: '#7EF9FF', //
            top: '40rem',
            left: '10rem',
            width: `${isLargerThan720 ? '40rem' : '30rem'}`,
            height: `${isLargerThan720 ? '30rem' : '20rem'}`,
            opacity: '0.85',
            borderRadius: '50%',
            filter: 'blur(130px)',
            zIndex: '-1',
            border: '2px solid red',
          }}
        />
        <Box
          bg='white'
          position={'absolute'}
          top={['38%', '38%', '15%']}
          left={['20%', '20%', '-20%']}
          opacity='0.35'
          w={['105rem', '105rem', '130rem']}
          h={['16rem', '16rem', '22rem']}
          transform={['rotate(55deg)', 'rotate(55deg)', 'rotate(45deg)']}
          // blur circle
        />
        <Box
          position='absolute'
          top={['5%', '5%', '45%']}
          left={['-165%', '-165%', '40%']}
          bg='white'
          opacity='0.35'
          w={['105rem', '105rem', '130rem']}
          h={['16rem', '16rem', '22rem']}
          transform={['rotate(55deg)', 'rotate(55deg)', 'rotate(45deg)']}
        ></Box>
        <Box
          _after={{
            content: '""',
            position: 'absolute',
            background: '#027FFE',
            top: '20%',
            right: '0',
            width: '50rem',
            height: '70rem',
            opacity: '0.35',
            borderRadius: '50%',
            filter: 'blur(200px)',
            zIndex: '-1',
            border: '2px solid red',
          }}
        />
        <Box
          // blue blurr
          _after={{
            content: '""',
            position: 'absolute',
            background: '#F5CAFC',
            top: `${isLargerThan720 ? 'calc(205vh - 10rem)' : '-12rem'}`,
            left: `${isLargerThan720 ? '0' : '20rem'}`,
            width: '30rem',
            height: '30rem',
            opacity: '0.4',
            borderRadius: '50%',
            filter: 'blur(100px)',
            zIndex: '-1',
          }}
        ></Box>
        <Box
          _after={{
            content: '""',
            position: 'absolute',
            background: '#7EF9FF', //
            top: 'calc(205vh + 40rem)',
            left: '10rem',
            width: `${isLargerThan720 ? '40rem' : '30rem'}`,
            height: `${isLargerThan720 ? '30rem' : '20rem'}`,
            opacity: '0.35',
            borderRadius: '50%',
            filter: 'blur(130px)',
            zIndex: '-1',
            border: '2px solid red',
          }}
        />
        <Box
          bg='white'
          position={'absolute'}
          top={['38%', '38%', 'calc(15% + 200vh)']}
          left={['20%', '20%', '-25%']}
          opacity='0.35'
          w={['105rem', '105rem', '130rem']}
          h={['16rem', '16rem', '22rem']}
          transform={['rotate(55deg)', 'rotate(55deg)', 'rotate(45deg)']}
          // blur circle
        />
        <Box
          position='absolute'
          top={['5%', '5%', 'calc(45% + 200vh)']}
          left={['-165%', '-165%', '35%']}
          bg='white'
          opacity='0.35'
          w={['105rem', '105rem', '130rem']}
          h={['16rem', '16rem', '22rem']}
          transform={['rotate(55deg)', 'rotate(55deg)', 'rotate(45deg)']}
        ></Box>
        <Box
          _after={{
            content: '""',
            position: 'absolute',
            background: '#027FFE',
            bottom: '5%',
            right: '0',
            width: '50rem',
            height: '70rem',
            opacity: '0.25',
            borderRadius: '50%',
            filter: 'blur(200px)',
            zIndex: '-1',
            border: '2px solid red',
          }}
        />
      </Container>
    </Container>
  );
};

export default Background;
