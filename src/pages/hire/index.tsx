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
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import HireNavBar from 'src/components/navigation/navbar/HireNav';
import { useState, useEffect } from 'react';
import UserCard from 'src/components/hire/UserCard';
import Pagination from 'src/components/Pagination/Pagination';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import axios from 'axios';
import { IUsers } from '@/interfaces/store/data/user.interface';
import { NewUserCard } from 'src/components/hire/NewUserCard';
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
  const { users, updateUsers } = useProfileStore();
  const getAllUsers = async () => {
    const { data } = await axios.get('/api/user');
    updateUsers(data);
  };
  useEffect(() => {
    if (!users.length) getAllUsers();
  }, [users]);
  return (
    <Container maxW="full" zIndex={2} px={0}>
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
        Hire the best{' '}
        <Box
          as="span"
          bgGradient="linear( to-r, #6AADF1, #81F2F8, #7D8FFF, #6AADF1)"
          bgClip="text"
          backgroundPosition={'-100%'}
          backgroundSize={'300%'}
          animation={animation1}
        >
          Talent
        </Box>
      </Heading>
      <Box
        w="100%"
        bg="white"
        p={{ base: '1rem 1rem', sm: '1rem 2rem', md: '1rem 3rem' }}
      >
        <Flex
          w="full"
          bg="rgba(255,255,255,0.4)"
          border="2px solid #A0D6E3"
          borderRadius="8px"
          my="2rem"
          p="2rem"
          gap={'30px'}
          flexWrap="wrap"
          justifyContent={'space-evenly'}
        >
          {users.length ? (
            <>
              {/* <HStack width={'full'} justifyContent="flex-end">
          <Pagination
            onPageChange={(page: number) => {
              setCurrentPage(page);
            }}
            siblingCount={4}
            currentPage={currentPage}
            totalCount={6}
            pageSize={3}
          />
        </HStack> */}
              {users.map((user: IUsers, index: any) => {
                return <NewUserCard key={index} user={user} />;
              })}
            </>
          ) : (
            <Spinner
              borderColor="#A0D6E3"
              w={['40px', '50px', '80px']}
              h={['40px', '50px', '80px']}
            />
          )}
        </Flex>
      </Box>
    </Container>
  );
};

export default index;
