import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  keyframes,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import HireNavBar from 'src/components/navigation/navbar/HireNav';
import { useState } from 'react';
import UserCard from 'src/components/hire/UserCard';
import Pagination from 'src/components/Pagination/Pagination';
const animationKeyframes = keyframes`
  from {
    background-position: 0 0;
  to {
    background-position: 100% 100%;
  }
`;
const animation1 = `${animationKeyframes} 2s infinite alternate-reverse`;
const animation2 = `${animationKeyframes} 3s infinite alternate-reverse`;

const index = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <Container
      maxW="full"
      zIndex={2}
      p={{ base: '1rem 1rem', sm: '1rem 2rem', md: '1rem 3rem' }}
    >
      <Flex
        w="full"
        bg="rgba(255,255,255,0.4)"
        border="2px solid #A0D6E3"
        borderRadius="8px"
        my="2rem"
        p="2rem"
        flexWrap="wrap"
        justifyContent={'space-evenly'}
      >
        <HStack width={'full'} justifyContent="flex-end">
          <Pagination
            onPageChange={(page: number) => {
              setCurrentPage(page);
            }}
            siblingCount={4}
            currentPage={currentPage}
            totalCount={6}
            pageSize={3}
          />
        </HStack>
        {/*  <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        // coming soon
        <UserCard /> */}
        <Heading>Coming Soon...</Heading>
      </Flex>
    </Container>
  );
};

export default index;
