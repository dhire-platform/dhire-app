import {
  Box,
  Center,
  Container,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
  Image,
  useDimensions,
} from '@chakra-ui/react';
//import Image from 'next/image';
import React, { RefObject, useRef } from 'react';
import { RiMapPin2Line } from 'react-icons/ri';
import { IJobs } from '@/interfaces/store/data/job.interface';
import { useProfileStore } from 'src/app/store/profile/profileStore';

const Card: React.FC<IJobs> = (props) => {
  const elementRef = useRef() as RefObject<HTMLElement>;
  const dimensions = useDimensions(elementRef);
  const { user, userProfile, company: companyProfile } = useProfileStore();
  const recruiter = user.type;
  const card_style =
    recruiter === 'RECRUITER'
      ? {}
      : {
          _hover: {
            transform: 'scale(1.015)',
            transition: 'all 0.2s ease-out',
          },
          transition: 'all 0.2s ease-in',
          cursor: 'pointer',
        };
  //console.log('card dimensions - ', dimensions?.contentBox.width);
  const {
    title,
    description,
    jobType,
    jobLevel,
    maxSalary,
    minSalary,
    location,
    company,
  } = props;
  const firstLtrCaps = (text: any) =>
    text[0].toUpperCase() + text.slice(1).toString().toLowerCase();
  return (
    <Container
      pos="relative"
      {...card_style}
      ref={elementRef as RefObject<HTMLDivElement>}
      my="1rem"
      maxW="4xl"
      bg="white"
      p={{ base: '1.2rem', md: '2.2rem' }}
      rounded="md"
      boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
    >
      <Stack direction={'column'} gap={{ base: '10px', md: '0.8rem' }}>
        <Stack
          alignItems={'flex-start'}
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ md: '1rem' }}
        >
          <Stack
            w={'full'}
            alignItems={{ base: 'center', md: 'flex-start' }}
            flexDirection={'row'}
            fontSize={{ base: '10px', sm: '12px', md: 'md' }}
          >
            <Center
              m="0.5rem"
              minW="40px"
              minH="40px"
              w={{ base: 'full', md: 'full' }}
              h={{ base: '4rem', md: '4rem' }}
              maxW="4rem"
              position="relative"
            >
              <Image
                src={'https://xsgames.co/randomusers/avatar.php?g=female'}
                alt="Job Logo"
                rounded={'full'}
                //layout="fill"
                objectFit="contain"
              />
            </Center>
            <Stack mt="0" mr="auto" w="150%" direction={'column'} spacing={1}>
              <Heading
                noOfLines={1}
                lineHeight="140%"
                fontSize={['17px', '20px', '24px']}
              >
                {title}
              </Heading>
              <Stack
                gap={{ base: '30px' }}
                minW="70%"
                direction="row"
                color="gray.400"
              >
                <Text>{companyProfile.name || company?.name}</Text>
                {/* company name */}
                <Stack direction="row" align={'center'}>
                  <Icon as={RiMapPin2Line} w={4} h={4} color="gray.400" />
                  <Text w="max-content">{location ? location : 'Remote'}</Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Center m="0" w="full">
            <Heading
              ml={{ base: 3, md: 'auto' }}
              mr={{ base: 'auto', md: 0 }}
              fontSize={['15px', '20px', '24px']}
            >
              ${minSalary}K - ${maxSalary}K
            </Heading>
          </Center>
        </Stack>
        <Box>
          <Text
            noOfLines={[3, 3, 2]}
            textAlign={'start'}
            color="gray.500"
            fontWeight={'500'}
            fontSize={['12px', '15px', 'md']}
          >
            {description}
          </Text>
        </Box>
        <Box display={'flex'} gap="1rem">
          <Tag fontSize={['10px', '13px']}>{firstLtrCaps(jobLevel)}</Tag>
          {jobType[0] &&
            jobType.map((type, index) => (
              <Tag key={index} fontSize={['10px', '13px']}>
                {firstLtrCaps(type)}
              </Tag>
            ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default Card;
