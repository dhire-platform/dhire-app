import Card from 'src/components/landing/Jobs/Card';
import Layout from 'src/components/landing/Jobs/Layout';
import Data from 'src/components/landing/Jobs/Data.json';
import { useMemo, useState } from 'react';
import Pagination from 'src/components/Pagination/Pagination';
import { IJob } from 'src/definitions/IJob';
import {
  Center,
  Checkbox,
  CheckboxGroup,
  Heading,
  Stack,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  chakra,
} from '@chakra-ui/react';
import { prepareServerlessUrl } from 'next/dist/server/base-server';
import { useInView } from 'react-intersection-observer';
import { Redirect } from 'src/helpers/Redirect';
import { useAuthStore } from 'src/app/authStore';

interface IPayload {
  searchWord?: string;
  locationName?: string;
}

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<IJob[]>(Data);
  const [modifiedArray, setModifiedArray] = useState<IJob[]>(Data);
  const [checked_value, setChecked_value] = useState<[]>([]);
  const { ref, inView, entry } = useInView({
    threshold: 0.55,
  });

  const isAuth = useAuthStore((state: any) => state.isAuth);
  console.log(inView);

  if (isAuth) {
    Redirect('/dashboard');
  }

  const PageSize: number = 4;

  // const modifyArray = (filter_name?: string, filter?: string) => {
  //   console.log('checked_value.length -', checked_value.length);
  //   if (checked_value.length > 0) {
  //     checked_value.forEach((element) => {
  //       const temp_arr = Data.filter(
  //         (x: IJob) => x.job_type === parseInt(element, 10)
  //       );
  //       setFillData((prev) => [...prev, temp_arr]);
  //     });
  //     setFilteredData(fillData);
  //     console.log(filteredData.length);
  //   } else if (checked_value?.length === 0) {
  //     console.log('here');
  //     setFilteredData(() => [Data]);
  //   }
  // };

  const currentData = useMemo(() => {
    console.log('useMemoCalled');
    console.log(filteredData);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const arr = filteredData.slice(firstPageIndex, lastPageIndex);
    return arr;
  }, [currentPage, filteredData]);

  const modifyData = ({ searchWord, locationName }: IPayload) => {
    // if both location and search are selected then filter array using two properties, if only one one is defined in params then only use one
    console.log(searchWord, locationName);
    if (!searchWord && locationName) {
      // handle when location is modified
      const newFilteredArray = Data?.filter((DataObject) => {
        return DataObject.job_location === locationName;
      });
      setModifiedArray(newFilteredArray);
      setFilteredData(modifiedArray);
    } else if (searchWord && !locationName) {
      // handles when search is done
      if (searchWord[0] === ' ') {
        setFilteredData(Data);
      } else {
        const newFilteredArray = Data?.filter((DataObject) => {
          return DataObject.job_title
            .toLowerCase()
            .includes(searchWord.toLowerCase());
        });
        setFilteredData(newFilteredArray);
      }
    } else {
      // handles when both are modified
    }
  };

  return (
    <Layout data={filteredData} setData={modifyData}>
      <Stack
        ref={ref}
        position='sticky'
        mx='auto'
        maxW='fit-content'
        direction={'row'}
        gap='1.5rem'
        p='1rem'
      >
        <Stack spacing={'2rem'} minW='15rem' direction={'column'} p='1rem'>
          <Stack direction={'column'}>
            <Heading fontWeight='600' fontSize='xl'>
              Job Type
            </Heading>
            <CheckboxGroup
              onChange={(checked_fields: []) => {
                console.log('checked_fields arr -', checked_fields);
                setChecked_value(checked_fields);
                // modifyArray();
              }}
            >
              <Stack direction={'column'} p='1rem'>
                <Checkbox value='1' size={'md'}>
                  Full Time Job
                </Checkbox>
                <Checkbox value='2' size={'md'}>
                  Part Time Job
                </Checkbox>
                <Checkbox value='3' size={'md'}>
                  Freelance Job
                </Checkbox>
                <Checkbox value='4' size={'md'}>
                  Remote Job
                </Checkbox>
                <Checkbox value='5' size={'md'}>
                  Internship
                </Checkbox>
              </Stack>{' '}
            </CheckboxGroup>
          </Stack>

          <Stack gap='1rem'>
            <Heading fontWeight='600' fontSize='xl'>
              Salary
            </Heading>
            {/* eslint-disable-next-line jsx-a11y/aria-proptypes*/}
            <RangeSlider aria-label={['min', 'max']} defaultValue={[10, 30]}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Stack>
          <Stack direction={'column'}>
            {' '}
            <Heading fontWeight='600' fontSize='xl'>
              Experience
            </Heading>
            <Stack direction={'column'} p='1rem'>
              <Checkbox value='1' onSelect={() => console.log('1')}>
                Entry Level
              </Checkbox>
              <Checkbox
                value='2'
                onChange={(event: any) => {
                  console.log('2', event.target.checked);
                }}
              >
                Intermediate Level
              </Checkbox>
              <Checkbox value='3' onClick={() => console.log('3')}>
                Senior Level
              </Checkbox>
            </Stack>
          </Stack>
        </Stack>
        <Center
          minW='42rem'
          gap='1.3rem'
          p='1rem'
          w='fit-content'
          flexDirection='column'
        >
          <Stack
            fontWeight='400'
            direction={'row'}
            justifyContent='space-between'
            w='100%'
          >
            <Text color='gray.400'>Showing {filteredData.length} results</Text>
            <Stack direction={'row'}>
              <Text color='gray.400'>Sort by :</Text>
              <chakra.select
                onChange={(event: any) => console.log(event.target.value)}
                defaultValue='1'
                bg='white'
                name='cars'
                id='cars'
              >
                <option value='1'>Newest First</option>
                <option value='2'>Oldest First</option>
                <option value='3'>Most Popular</option>
              </chakra.select>
            </Stack>
          </Stack>
          {currentData.length === 0 ? (
            <Center
              textAlign={'center'}
              flexDirection={'column'}
              w='100%'
              maxW='3xl'
              h='100%'
            >
              <Heading
                mb='2rem'
                rounded='full'
                bg='gray.100'
                p='1rem 1.5rem'
                fontSize='6xl'
              >
                🫣
              </Heading>
              <Text maxW='14rem' fontSize='xl'>
                Sorry We could not find any match for that.
              </Text>
              <Text color={'gray.400'}>Try something else</Text>
            </Center>
          ) : (
            currentData.map((item, index) => <Card key={index} {...item} />)
          )}
          <Pagination
            onPageChange={(page: number) => {
              setCurrentPage(page);
            }}
            siblingCount={4}
            currentPage={currentPage}
            totalCount={filteredData.length}
            pageSize={PageSize}
          />
        </Center>
      </Stack>
    </Layout>
  );
};

export default Jobs;
