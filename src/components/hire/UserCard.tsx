import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  keyframes,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { TbAsterisk } from 'react-icons/tb';
import { BiLink } from 'react-icons/bi';
import { BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { GrBookmark } from 'react-icons/gr';
import { ImBookmark } from 'react-icons/im';
import { Applicant } from '@/interfaces/store/data/job.interface';
const animationKeyframes = keyframes`
      from {
        background-position: 0 0;
      to {
        background-position: 100% 100%;
      }
    `;
const animation1 = `${animationKeyframes} 2s infinite alternate-reverse`;
const animation2 = `${animationKeyframes} 3s infinite alternate-reverse`;
type userCardProps = { openUser: any; key: number; applicant: Applicant };
const UserCard = ({ openUser, key, applicant }: userCardProps) => {
  const [bookmark, setBookmark] = useState(false);
  const { user } = applicant;
  const currentJob = user.experience?.filter((job) => job.current);
  return (
    <VStack
      key={key}
      minW="200px"
      spacing={0}
      my={3}
      w="fit-content"
      mx={{ base: 'auto', lg: '0' }}
    >
      <VStack
        w="100%"
        flex={1}
        justifyContent={'space-between'}
        bg="white"
        borderRadius="8px 8px 0 0"
        spacing={5}
        p={{ base: '1.2rem', lg: '1.5rem 2rem' }}
        alignItems="left"
      >
        <HStack justifyContent="flex-start" pos="relative">
          <Avatar
            size="lg"
            name={user.user?.name}
            colorScheme="blue"
            src={user.image}
          />
          <VStack alignItems="left" spacing={0}>
            <Heading as="h2" fontSize={['1.2rem', '1.3rem']} fontWeight={500}>
              {user.user?.name}
            </Heading>
            <HStack
              fontSize={['12px', '14px']}
              fontWeight={500}
              color="gray.500"
            >
              <Text as="span">
                {user.experience.length
                  ? currentJob[0]?.designation ||
                    user.experience[0]?.designation
                  : 'No experience'}
              </Text>

              <Box w={'5px'} h={'5px'} rounded="full" bg="gray.600"></Box>
              <Text as="span">5 years</Text>
            </HStack>
          </VStack>

          <Icon
            as={bookmark ? ImBookmark : GrBookmark}
            pos="absolute"
            right={'-10px'}
            top={0}
            fontSize={{ base: '1rem', lg: '1.3rem' }}
            cursor="pointer"
            onClick={() => setBookmark(!bookmark)}
          />
        </HStack>
        <VStack
          alignItems="left"
          color={'gray.500'}
          fontWeight={500}
          fontSize={['12px', '14px']}
        >
          {/* USER VERIFIED
          <HStack color="blue" animation={animation1}>
            <Icon as={MdVerified} w={4} h={4} />
            <Text as="span" fontWeight={600}>
              { user.verified }
            </Text>
          </HStack> */}
          <HStack>
            {user.skills?.slice(0, 4).map((skill, index) => (
              <Tag key={index} fontSize={'13px'}>
                {skill.name}
              </Tag>
            ))}
          </HStack>
          <HStack>
            <Icon as={TbAsterisk} w={3} h={3} />
            <Text>
              Email:{' '}
              <Text as="span" color="gray.600">
                {user.email || 'not provided'}
              </Text>
            </Text>
          </HStack>
          <HStack>
            <Icon as={TbAsterisk} w={3} h={3} />
            <Text>About:</Text> <Text>{user.bio?.slice(0, 20)}...</Text>
          </HStack>
          <HStack>
            <Icon as={TbAsterisk} w={3} h={3} />
            <Text>
              Preffered Location:{' '}
              <Text as="span" color="gray.600">
                {user.location || 'none'}
              </Text>
            </Text>
          </HStack>
        </VStack>
      </VStack>
      <HStack
        color="#444"
        w="100%"
        justifyContent={'space-between'}
        p={['0.8rem', '1rem']}
        bg="white"
        border={'1px solid rgba(0,0,0,0.1)'}
        borderRadius={'0 0 8px 8px'}
      >
        <Button
          bg="transparent"
          border="1px solid #444"
          color="gray.600"
          size={['xs', 'sm', 'sm', 'md']}
          onClick={() => openUser(applicant.user_id)}
        >
          View More
        </Button>
        <HStack
          fontSize={['15px', '1rem', '1.2rem']}
          gap={1}
          color={'gray.400'}
        >
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
