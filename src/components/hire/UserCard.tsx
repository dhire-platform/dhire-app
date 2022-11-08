import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  keyframes,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { MdVerified } from 'react-icons/md';
import { TbAsterisk } from 'react-icons/tb';
import { BiLink } from 'react-icons/bi';
import { BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs';
const animationKeyframes = keyframes`
      from {
        background-position: 0 0;
      to {
        background-position: 100% 100%;
      }
    `;
const animation1 = `${animationKeyframes} 2s infinite alternate-reverse`;
const animation2 = `${animationKeyframes} 3s infinite alternate-reverse`;

const UserCard = () => {
  return (
    <VStack minW="300px" spacing={0} my={3}>
      <VStack
        bg="white"
        borderRadius="8px 8px 0 0"
        spacing={5}
        p={'1.5rem 2rem'}
        alignItems="left"
      >
        <HStack justifyContent="flex-start">
          <Image
            src="https://xsgames.co/randomusers/avatar.php?g=female"
            w="60px"
            h="60px"
            borderRadius={'50%'}
          />
          <VStack alignItems="left" spacing={0}>
            <Heading as="h2" fontSize={'1.3rem'} fontWeight={500}>
              Kia Antonoc
            </Heading>
            <HStack fontSize={'14px'} fontWeight={500} color="gray.500">
              <Text as="span">Java Developer</Text>
              <Box w={'5px'} h={'5px'} rounded="full" bg="gray.600"></Box>
              <Text as="span">5 years</Text>
            </HStack>
          </VStack>
        </HStack>
        <VStack
          alignItems="left"
          color={'gray.500'}
          fontWeight={500}
          fontSize={['14px']}
        >
          <HStack color="blue" animation={animation1}>
            <Icon as={MdVerified} w={4} h={4} />
            <Text as="span" fontWeight={600}>
              Verified
            </Text>
          </HStack>
          <HStack>
            <Icon as={TbAsterisk} w={3} h={3} />
            <Text>
              Current job:{' '}
              <Text as="span" color="gray.600">
                Product Designer at Figma
              </Text>
            </Text>
          </HStack>
          <HStack>
            <Icon as={TbAsterisk} w={3} h={3} />
            <Text>3 years of experience</Text>
          </HStack>
          <HStack>
            <Icon as={TbAsterisk} w={3} h={3} />
            <Text>
              Preffered Location:{' '}
              <Text as="span" color="gray.600">
                CA, LA
              </Text>
            </Text>
          </HStack>
        </VStack>
      </VStack>
      <HStack
        color="#444"
        w="full"
        justifyContent={'space-between'}
        p={'1rem'}
        bg="white"
        border={'1px solid rgba(0,0,0,0.1)'}
        borderRadius={'0 0 8px 8px'}
      >
        <Button bg="transparent" border="1px solid #444" color="gray.600">
          View More
        </Button>
        <HStack fontSize={'1.2rem'} gap={1} color={'gray.400'}>
          <Icon as={BsGithub} _hover={{ color: 'gray.600' }} cursor="pointer" />
          <Icon
            as={BsTwitter}
            _hover={{ color: 'gray.600' }}
            cursor="pointer"
          />
          <Icon
            as={BsDiscord}
            _hover={{ color: 'gray.600' }}
            cursor="pointer"
          />
          <Icon as={BiLink} _hover={{ color: 'gray.600' }} cursor="pointer" />
        </HStack>
      </HStack>
    </VStack>
  );
};

export default UserCard;
