import {
  Heading,
  HStack,
  Text,
  VStack,
  chakra,
  Avatar,
  Box,
  Icon,
} from '@chakra-ui/react';
import { MdVerified } from 'react-icons/md';

export const Schedule = () => {
  return (
    <VStack
      bg="white"
      w="95%"
      p={['1.2rem 10px', '1.2rem 2rem']}
      borderRadius="10px"
    >
      <HStack
        w="full"
        pb="1.2rem"
        fontWeight={800}
        justifyContent="space-between"
        borderBottom="1px solid #F3EDED"
      >
        <Text fontSize={['18px', '20px', '22px']}>Schedule</Text>
        <chakra.select
          defaultValue="1"
          bg="white"
          name="cars"
          id="cars"
          onChange={(event: { target: { value: any } }) => {
            console.log(event.target.value);
          }}
        >
          <option value="1">Newest First</option>
          <option value="2">Oldest First</option>
          {/* <option value="3">Most Popular</option> */}
        </chakra.select>
      </HStack>
      <HStack
        w="full"
        justifyContent={'space-between'}
        borderBottom="1px solid #F3EDED"
        pb={'1.2rem'}
      >
        <HStack gap={3} py={2} alignItems="flex-start">
          <Avatar size={['sm', 'md']} />
          <VStack spacing={0} alignItems={'flex-start'} gap={2}>
            <HStack
              flexDir={['column', 'row']}
              alignItems={['flex-start', 'center']}
              spacing={0}
              gap={[0, 2, 4]}
            >
              <Text fontSize={['lg', 'xl']} fontWeight={600}>
                Vijay{' '}
              </Text>
              <HStack fontSize={['xs', 'sm']} color="gray.500">
                <Text>13 Mar 2022 </Text>
                <HStack w={2} h={2} bg="gray.700" rounded={'full'}></HStack>
                <Text>04:23 PM</Text>
              </HStack>
            </HStack>
            <Text fontSize={['xs', 'sm']} color="gray.500" fontWeight={500}>
              Sccessfully Interviewed
            </Text>
          </VStack>
        </HStack>
        <Icon as={MdVerified} w={6} h={6} color="green" />
      </HStack>
      <HStack w="full" justifyContent={'space-between'} pb={'1.2rem'}>
        <HStack gap={3} py={2} alignItems="flex-start">
          <Avatar size={['sm', 'md']} />
          <VStack spacing={0} alignItems="flex-start" gap={2}>
            <HStack
              flexDir={['column', 'row']}
              alignItems="flex-start"
              spacing={0}
            >
              <Text fontSize={['lg', 'xl']} fontWeight={600}>
                Vijay{' '}
              </Text>
              <HStack fontSize={['xs', 'sm']} color="gray.500">
                <Text>13 Mar 2022 </Text>
                <HStack w={2} h={2} bg="gray.700" rounded={'full'}></HStack>
                <Text>04:23 PM</Text>
              </HStack>
            </HStack>
            <Text fontSize={'sm'} color="gray.500" fontWeight={500}>
              Interview schedule for 5 PM
            </Text>
          </VStack>
        </HStack>
        <Icon as={MdVerified} w={6} h={6} color="green.100" />
      </HStack>
    </VStack>
  );
};
