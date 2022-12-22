import Icon from '@chakra-ui/icon';
import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';
import { Avatar } from '@chakra-ui/avatar';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { HiTrendingUp } from 'react-icons/hi';
import { useJobStore } from 'src/app/store/job/jobStore';

export const RecruiterProcess = () => {
  const { company } = useProfileStore();
  const { job } = useJobStore();
  return (
    <HStack w="95%" mt={3} spacing={0} flexWrap="wrap" gap={5} flex={1}>
      {/* COMPANY SIZE */}
      <VStack
        gap={3}
        spacing={0}
        maxW={{ base: '100%', xl: '30%' }}
        flexDir={{ base: 'column', md: 'row', xl: 'column' }}
        justifyContent="space-evenly"
        alignSelf="stretch"
        w="full"
      >
        <HStack
          w="full"
          flexDir={{ base: 'column', sm: 'row' }}
          gap={3}
          spacing={0}
        >
          <VStack
            bg="white"
            borderRadius="10px"
            p="1.2rem 2rem"
            gap={2}
            w="full"
            alignItems={'flex-start'}
          >
            <Heading fontSize={['18px', '20px', '22px']}>Founded</Heading>
            <HStack justifyContent={'space-between'} w="full">
              <Text fontSize={['24px', '26px', '28px']} fontWeight={800}>
                {company.founded
                  ? new Date(company.founded).getFullYear()
                  : '-'}
              </Text>
            </HStack>
          </VStack>
          <VStack
            bg="white"
            borderRadius="10px"
            p="1.2rem 2rem"
            gap={2}
            w="full"
            alignItems={'flex-start'}
          >
            <Heading fontSize={['18px', '20px', '22px']}>Size</Heading>
            <HStack justifyContent={'space-between'} w="full">
              <Text fontSize={['24px', '26px', '28px']} fontWeight={800}>
                {company.size || '-'}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <VStack
          bg="white"
          borderRadius="10px"
          p="1.2rem 2rem"
          gap={2}
          w="full"
          alignItems={'flex-start'}
        >
          <Heading fontSize={['18px', '20px', '22px']}>Location</Heading>
          <HStack justifyContent={'space-between'} w="full">
            <Text fontSize={['24px', '26px', '28px']} fontWeight={800}>
              {company.location || '-'}
            </Text>
          </HStack>
        </VStack>
      </VStack>

      {/* RECRUITER PROCESS */}
      <VStack
        bg="white"
        borderRadius="10px"
        alignItems={'flex-start'}
        p={'1.5rem 1rem'}
        alignSelf={'stretch'}
        gap={5}
        maxW={{ md: '600px' }}
        flex={1}
      >
        <Heading fontSize={['18px', '20px', '22px']} ml={[0, 5]}>
          Recruiter Process
        </Heading>
        <TableContainer w="full">
          <Table variant="simple">
            <Thead fontSize={['11px', '12px', '16px']}>
              <Tr>
                <Th
                  p={[1, 2, 2, 6]}
                  border={'none'}
                  minW={['40px', '60px', '100px']}
                >
                  Name
                </Th>
                <Th
                  p={[1, 2, 2, 6]}
                  border={'none'}
                  minW={['40px', '60px', '100px']}
                >
                  Department
                </Th>
                <Th
                  p={[1, 2, 2, 6]}
                  border={'none'}
                  minW={['40px', '60px', '100px']}
                >
                  Type
                </Th>
              </Tr>
            </Thead>
            <Tbody fontSize={['11px', '12px', '16px']}>
              <Tr>
                <Td p={[1, 2, 2, 6]}>
                  <HStack spacing={[0, 3]}>
                    <Avatar
                      size={'xs'}
                      display={{ base: 'none', sm: 'block' }}
                    />
                    <Text as="span">Vijay</Text>
                  </HStack>
                </Td>
                <Td p={[1, 2, 2, 6]}>Devops</Td>
                <Td p={[1, 2, 2, 6]}>
                  <HStack>
                    <Box
                      w={'10px'}
                      h={'10px'}
                      rounded={'full'}
                      bg="orange"
                    ></Box>
                    <Text as="span">Tech Interview</Text>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>

      {/* WORK FORMAT */}
      <VStack
        bg="white"
        borderRadius="10px"
        flex={1}
        minW={'max-content'}
        p={'1.5rem 1rem'}
        alignSelf={'stretch'}
        gap={5}
      >
        <Heading fontSize={['18px', '20px', '22px']}>Jobs Posted</Heading>
        <CircularProgress
          value={40}
          color="#6125F2"
          size={'200px'}
          trackColor="#DED2F7"
          capIsRound
        >
          <CircularProgressLabel>
            <VStack fontSize={'3xl'} spacing={0}>
              <Text fontSize={'md'}>Total</Text>
              <Text fontWeight={700} m={0}>
                {job.length}
              </Text>
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>
        <HStack w="full" justifyContent={'space-evenly'}>
          <HStack>
            <Box w={5} h={5} rounded="full" bg="#DED2F7"></Box>
            <Text>Open</Text>
          </HStack>
          <HStack>
            <Box w={5} h={5} rounded="full" bg="#6125F2"></Box>
            <Text>Closed</Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};
