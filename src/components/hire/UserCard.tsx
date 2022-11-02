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
import { GrAddCircle } from 'react-icons/gr';
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
        border="1px solid #84BBF3"
        borderRadius="8px 8px 0 0"
        spacing={5}
        p={'1.5rem 2rem'}
        alignItems="left"
      >
        <HStack justifyContent={'space-between'}>
          <VStack alignItems="left" spacing={0}>
            <Heading as="h2" fontSize={'1.8rem'} fontWeight={500}>
              Kia Antonoc
            </Heading>
            <Box fontSize={'14px'} fontWeight={500}>
              Java Developer
            </Box>
          </VStack>
          <Image
            src="https://xsgames.co/randomusers/avatar.php?g=female"
            w="60px"
            h="60px"
            borderRadius={'50%'}
          />
        </HStack>
        <VStack alignItems="left" color={'gray.800'} fontWeight={500}>
          <HStack color="blue" animation={animation1}>
            <Icon as={MdVerified} w={5} h={5} />
            <Text as="span" fontWeight={600}>
              Verified
            </Text>
          </HStack>
          <HStack>
            <Icon as={GrAddCircle} w={5} h={5} />
            <Text>Computer Science</Text>
          </HStack>
          <HStack>
            <Icon as={GrAddCircle} w={5} h={5} />
            <Text>5 years of experience</Text>
          </HStack>
          <HStack>
            <Icon as={GrAddCircle} w={5} h={5} />
            <Text>$ 70 000-100 000 annual salary </Text>
          </HStack>
        </VStack>
      </VStack>
      <HStack
        color="#444"
        w="full"
        justifyContent={'space-between'}
        p={'1rem'}
        bg="white"
        borderX={'1px solid rgba(0,0,0,0.2)'}
        borderBottom={'1px solid rgba(0,0,0,0.2)'}
        borderRadius={'0 0 8px 8px'}
      >
        <Button bg="transparent" border="1px solid #444" color="#444">
          View More
        </Button>
        <HStack fontSize={'1.2rem'} gap={1}>
          <Icon as={BsGithub} />
          <Icon as={BsTwitter} />
          <Icon as={BsDiscord} />
          <Icon as={BiLink} />
        </HStack>
      </HStack>
    </VStack>
  );
};

export default UserCard;
