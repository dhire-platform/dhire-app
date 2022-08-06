import {
  Box,
  chakra,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  keyframes,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiMapPin2Line } from 'react-icons/ri';
import useSearch from 'src/hooks/useSearch';
import { IJob } from 'src/definitions/IJob';

const animationKeyframes = keyframes`
    from {
      background-position: 0 0;
    to {
      background-position: 100% 100%;
    }
  `;

type Props = {
  children?: JSX.Element | JSX.Element[];
  data: IJob[];
  setData: any;
};
interface IPayload {
  searchWord?: string;
  locationName?: string;
}

const animation1 = `${animationKeyframes} 2s infinite alternate-reverse`;

const Layout: React.FC<Props> = ({ children, data, setData }) => {
  console.log(data.length);
  const HandleSetData = ({ searchWord, locationName }: IPayload) => {
    setData({ searchWord, locationName });
  };

  return (
    <Container overflow='hidden' h='fit-content' maxW='full' p='0'>
      <VStack>
        <Heading
          py='4rem'
          mx={'auto'}
          textAlign='center'
          maxW='60rem'
          fontWeight={'800'}
          letterSpacing='-0.03em'
          lineHeight={['54px', '72px', '80px']}
          fontSize={['48px', '60px', '74px']}
        >
          Find Your Dream{' '}
          <Box
            as='span'
            bgGradient='linear( to-r, #6AADF1, #81F2F8, #7D8FFF, #6AADF1)'
            bgClip='text'
            backgroundPosition={'-100%'}
            backgroundSize={'300%'}
            animation={animation1}
          >
            Job
          </Box>
        </Heading>
        <Box
          bg='white'
          rounded='md'
          p='0.5rem 2rem'
          transform={'translateY(4.5rem)'}
          zIndex={'2'}
        >
          <HStack fontSize={'md'} w='42rem'>
            <HStack w='60%'>
              <Icon as={FiSearch} w={7} h={7} color='gray.300' />
              <chakra.input
                onChange={(event: { target: { value: any } }) => {
                  HandleSetData({ searchWord: event.target.value });
                }}
                placeholder='Search Job...'
                w='100%'
                _active={{ outline: '0' }}
                _focus={{ outline: '0' }}
              />
            </HStack>
            <HStack fontSize={'md'} w='30%'>
              <Box h='4rem' w='6px' color='gray.500'></Box>
              <Icon as={RiMapPin2Line} w={7} h={7} color='gray.300' />
              <chakra.select
                bg='white'
                name='location'
                placeholder='Select option'
                onChange={(event: { target: { value: any } }) => {
                  HandleSetData({ locationName: event.target.value });
                }}
              >
                <option value='London, UK'>London, UK</option>
                <option value='California, US'>California, US</option>
                <option value='New Delhi, India'>New Delhi, India</option>
                <option value='Banglore, India'>Banglore, India</option>
              </chakra.select>
            </HStack>
          </HStack>
        </Box>
        <Box
          mx='auto'
          w='40rem'
          h='1.5rem'
          bg='#81F2F8'
          transform={'translateY(3rem)'}
          rounded={'full'}
          blur='2xl'
          opacity='0.5'
          filter='blur(90px)'
        />

        <Container py='6rem' maxW='full' bg='#FCFCFC' minH='100vh'>
          {children}
        </Container>
      </VStack>
    </Container>
  );
};

export default Layout;
