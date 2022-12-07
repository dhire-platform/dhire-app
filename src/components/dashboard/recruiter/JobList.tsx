import { Box, Heading, VStack } from '@chakra-ui/react';
import { useJobStore } from 'src/app/store/job/jobStore';
import Card from 'src/components/landing/Jobs/Card';
import Data from 'src/components/landing/Jobs/Data.json';
const JobsList = ({ openJob }: any) => {
  const { job } = useJobStore();
  console.log(job);
  return (
    <VStack maxW={'800px'} w="100%">
      {job.map((item, index) => (
        <Box
          onClick={() => openJob(item)}
          cursor="pointer"
          key={index}
          w={'full'}
        >
          <Card key={index} {...item} />
        </Box>
      ))}
    </VStack>
  );
};
export default JobsList;
