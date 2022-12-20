import {
  Center,
  chakra,
  Checkbox,
  CheckboxGroup,
  Container,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from 'src/components/landing/Jobs/Card';
import Layout from 'src/components/landing/Jobs/Layout';
import Pagination from 'src/components/Pagination/Pagination';
import { IFilter } from '@/interfaces/filter.interface';
import { IJob, IJobs } from '@/interfaces/store/data/job.interface';
import { useFilter } from 'src/lib/hooks/useFilter';
import { useJobStore } from 'src/app/store/job/jobStore';
import { JobLevel, JobType } from 'src/lib/enums/enums';
import axios from 'axios';

const Jobs = () => {
  const { job, updateJob } = useJobStore();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<IJobs[]>([]);
  const [sliderValue1, setSliderValue1] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const [sliderValue2, setSliderValue2] = useState(5);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const { ref, inView, entry } = useInView({
    threshold: 0.4,
  });

  const PageSize = 6;
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const arr = filteredData.slice(firstPageIndex, lastPageIndex);
    return arr;
  }, [currentPage, filteredData]);

  const setReqFilter = (filter: IFilter) => {
    let existingFilters = filters;

    let req_filter = existingFilters.filter(
      (item) =>
        item.filter_type !== filter.filter_type && item.filter_values.length
    );
    req_filter.push(filter);
    setFilters(req_filter);
  };
  useEffect(() => {
    if (!job.length && !loaded) {
      axios.get('/api/jobPost').then(({ data }: any) => {
        setLoaded(true);
        updateJob(data);
      });
    } else if (job.length) {
      setLoaded(true);
      setFilteredData(job);
    }
  }, [job]);
  useEffect(() => {
    let newArray = useFilter({
      all_filters: filters,
      fullArray: job || [],
    });
    //console.log(newArray[0]);
    setFilteredData(newArray);
    setCurrentPage(1);
  }, [filters]);
  return (
    <Layout data={filteredData} setData={setReqFilter}>
      <Container
        px={[0, '0.8rem']}
        pb="6rem"
        pt="1.5rem"
        mt="2rem"
        maxW="full"
        bg="#FCFCFC"
        minH="100vh"
        zIndex={2}
      >
        <Stack
          flexDir={{ base: 'column', lg: 'row-reverse' }}
          ref={ref}
          position="sticky"
          mx="auto"
          maxW="100%"
          direction={'row'}
          spacing={0}
          gap={{ base: '0', md: 0, lg: '1.5rem' }}
          p={{ base: '10px', md: '1rem' }}
        >
          <Stack>
            <Stack
              spacing={'2rem'}
              minW={{ base: 'auto', md: '15rem' }}
              direction={'column'}
              p="1rem"
            >
              {/* Job Type */}
              <Stack direction={'column'}>
                <Heading fontWeight="600" fontSize={{ base: 'lg', md: 'xl' }}>
                  Job Type
                </Heading>
                <CheckboxGroup
                  onChange={(checked_fields: string[]) => {
                    setReqFilter({
                      filter_type: 'jobType',
                      filter_values: checked_fields,
                    });
                  }}
                >
                  <Stack
                    direction={{ base: 'column', sm: 'row', lg: 'column' }}
                    spacing={0}
                    gap={[2, 4, 4, 3]}
                    p="1rem"
                    wrap={'wrap'}
                    w="full"
                  >
                    <Checkbox value={JobType.FULLTIME} size={['sm', 'md']}>
                      Full Time Job
                    </Checkbox>
                    <Checkbox value={JobType.PARTTIME} size={['sm', 'md']}>
                      Part Time Job
                    </Checkbox>
                    <Checkbox value={JobType.FREELANCE} size={['sm', 'md']}>
                      Freelance Job
                    </Checkbox>
                    <Checkbox value={JobType.REMOTE} size={['sm', 'md']}>
                      Remote Job
                    </Checkbox>
                    <Checkbox value={JobType.INTERNSHIP} size={['sm', 'md']}>
                      Internship
                    </Checkbox>
                  </Stack>{' '}
                </CheckboxGroup>
              </Stack>
              {/* SALARy */}
              <Stack gap="1rem">
                <Heading fontWeight="600" fontSize={{ base: 'lg', md: 'xl' }}>
                  Salary
                </Heading>
                <RangeSlider
                  aria-label={['0', '300']}
                  max={300}
                  id="slider"
                  colorScheme="blue"
                  onChangeEnd={(val) => {
                    let props = {
                      filter_type: 'maxSalary',
                      filter_values: ['1'],
                      compare: {
                        base: ['maxSalary', 'maxSalary'],
                        compareTo: val,
                      },
                    };
                    //console.log(val);
                    setReqFilter(props);
                    setSliderValue1(val[0]);
                    setSliderValue2(val[1]);
                  }}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <RangeSliderMark
                    value={0}
                    mt="1"
                    ml={{ base: '-5', md: '-2.5' }}
                    fontSize={['xs', 'sm']}
                  >
                    0k
                  </RangeSliderMark>
                  <RangeSliderMark
                    value={300}
                    mt="1"
                    ml={{ base: '-5', md: '-2.5' }}
                    fontSize={['xs', 'sm']}
                  >
                    300k
                  </RangeSliderMark>
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <Tooltip
                    hasArrow
                    bg="blue.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${sliderValue1}k`}
                  >
                    <RangeSliderThumb index={0} />
                  </Tooltip>
                  <Tooltip
                    hasArrow
                    bg="blue.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${sliderValue2}k`}
                  >
                    <RangeSliderThumb index={1} />
                  </Tooltip>
                </RangeSlider>
              </Stack>
              {/* EXP */}
              <Stack direction={'column'}>
                {' '}
                <Heading fontWeight="600" fontSize={{ base: 'lg', md: 'xl' }}>
                  Experience
                </Heading>
                <CheckboxGroup
                  onChange={(checked_fields: string[]) => {
                    setReqFilter({
                      filter_type: 'jobLevel',
                      filter_values: checked_fields,
                    });
                  }}
                >
                  <Stack
                    direction={{ base: 'column', sm: 'row', lg: 'column' }}
                    spacing={0}
                    gap={[2, 4, 4, 3]}
                    p="1rem"
                  >
                    <Checkbox value={JobLevel.BEGINNER} size={['sm', 'md']}>
                      Entry Level
                    </Checkbox>
                    <Checkbox value={JobLevel.INTERMEDIATE} size={['sm', 'md']}>
                      Intermediate Level
                    </Checkbox>
                    <Checkbox value={JobLevel.ADVANCED} size={['sm', 'md']}>
                      Senior Level
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Stack>
            </Stack>
          </Stack>
          <Center
            // minW="42rem"
            gap="1.3rem"
            w="full"
            p={{ base: '0px', md: '1rem' }}
            flexDirection="column"
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
            {currentData.length === 0 && loaded ? (
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
            ) : loaded || job.length > 0 ? (
              currentData.map((item, index) => <Card key={index} {...item} />)
            ) : (
              <Text>Loading...</Text>
            )}
            <Pagination
              onPageChange={(page: number) => {
                setCurrentPage(page);
              }}
              siblingCount={1}
              currentPage={currentPage}
              totalCount={filteredData.length}
              pageSize={PageSize}
            />
          </Center>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Jobs;
