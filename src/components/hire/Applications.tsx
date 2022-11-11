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
  TabPanel,
  TabPanels,
  Tabs,
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

export const Applications = ({ openUser }: any) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <Flex
      w="full"
      mx="auto"
      minH={'full'}
      gap="2rem"
      flexWrap={'wrap'}
      alignItems="center"
      alignContent={'center'}
      justifyContent={'top'}
      flexDirection={{ base: 'row', md: 'column' }}
    >
      <Container
        maxW="full"
        p={{ base: '1rem 1rem', sm: '1rem 2rem', md: '1rem 3rem' }}
      >
        <VStack w={'full'} alignItems="flex-start" my={'2rem'}>
          <Heading as="h1" fontSize={['2.5rem']} fontWeight={500}>
            Applications
          </Heading>
          <Heading
            as="h2"
            fontSize={['1rem']}
            fontWeight={500}
            color="gray.500"
          >
            Find the perfect candidate that fits your job
          </Heading>
        </VStack>
        <Tabs>
          <HireNavBar />
          <TabPanels>
            <TabPanel p={0}>
              <HStack width={'full'} justifyContent="flex-end" mt={0}>
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
              <Flex
                w="full"
                borderRadius="8px"
                my="0"
                flexWrap="wrap"
                gap={'10px 40px '}
              >
                <UserCard openUser={openUser} />
                <UserCard openUser={openUser} />
                <UserCard openUser={openUser} />
                <UserCard openUser={openUser} />
                <UserCard openUser={openUser} />
              </Flex>
            </TabPanel>
            <TabPanel>
              <UserCard openUser={openUser} />
            </TabPanel>
            <TabPanel>
              <UserCard openUser={openUser} />
            </TabPanel>
            <TabPanel>
              <UserCard openUser={openUser} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Flex>
  );
};
