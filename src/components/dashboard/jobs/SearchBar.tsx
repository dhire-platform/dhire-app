import { HStack, Icon, chakra, Box } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { RiMapPin2Line } from 'react-icons/ri';

export const SearchBar = ({ setReqFilter }: any) => {
  return (
    <HStack fontSize={'md'} justifyContent="space-between">
      <HStack>
        <Icon
          as={FiSearch}
          w={{ base: 4, md: 7 }}
          h={{ base: 4, md: 7 }}
          color="gray.300"
        />
        <chakra.input
          fontSize={{ base: '12px', md: 'md' }}
          w={['70px', 'auto']}
          onChange={(event: { target: { value: any } }) => {
            setReqFilter({
              filter_type: 'title',
              filter_values:
                event.target.value === ''
                  ? []
                  : [event.target.value.toLowerCase()],
              search: true,
            });
          }}
          placeholder="Search Jobs..."
          _active={{ outline: '0' }}
          _focus={{ outline: '0' }}
        />
      </HStack>
      <HStack fontSize={{ base: '10px', sm: '12px', md: 'md' }}>
        <Box h={{ base: '1rem', md: '4rem' }} w="6px" color="gray.500"></Box>
        <Icon as={RiMapPin2Line} w={[5, 5, 7]} h={[5, 5, 7]} color="gray.300" />
        <chakra.select
          w={['70px', 'auto']}
          bg="white"
          name="location"
          placeholder="Select option"
          onChange={(event: { target: { value: any } }) => {
            setReqFilter({
              filter_type: 'location',
              filter_values:
                event.target.value === '' ? [] : [event.target.value],
            });
          }}
        >
          <option value="">ALL</option>
          <option value="London, UK">London, UK</option>
          <option value="California, US">California, US</option>
          <option value="New Delhi, India">New Delhi, India</option>
          <option value="Banglore, India">Banglore, India</option>
        </chakra.select>
      </HStack>
    </HStack>
  );
};
