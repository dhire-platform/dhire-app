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

export const RecruiterProcess = () => {
  const { recruiterProfile } = useProfileStore();
  return (
    <HStack w="95%" mt={3} spacing={['5%']} flexWrap="wrap">
      <VStack gap={3}>
        <VStack
          bg="white"
          borderRadius="10px"
          p="1.2rem 2rem"
          gap={2}
          w="full"
          alignItems={'flex-start'}
        >
          <Heading fontSize={['18px', '20px', '22px']}>Company Size</Heading>
          <HStack justifyContent={'space-between'} w="full">
            <Text fontSize={['24px', '26px', '28px']} fontWeight={800}>
              135k
            </Text>
            <Text color="#48E245" fontSize={['15px', '15px', '20px']}>
              <Icon as={HiTrendingUp}></Icon>+15
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
          <Heading fontSize={['18px', '20px', '22px']}>New Employees</Heading>
          <HStack justifyContent={'space-between'} w="full">
            <Text fontSize={['24px', '26px', '28px']} fontWeight={800}>
              35
            </Text>
            <Text color="#48E245" fontSize={['15px', '15px', '20px']}>
              <Icon as={HiTrendingUp}></Icon>+15
            </Text>
          </HStack>
        </VStack>
      </VStack>
      <VStack
        bg="white"
        borderRadius="10px"
        alignItems={'flex-start'}
        p={'1.5rem 1rem'}
        alignSelf={'stretch'}
        gap={5}
      >
        <Heading fontSize={['18px', '20px', '22px']} ml={5}>
          Recruiter Process
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th border={'none'} minW={'100px'}>
                  Name
                </Th>
                <Th border={'none'} minW={'100px'}>
                  Department
                </Th>
                <Th border={'none'} minW={'100px'}>
                  Type
                </Th>
              </Tr>
            </Thead>
            <Tbody fontSize={['11px', '12px', '16px']}>
              <Tr>
                <Td>
                  <HStack spacing={3}>
                    <Avatar size="xs" />
                    <Text as="span">Vijay</Text>
                  </HStack>
                </Td>
                <Td>Devops</Td>
                <Td>
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
      <VStack
        bg="white"
        borderRadius="10px"
        flex={1}
        minW={'200px'}
        p={'1.5rem 1rem'}
        alignSelf={'stretch'}
        gap={5}
      >
        <Heading fontSize={['18px', '20px', '22px']}>Work format</Heading>
        <CircularProgress
          value={40}
          color="#6125F2"
          size={'150px'}
          trackColor="#DED2F7"
          capIsRound
        >
          <CircularProgressLabel>
            <VStack fontSize={'3xl'} spacing={0}>
              <Text fontSize={'md'}>Total</Text>
              <Text fontWeight={700} m={0}>
                328
              </Text>
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>
        <HStack w="full" justifyContent={'space-evenly'}>
          <HStack>
            <Box w={5} h={5} rounded="full" bg="#DED2F7"></Box>
            <Text>Remote</Text>
          </HStack>
          <HStack>
            <Box w={5} h={5} rounded="full" bg="#6125F2"></Box>
            <Text>On site</Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};
