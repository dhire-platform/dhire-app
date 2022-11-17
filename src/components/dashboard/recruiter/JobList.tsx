import { Box, Heading, VStack } from '@chakra-ui/react';
import Card from 'src/components/landing/Jobs/Card';
import Data from 'src/components/landing/Jobs/Data.json';

const JobsList = ({ openJob }: any) => {
  return (
    <VStack>
      {(() => {
        let jobs = [];
        for (let i = 0; i < 10; i++) {
          jobs.push(
            <Box onClick={() => openJob(true)} cursor="pointer" key={i}>
              <Card key={i} {...Data[i]} />
            </Box>
          );
        }
        return jobs;
      })()}
    </VStack>
  );
};
export default JobsList;
