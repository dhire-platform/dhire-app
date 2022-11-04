import React from 'react';
import {
  Avatar,
  Box,
  Center,
  Container,
  HStack,
  Text,
  VStack,
  Tag,
  Wrap,
  Icon,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import Image from 'next/image';
import { RiMapPin2Line } from 'react-icons/ri';

const UserCard = ({ user }) => {
  return (
    <Container
      _hover={{
        transform: 'scale(1.015)',
        transition: 'all 0.2s ease-out',
      }}
      transition="all 0.2s ease-in"
      // ref={elementRef as RefObject<HTMLDivElement>}
      maxW={['', '25rem', '16.8rem', '16.7rem']}
      w="full"
      bg="white"
      p={'1.4rem'}
      rounded="lg"
      boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
    >
      <Stack direction={'column'} gap="0.8rem">
        <Stack
          alignItems={'top'}
          justifyContent="top"
          flexDirection={'row'}
          gap="0.5rem"
        >
          <Center
            m="0.5rem"
            w={{ base: '3rem', md: 'full' }}
            h={{ base: '3rem', md: '3rem' }}
            maxW="3rem"
            position="relative"
            rounded={'full'}
          >
            <Image
              src={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Profile_image_amarjyt_chahal.jpg/640px-Profile_image_amarjyt_chahal.jpg'
              }
              alt="Job Logo"
              layout="fill"
              objectFit="cover"
              style={{
                borderRadius: '50%',
              }}
            />
          </Center>
          <Stack
            mt="0.3rem !important"
            alignItems={'flex-start'}
            justify="start"
            mr="auto"
            gap="0"
            spacing={'0'}
            direction={'column'}
          >
            <Heading noOfLines={1} lineHeight="140%" fontSize={'20px'}>
              Raj Gokal
            </Heading>
            <Stack
              alignItems={'center'}
              justifyContent="center"
              w="100%"
              direction="row"
              color="gray.400"
              align={'center'}
            >
              <Icon as={RiMapPin2Line} w={4} h={4} color="gray.400" />
              <Text fontSize={'14px'}>Austin, United States</Text>
            </Stack>
          </Stack>
        </Stack>
        <Box>
          <Heading
            pb="0.6rem"
            noOfLines={1}
            lineHeight="140%"
            fontSize={'18px'}
          >
            Web Developer
          </Heading>
          <Text
            noOfLines={3}
            textAlign={'start'}
            fontSize="14px"
            color="gray.500"
            fontWeight={'500'}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit
            amet, consectetur adipiscing elit
          </Text>
        </Box>
        <Box display={'flex'} flexWrap="wrap" gap="0.5rem">
          <Tag size={'sm'}>UI/UX</Tag>
          <Tag size={'sm'}>Frontend Developer</Tag>
        </Box>
      </Stack>
    </Container>
  );
};

export default UserCard;
