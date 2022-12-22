import {
  Box,
  Heading,
  Icon,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useJobStore } from 'src/app/store/job/jobStore';
import Card from 'src/components/landing/Jobs/Card';
import { HiDotsVertical } from 'react-icons/hi';
const JobsList = ({ openJob, openApplicant }: any) => {
  const { job } = useJobStore();
  return (
    <VStack maxW={'800px'} w="100%">
      {job.map((item, index) => (
        <Box key={index} w={'full'} pos="relative">
          <Menu isLazy>
            <MenuButton
              zIndex={100}
              fontWeight={500}
              m={'auto'}
              fontSize={{ base: 'sm', md: 'md' }}
              pos="absolute"
              right={'15px'}
              top={'30px'}
              cursor="pointer"
            >
              <Box>
                <Icon as={HiDotsVertical} />
              </Box>
            </MenuButton>
            <MenuList zIndex={5}>
              <MenuItem onClick={() => openJob(item)}>Job Details</MenuItem>
              <MenuItem onClick={() => openApplicant(item)}>
                Applicants
              </MenuItem>
            </MenuList>
          </Menu>
          <Card key={index} {...item} />
        </Box>
      ))}
    </VStack>
  );
};
export default JobsList;
