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
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import HireNavBar from 'src/components/navigation/navbar/HireNav';
import { useState } from 'react';
import UserCard from 'src/components/hire/UserCard';
import Pagination from 'src/components/Pagination/Pagination';
import { IJobs } from '@/interfaces/store/data/job.interface';
import PostJobModal from '../modals/PostJobModal';
import { NewUserCard } from './NewUserCard';
import { IUsers } from '@/interfaces/store/data/user.interface';
const animationKeyframes = keyframes`
    from {
      background-position: 0 0;
    to {
      background-position: 100% 100%;
    }
  `;
const animation1 = `${animationKeyframes} 2s infinite alternate-reverse`;
const animation2 = `${animationKeyframes} 3s infinite alternate-reverse`;
type props = {
  openUser: any;
  applicantDetails: IJobs;
};
export const Applications = ({ openUser, applicantDetails }: props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { onClose, onOpen, isOpen } = useDisclosure();
  return (
    <>
      <PostJobModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
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
        <Container maxW="full" p={{ base: '0', sm: '1rem', lg: '1rem 3rem' }}>
          <VStack w={'full'} alignItems="flex-start" my={'2rem'} px="1rem">
            <Heading
              as="h1"
              fontSize={['1.8rem', '2rem', '2.5rem']}
              fontWeight={500}
            >
              Applications
            </Heading>
            <Heading
              as="h2"
              fontSize={['12px', '14px', '1rem']}
              fontWeight={500}
              color="gray.500"
            >
              Find the perfect candidate that fits your job
            </Heading>
          </VStack>
          <Tabs>
            <HireNavBar postJobAction={onOpen} />
            <TabPanels>
              <TabPanel>
                {applicantDetails.applicants?.length ? (
                  <>
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
                      justifyContent={{ lg: 'flex-start' }}
                      gap={{ base: '20px', lg: '10px 40px ' }}
                      alignItems={'stretch'}
                    >
                      {applicantDetails.applicants.map((data, index) => {
                        return (
                          <UserCard
                            key={index}
                            applicant={data}
                            openUser={openUser}
                          />
                        );
                      })}
                    </Flex>
                  </>
                ) : (
                  <Flex w="fit-content" mx="auto" py={'30px'}>
                    <Text
                      fontWeight={600}
                      color="blackAlpha.500"
                      fontSize={['1.8rem', '2rem', '2.5rem']}
                    >
                      😕 No applicant yet
                    </Text>
                  </Flex>
                )}
              </TabPanel>
              <TabPanel>
                <Flex w="fit-content" mx="auto" py={'30px'}>
                  <Text
                    fontWeight={600}
                    color="blackAlpha.500"
                    fontSize={['1.5rem', '1.8rem', '2.3rem']}
                  >
                    No applicant screened
                  </Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex w="fit-content" mx="auto" py={'30px'}>
                  <Text
                    fontWeight={600}
                    color="blackAlpha.500"
                    fontSize={['1.5rem', '1.8rem', '2.3rem']}
                  >
                    No interview scheduled
                  </Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex w="fit-content" mx="auto" py={'30px'}>
                  <Text
                    fontWeight={600}
                    color="blackAlpha.500"
                    fontSize={['1.5rem', '1.8rem', '2.3rem']}
                  >
                    No offer yet
                  </Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex w="fit-content" mx="auto" py={'30px'}>
                  <Text
                    fontWeight={600}
                    color="blackAlpha.500"
                    fontSize={['1.5rem', '1.8rem', '2.3rem']}
                  >
                    No applicants archieved yet
                  </Text>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Flex>
    </>
  );
};
