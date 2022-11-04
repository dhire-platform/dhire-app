import {
  Box,
  Center,
  Container,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
  useDimensions
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { RefObject, useRef } from 'react';
import { RiMapPin2Line } from 'react-icons/ri';
import { IJob } from '@/interfaces/job/job.interface';

const Card: React.FC<IJob> = (props) => {
  const elementRef = useRef() as RefObject<HTMLElement>;
  const dimensions = useDimensions(elementRef);

  //console.log('card dimensions - ', dimensions?.contentBox.width);
  const {
    id,
    job_title,
    job_company,
    job_company_image,
    job_description,
    job_type,
    job_experience_level,
    job_salary_max,
    job_salary_min,
    job_location,
  } = props;

  const getJobType = (job_type: number) => {
    if (job_type === 1) {
      return 'Full time';
    } else if (job_type === 2) {
      return 'Part time';
    } else if (job_type === 3) {
      return 'Freelance';
    } else if (job_type === 4) {
      return 'Remote';
    } else {
      return 'Internship';
    }
  };
  const getExperienceType = (job_experience_level: number) => {
    if (job_experience_level === 1) {
      return 'Entry Level';
    } else if (job_experience_level === 2) {
      return 'Intermediate Level';
    } else if (job_experience_level === 3) {
      return 'Senior Level';
    }
  };
  return (
    <Container
      _hover={{
        transform: 'scale(1.015)',
        transition: 'all 0.2s ease-out',
      }}
      transition="all 0.2s ease-in"
      ref={elementRef as RefObject<HTMLDivElement>}
      my="1rem"
      maxW="3xl"
      bg="white"
      p={'2.2rem'}
      rounded="md"
      boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
    >
      <Stack direction={'column'} gap="0.8rem">
        <Stack alignItems={'flex-start'} flexDirection={'row'} gap="1rem">
          <Center
            m="0.5rem"
            w={{ base: '4rem', md: 'full' }}
            h={{ base: '4rem', md: '4rem' }}
            maxW="4rem"
            position="relative"
          >
            <Image
              src={job_company_image}
              alt="Job Logo"
              layout="fill"
              objectFit="contain"
              style={{
                borderRadius: '6px',
              }}
            />
          </Center>
          <Stack mt="0" mr="auto" w="150%" direction={'column'}>
            <Heading noOfLines={1} lineHeight="140%" fontSize={'24px'}>
              {job_title}
            </Heading>
            <Stack
              justify="space-between"
              w="70%"
              direction="row"
              color="gray.400"
            >
              <Text>{job_company}</Text>
              <Stack direction="row" align={'center'}>
                <Icon as={RiMapPin2Line} w={4} h={4} color="gray.400" />
                <Text>{job_location ? job_location : 'Remote'}</Text>
              </Stack>
            </Stack>
          </Stack>
          <Center m="0" w="full">
            <Heading ml="auto" fontSize="22px">
              ${job_salary_min}K - ${job_salary_max}K
            </Heading>
          </Center>
        </Stack>
        <Box>
          <Text
            noOfLines={2}
            textAlign={'start'}
            color="gray.500"
            fontWeight={'500'}
          >
            {job_description}
          </Text>
        </Box>
        <Box display={'flex'} gap="1rem">
          <Tag>{getExperienceType(job_experience_level)}</Tag>
          <Tag>{getJobType(job_type)}</Tag>
        </Box>
      </Stack>
    </Container>
  );
};

export default Card;
