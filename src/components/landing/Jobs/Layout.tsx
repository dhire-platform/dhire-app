import {
  Box,
  chakra,
  Container,
  Heading,
  HStack,
  Icon,
  keyframes,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiMapPin2Line } from 'react-icons/ri';
import { IFilter } from '@/interfaces/filter.interface';
import { IJob, IJobs } from '@/interfaces/store/data/job.interface';

const animationKeyframes = keyframes`
    from {
      background-position: 0 0;
    to {
      background-position: 100% 100%;
    }
  `;

type Props = {
  children?: JSX.Element | JSX.Element[];
  data: IJobs[];
  setData: (filter: IFilter) => void;
};

const animation1 = `${animationKeyframes} 2s infinite alternate-reverse`;

const Layout: React.FC<Props> = ({ children, data, setData }) => {
  return (
    <Container overflow="hidden" h="fit-content" maxW="full" p="0" zIndex={2}>
      <VStack>
        <Heading
          py="4rem"
          mx={'auto'}
          textAlign="center"
          maxW="60rem"
          fontWeight={'800'}
          letterSpacing="-0.03em"
          lineHeight={['54px', '72px', '80px']}
          fontSize={['48px', '60px', '74px']}
        >
          Find Your Dream{' '}
          <Box
            as="span"
            bgGradient="linear( to-r, #6AADF1, #81F2F8, #7D8FFF, #6AADF1)"
            bgClip="text"
            backgroundPosition={'-100%'}
            backgroundSize={'300%'}
            animation={animation1}
          >
            Job
          </Box>
        </Heading>
        <Box
          bg="white"
          rounded="md"
          p="0.5rem 2rem"
          transform={{ base: 'translateY(3.7rem)', md: 'translateY(4.5rem)' }}
          zIndex={'2'}
          minW={['90%', '90%', '80%', '70%']}
          maxW={'800px'}
        >
          <HStack fontSize={'md'} justifyContent="space-between">
            <HStack>
              <Icon
                as={FiSearch}
                w={{ base: 4, md: 7 }}
                h={{ base: 4, md: 7 }}
                color="gray.300"
              />
              <chakra.input
                fontSize={{ base: '12px', md: 'md' }}
                w={['70px', 'auto']}
                onChange={(event: { target: { value: any } }) => {
                  setData({
                    filter_type: 'title',
                    filter_values:
                      event.target.value === ''
                        ? []
                        : [event.target.value.toLowerCase()],
                    search: true,
                  });
                }}
                placeholder="Search Job..."
                _active={{ outline: '0' }}
                _focus={{ outline: '0' }}
              />
            </HStack>
            <HStack fontSize={{ base: '10px', sm: '12px', md: 'md' }}>
              <Box
                h={{ base: '2rem', md: '4rem' }}
                w="6px"
                color="gray.500"
              ></Box>
              <Icon
                as={RiMapPin2Line}
                w={[5, 5, 7]}
                h={[5, 5, 7]}
                color="gray.300"
              />
              <chakra.select
                w={['70px', 'auto']}
                bg="white"
                name="location"
                placeholder="Select option"
                onChange={(event: { target: { value: any } }) => {
                  setData({
                    filter_type: 'location',
                    filter_values:
                      event.target.value === '' ? [] : [event.target.value],
                  });
                }}
              >
                <option value="">ALL</option>
                <option value="London, UK">London, UK</option>
                <option value="California, US">California, US</option>
                <option value="New Delhi, India">New Delhi, India</option>
                <option value="Banglore, India">Banglore, India</option>
              </chakra.select>
            </HStack>
          </HStack>
        </Box>
        <Box
          mx="auto"
          w="40rem"
          h="1.5rem"
          bg="#81F2F8"
          transform={'translateY(3rem)'}
          rounded={'full'}
          blur="2xl"
          opacity="0.5"
          filter="blur(90px)"
        />

        <Container py="6rem" maxW="full" bg="#FCFCFC" minH="100vh">
          {children}
        </Container>
      </VStack>
    </Container>
  );
};

export default Layout;
