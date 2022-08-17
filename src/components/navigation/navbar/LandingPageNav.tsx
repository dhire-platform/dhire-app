import {
  Flex,
  Center,
  Box,
  Collapse,
  useDisclosure,
  Badge,
  ScaleFade,
} from '@chakra-ui/react';

import Link from 'next/link';
import { Slant as Hamburger } from 'hamburger-react';
import React, { useState } from 'react';

type Props = {
  children: JSX.Element;
};

const LandingPageNavbar = ({ children }: Props) => {
  const [hover, setHover] = useState(0);
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Center
      display='flex'
      flexDirection='column'
      p={{ base: '1rem 1rem', sm: '1rem 2rem', md: '1rem 3rem' }}
    >
      <Flex
        maxW={'7xl'}
        w={'100%'}
        h={20}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Center display={{ base: 'flex', lg: 'none' }}>
          <Hamburger
            toggled={isOpen}
            toggle={onToggle}
            size={30}
            duration={0.4}
            rounded
          />

          <ScaleFade initialScale={0} in={!isOpen}>
            <Badge
              px='0.4rem'
              variant={'solid'}
              rounded={'full'}
              bg='#FD6444'
              fontSize='sm'
              position='absolute'
              transform='translate(-0.75rem, -1.1rem)'
              transition={'all 0.3s ease'}
            >
              2
            </Badge>
          </ScaleFade>
        </Center>
        <Link href='/'>
          <Center w='3.3rem' h='3.3rem'>
            <svg
              viewBox='0 0 68 66'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M36.531 6.32875C38.1672 6.58947 39.705 5.47441 39.9657 3.83819C40.2264 2.20198 39.1114 0.664216 37.4752 0.403501C29.2816 -0.902067 20.8995 0.987422 14.0585 5.68206C7.21749 10.3767 2.43963 17.5183 0.710819 25.6331C-1.01799 33.7479 0.43417 42.2167 4.76765 49.292C7.20963 53.279 10.4355 56.9025 14.3574 59.5757C15.7264 60.5089 17.5928 60.1555 18.526 58.7865C19.4591 57.4174 19.1058 55.5511 17.7367 54.6179C14.6234 52.4958 11.9556 49.5402 9.88422 46.1582C6.35374 40.394 5.17066 33.4944 6.57912 26.8833C7.98759 20.2721 11.8801 14.4539 17.4535 10.6292C23.0268 6.80447 29.8557 5.26511 36.531 6.32875ZM30.4736 58.7709C28.8374 58.5102 27.2996 59.6253 27.0389 61.2615C26.7782 62.8977 27.8933 64.4355 29.5295 64.6962C34.9218 65.5554 40.3957 65.0308 45.458 63.2336C47.0194 62.6793 47.8358 60.9642 47.2815 59.4028C46.7272 57.8414 45.0121 57.025 43.4507 57.5793C39.326 59.0436 34.8666 59.4709 30.4736 58.7709ZM54.2592 6.70571C52.9568 5.68155 51.0708 5.90711 50.0466 7.20951C49.0225 8.51192 49.248 10.398 50.5504 11.4221C53.1195 13.4424 55.3413 16.0368 57.1204 18.9415C60.6509 24.7057 61.834 31.6053 60.4255 38.2164C59.6819 41.7069 58.2459 44.9762 56.2355 47.8481C55.2854 49.2054 55.6155 51.076 56.9728 52.0261C58.3301 52.9763 60.2007 52.6462 61.1509 51.2889C63.6183 47.7641 65.3811 43.751 66.2938 39.4666C68.0226 31.3518 66.5705 22.883 62.237 15.8077C60.1362 12.3777 57.4583 9.22131 54.2592 6.70571ZM43.0764 17.8529C39.6523 15.6844 35.5592 14.8277 31.5528 15.4409C27.5464 16.0542 23.897 18.0961 21.2783 21.1896C18.6596 24.2832 17.2484 28.2196 17.3051 32.2723C17.3619 36.325 18.8827 40.2204 21.5869 43.2395C24.2912 46.2585 27.9962 48.1974 32.0183 48.6983C36.0403 49.1992 40.1078 48.2283 43.4699 45.9648C46.832 43.7012 49.2618 40.2978 50.3109 36.3828C50.7397 34.7824 52.3847 33.8327 53.9851 34.2615C55.5855 34.6903 56.5352 36.3354 56.1064 37.9358C55.0769 41.7779 53.0676 45.257 50.3087 48.0508L60.3209 61.0376C61.3438 62.3643 61.0975 64.2691 59.7707 65.2919C58.444 66.3148 56.5392 66.0685 55.5164 64.7417L45.5093 51.7616C41.2197 54.2445 36.2229 55.2683 31.2768 54.6524C25.8174 53.9724 20.7883 51.3406 17.1177 47.2427C13.447 43.1447 11.3827 37.8573 11.3057 32.3563C11.2287 26.8553 13.1443 21.5121 16.6988 17.3131C20.2533 13.114 25.2067 10.3424 30.6449 9.51C36.0831 8.67758 41.6389 9.84045 46.2867 12.784C49.2831 14.6816 51.7717 17.2368 53.583 20.2254C54.4418 21.6423 53.9893 23.4872 52.5724 24.3459C51.1554 25.2047 49.3106 24.7522 48.4518 23.3353C47.1172 21.1333 45.2838 19.2509 43.0764 17.8529Z'
                fill='url(#paint0_linear_225_17)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_225_17'
                  x1='7.72788'
                  y1='53.0498'
                  x2='88.893'
                  y2='-6.45311'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#6AADF1' />
                  <stop offset='1' stop-color='#6B79D2' />
                </linearGradient>
              </defs>
            </svg>
          </Center>
          {/* <Box
            display={{ base: 'none', md: 'flex' }}
            as='button'
            fontSize={['xl', '3xl']}
            fontWeight={'800'}
            transition={'all 0.3s ease'}
            _hover={{
              color: 'grey',
            }}
            h='fit-content'
          >
            dhire.
          </Box> */}
        </Link>
        <nav>
          <Flex direction='row' gap='2rem'>
            <Center
              ml='auto'
              display={{ base: 'none', lg: 'flex' }}
              flexDirection='row'
              fontSize='xl'
              minH='100%'
              gap={{ base: '0', md: '2vw', lg: '3vw' }}
              maxW='36rem'
              fontWeight='600'
            >
              {/* <Link href='/about'>
                <Box
                  as='button'
                  transition={'all 0.3s ease'}
                  onMouseEnter={() => setHover(1)}
                  onMouseLeave={() => setHover(0)}
                  _before={{
                    content: `''`,
                    width: '5px',
                    height: '5px',
                    position: 'absolute',
                    borderRadius: '50%',
                    transform: `${
                      hover === 1
                        ? 'translate(1.4rem, 2.5rem)'
                        : 'translate(1.4rem, 5rem)'
                    }`,
                    transition: 'all 0.1s ease',
                    opacity: `${hover === 1 ? '1' : '0'}`,
                    bg: 'black',
                  }}
                >
                  About
                </Box>
              </Link> */}
              <Link href='/jobs'>
                <Center>
                  <Box
                    as='button'
                    transition={'all 0.3s ease'}
                    onMouseEnter={() => setHover(2)}
                    onMouseLeave={() => setHover(0)}
                    _before={{
                      content: `''`,
                      width: '5px',
                      height: '5px',
                      position: 'absolute',
                      borderRadius: '50%',
                      transform: `${
                        hover === 2
                          ? 'translate(2.5rem, 2.5rem)'
                          : 'translate(2.5rem, 5rem)'
                      }`,
                      transition: 'all 0.1s ease',
                      opacity: `${hover === 2 ? '1' : '0'}`,
                      bg: 'black',
                    }}
                  >
                    Job Hunt
                  </Box>
                  <ScaleFade initialScale={0} in={!isOpen}>
                    <Badge
                      px='0.35rem'
                      variant={'solid'}
                      rounded={'full'}
                      bg='#FD6444'
                      fontSize='xs'
                      position='absolute'
                      transform='translate(-0.1rem, -1.1rem)'
                      transition={'all 0.3s ease'}
                    >
                      2
                    </Badge>
                  </ScaleFade>
                </Center>
              </Link>
              <Link href='/hire'>
                <Center>
                  <Box
                    as='button'
                    transition={'all 0.3s ease'}
                    onMouseEnter={() => setHover(3)}
                    onMouseLeave={() => setHover(0)}
                    _before={{
                      content: `''`,
                      width: '5px',
                      height: '5px',
                      position: 'absolute',
                      borderRadius: '50%',
                      transform: `${
                        hover === 3
                          ? 'translate(2.8rem, 2.5rem)'
                          : 'translate(2.8rem, 5rem)'
                      }`,
                      transition: 'all 0.1s ease',
                      opacity: `${hover === 3 ? '1' : '0'}`,
                      bg: 'black',
                    }}
                  >
                    Hire Talent
                  </Box>
                  {/* <Badge
                    position='absolute'
                    px='0.4rem'
                    transform='translate(3rem, -1rem)'
                    variant={'solid'}
                    rounded={'full'}
                  >
                    2
                  </Badge> */}
                </Center>
              </Link>
            </Center>
            {/* <Center display={{ base: 'none', lg: 'flex' }}>
              <Switch />
            </Center> */}
            {/* <Button
              onClick={() => {
                //onModalOpen();
              }}
              size={['sm', 'md']}
              display='flex'
              gap={'1rem'}
            >
              Connect Wallet
              <Phantom />
            </Button> */}
            {children}
          </Flex>
        </nav>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          display={{ base: 'flex', lg: 'none' }}
          flexDirection='column'
          alignItems='start'
          fontSize='22px'
          p='2rem 1rem'
          gap='1.4rem'
        >
          {/* <Link href='/about'>
            <Box
              display='flex'
              alignItems={'start'}
              w='100%'
              onClick={() => onClose()}
              as='button'
              transition={'all 0.3s ease'}
              _hover={{
                color: 'grey',
              }}
              fontWeight='500'
            >
              About
            </Box>
          </Link> */}
          <Link href='/jobs'>
            <Flex
              direction={'row'}
              alignItems='center'
              justify={'space-between'}
              w='100%'
            >
              <Box
                display='flex'
                alignItems={'start'}
                w='100%'
                onClick={() => onClose()}
                as='button'
                transition={'all 0.3s ease'}
                _hover={{
                  color: 'grey',
                }}
                fontWeight='500'
              >
                Job Hunt
              </Box>
              <Badge
                px='0.4rem'
                variant={'solid'}
                rounded={'full'}
                bg='#FD6444'
                fontSize='md'
              >
                2
              </Badge>
            </Flex>
          </Link>
          <Link href='/hire'>
            <Box
              display='flex'
              alignItems={'start'}
              w='100%'
              onClick={() => onClose()}
              as='button'
              transition={'all 0.3s ease'}
              _hover={{
                color: 'grey',
              }}
              fontWeight='500'
            >
              Hire Talent
            </Box>
          </Link>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            w='84vw'
            as='button'
            transition={'all 0.3s ease'}
          >
            {/* {useColorModeValue('Dark Mode', 'Light Mode')}
            <Switch /> */}
          </Box>
          <Box w='100%' h='0.09rem' bg='gray.500' />
        </Flex>
      </Collapse>
    </Center>
  );
};
export default LandingPageNavbar;
