import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  chakra,
  keyframes,
  Spinner,
  Stack,
  Text,
  VStack,
  Heading,
  Icon,
  Tag,
  TagCloseButton,
  TagLabel,
  Input,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';
import React from 'react';
import Data from './Data.json';
import { useState, useEffect, useMemo } from 'react';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import axios from 'axios';
import { IUsers } from '@/interfaces/store/data/user.interface';
import { NewUserCard } from 'src/components/hire/NewUserCard';
import { IFilter } from '@/interfaces/filter.interface';
import Pagination from 'src/components/Pagination/Pagination';
import { useFilter } from 'src/lib/hooks/useFilter';
import { FiSearch } from 'react-icons/fi';

const animationKeyframes = keyframes`
    from {
      background-position: 0 0;
    to {
      background-position: 100% 100%;
    }
  `;

const animation1 = `${animationKeyframes} 2s infinite alternate-reverse`;

const index = () => {
  const { users, updateUsers } = useProfileStore();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [skillCount, setSkillCount] = useState<number>(8);
  const [filteredData, setFilteredData] = useState<IUsers[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [allskills, setAllSkills] = useState<string[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [searchVal, setSearchVal] = useState<string>('');

  const PageSize = 6;
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const arr = filteredData.slice(firstPageIndex, lastPageIndex);
    return arr;
  }, [currentPage, filteredData]);

  const getAllUsers = async () => {
    const { data } = await axios.get('/api/user');

    updateUsers(data);
    setFilteredData(data);
  };
  const setReqFilter = (filter: IFilter) => {
    if (listOpen) setListOpen(false);
    let existingFilters = filters;

    let req_filter = existingFilters.filter(
      (item) =>
        item.filter_type !== filter.filter_type && item.filter_values.length
    );
    req_filter.push(filter);
    setFilters(req_filter);
  };
  useEffect(() => {
    if (!users.length && !loaded) {
      setLoaded(true);
      //getAllUsers();
      let data = JSON.stringify(Data);
      setFilteredData(JSON.parse(data));
      updateUsers(JSON.parse(data));
    } else if (users.length && !loaded) {
      setLoaded(true);
      setFilteredData(users);
    }
    let avai_skills: any[] = [];
    users.map((user) => {
      let val = user.UserProfile[0]?.skills.map((skill) => skill.name) || [];
      if (val.length) avai_skills.push(...val);
    });
    console.log(avai_skills);
    setAllSkills(avai_skills);
  }, [users]);
  useEffect(() => {
    let newArray = useFilter({
      all_filters: filters,
      fullArray: users || [],
    });
    //console.log(newArray[0]);
    setFilteredData(newArray);
    setCurrentPage(1);
  }, [filters]);
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
          Hire the best{' '}
          <Box
            as="span"
            bgGradient="linear( to-r, #6AADF1, #81F2F8, #7D8FFF, #6AADF1)"
            bgClip="text"
            backgroundPosition={'-100%'}
            backgroundSize={'300%'}
            animation={animation1}
          >
            Talents
          </Box>
        </Heading>
        <VStack
          minW={['90%', '90%', '80%', '70%']}
          transform={'translateY(60%)'}
          zIndex={'2'}
        >
          <HStack
            fontSize={'md'}
            w="full"
            bg="white"
            rounded="md"
            p="0.5rem 1.8rem"
            h={{ base: '2rem', md: '4rem' }}
            spacing={0}
            gap={3}
          >
            <Icon
              as={FiSearch}
              w={{ base: 4, md: 7 }}
              h={{ base: 4, md: 7 }}
              color="gray.300"
            />
            <chakra.input
              fontSize={{ base: '12px', md: 'md' }}
              w={'100%'}
              onChange={(event: { target: { value: any } }) => {
                setReqFilter({
                  filter_type: 'bio',
                  filter_values:
                    event.target.value === ''
                      ? []
                      : [event.target.value.toLowerCase()],
                  search: true,
                });
              }}
              placeholder="Search by keyword..."
              _active={{ outline: '0' }}
              _focus={{ outline: '0' }}
            />
          </HStack>
        </VStack>

        <Container maxW="full" bg="#FCFCFC" minH="100vh" p={0}>
          <Container
            py={'3rem'}
            maxW="full"
            bg="#FCFCFC"
            minH="100vh"
            zIndex={2}
          >
            <Stack
              flexDir={{ base: 'column', lg: 'row-reverse' }}
              position="sticky"
              mx="auto"
              maxW="100%"
              direction={'row'}
              spacing={0}
              gap={{ base: '0', md: 0, lg: '1.5rem' }}
              p={{ base: '10px', md: '1rem' }}
            >
              <Stack>
                {/* <Stack
                  spacing={'1rem'}
                  
                >
                  <Stack w="full">
                    <Heading
                      fontWeight="600"
                      fontSize={{ base: 'lg', md: 'xl' }}
                    >
                      Skills
                    </Heading>
                  </Stack>
                  
                </Stack> */}
                <Stack
                  direction={'column'}
                  p="1rem"
                  w={{ base: 'full', lg: '15rem' }}
                >
                  <Heading fontWeight="600" fontSize={{ base: 'lg', md: 'xl' }}>
                    Skills
                  </Heading>
                  <VStack pos="relative" w="full">
                    <Input
                      fontSize={{ base: '12px', md: 'md' }}
                      w={'100%'}
                      onKeyPress={(e: any) => {
                        if (e.charCode === 13 && e.target.value) {
                          e.preventDefault();

                          setReqFilter({
                            filter_type: 'skills',
                            filter_values: [...skills, e.target.value.trim()],
                          });
                          setSkills([...skills, e.target.value.trim()]);
                          e.target.value = '';
                        }
                      }}
                      onChange={(e) => {
                        if (!listOpen) setListOpen(true);
                        setSearchVal(e.target.value);
                      }}
                      placeholder="Search by skills..."
                      _active={{ outline: '0' }}
                      _focus={{ outline: '0' }}
                    />
                    <Flex
                      flexWrap={'wrap'}
                      w={'full'}
                      mx="auto"
                      mt="1rem"
                      gap={3}
                    >
                      {skills.map((skill, index) => (
                        <Tag key={index}>
                          <TagLabel>{skill}</TagLabel>
                          <TagCloseButton
                            onClick={() => {
                              let newskill_arr = skills.filter(
                                (item) => item !== skill
                              );
                              setReqFilter({
                                filter_type: 'skills',
                                filter_values: [...newskill_arr],
                              });
                              setSkills(newskill_arr);
                            }}
                          />
                        </Tag>
                      ))}
                    </Flex>
                    {listOpen && (
                      <VStack
                        pos="absolute"
                        top="100%"
                        bg="white"
                        width={'full'}
                        zIndex={3}
                        boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
                      >
                        {allskills.map(
                          (skill: string, index: number) =>
                            searchVal &&
                            skill.includes(searchVal) && (
                              <Text
                                key={index}
                                onClick={() => {
                                  setReqFilter({
                                    filter_type: 'skills',
                                    filter_values: [...skills, skill],
                                  });
                                  setSkills([...skills, skill]);
                                  setListOpen(false);
                                }}
                                cursor={'pointer'}
                                _hover={{ bg: 'whiteAlpha.500' }}
                                p="10px"
                                borderBottom={'1px solid'}
                                borderBottomColor={'blackAlpha.200'}
                                w="full"
                              >
                                {skill}
                              </Text>
                            )
                        )}
                      </VStack>
                    )}
                  </VStack>
                  <CheckboxGroup
                    onChange={(checked_fields: string[]) => {
                      setReqFilter({
                        filter_type: 'skills',
                        filter_values: checked_fields,
                      });
                    }}
                  >
                    <Stack
                      direction={{ base: 'column', sm: 'row', lg: 'column' }}
                      spacing={0}
                      maxH={{ base: '30vh', sm: '100vh' }}
                      gap={[2, 4, 4, 3]}
                      p="1rem"
                      wrap={'wrap'}
                      w="full"
                    >
                      {allskills.slice(0, skillCount).map((skill, index) => (
                        <Checkbox value={skill} size={['sm', 'md']}>
                          {skill}
                        </Checkbox>
                      ))}
                      {allskills.length > skillCount ? (
                        <Text
                          color="blue.400"
                          cursor={'pointer'}
                          onClick={() => setSkillCount(skillCount + 4)}
                        >
                          + {allskills.length - skillCount} more
                        </Text>
                      ) : allskills.length ? (
                        <Text
                          color="red.400"
                          cursor={'pointer'}
                          onClick={() => setSkillCount(8)}
                        >
                          - Hide skills
                        </Text>
                      ) : (
                        ''
                      )}
                    </Stack>{' '}
                  </CheckboxGroup>
                </Stack>
              </Stack>
              <Center
                // minW="42rem"
                gap="1.3rem"
                w="full"
                p={{ base: '0px', md: '1rem' }}
                flexDirection="column"
                justifyContent={'flex-start'}
              >
                <Stack
                  fontWeight="400"
                  direction={'row'}
                  justifyContent="space-between"
                  w="100%"
                  fontSize={['10px', '14px']}
                >
                  <Text color={'gray.400'}>
                    Showing {filteredData.length} results
                  </Text>
                  <Stack direction={'row'}>
                    <Text color="gray.400">Sort by :</Text>
                    <chakra.select
                      defaultValue="2"
                      bg="white"
                      name="cars"
                      id="cars"
                      onChange={(event: { target: { value: any } }) => {
                        setReqFilter({
                          filter_type: 'createdAt',
                          filter_values: ['1'],
                          sort:
                            event.target.value === '1'
                              ? 'increasing'
                              : 'decreasing',
                        });
                      }}
                    >
                      <option value="1">Newest First</option>
                      <option value="2">Oldest First</option>
                      {/* <option value="3">Most Popular</option> */}
                    </chakra.select>
                  </Stack>
                </Stack>
                <Flex
                  w="full"
                  bg="rgba(255,255,255,0.4)"
                  //border="2px solid #A0D6E3"
                  borderRadius="8px"
                  my="2rem"
                  p="2rem"
                  gap={'30px'}
                  flexWrap="wrap"
                  justifyContent={'space-evenly'}
                >
                  {users.length ? (
                    currentData.length === 0 && loaded ? (
                      <Center
                        textAlign={'center'}
                        flexDirection={'column'}
                        alignItems="center"
                        w="full"
                        h="100%"
                      >
                        <Heading
                          mb="2rem"
                          rounded="full"
                          bg="gray.100"
                          p="1rem 1.5rem"
                          fontSize="6xl"
                        >
                          🫣
                        </Heading>
                        <Text maxW="14rem" fontSize={{ base: 'lg', md: 'xl' }}>
                          Sorry We could not find any match for that.
                        </Text>
                        <Text color={'gray.400'}>Try something else</Text>
                      </Center>
                    ) : (
                      <>
                        {currentData.map((user: IUsers, index: any) => {
                          return <NewUserCard key_index={index} user={user} />;
                        })}
                        <HStack width={'full'} justifyContent="flex-end">
                          <Pagination
                            onPageChange={(page: number) => {
                              setCurrentPage(page);
                            }}
                            siblingCount={4}
                            currentPage={currentPage}
                            totalCount={filteredData.length}
                            pageSize={PageSize}
                          />
                        </HStack>
                      </>
                    )
                  ) : (
                    <Spinner
                      borderColor="#A0D6E3"
                      w={['40px', '50px', '80px']}
                      h={['40px', '50px', '80px']}
                    />
                  )}
                </Flex>
              </Center>
            </Stack>
          </Container>
        </Container>
      </VStack>
    </Container>
  );
};

export default index;
