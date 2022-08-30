import {
  Box,
  Center,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { RiMapPin2Line } from 'react-icons/ri';
import React from 'react';
import { IJob } from 'src/definitions/IJob';

const Card: React.FC<IJob> = (props) => {
  const {
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

  return (
    <Container
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
            w={{ base: '3rem', md: 'full' }}
            h={{ base: '3rem', md: '4rem' }}
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
      </Stack>
    </Container>
  );
};

export default Card;
