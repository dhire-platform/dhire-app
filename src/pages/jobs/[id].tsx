import { IJobs } from '@/interfaces/store/data/job.interface';
import { JobDetails } from 'src/components/hire/JobDetails';
import { useEffect, useMemo, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useJobStore } from 'src/app/store/job/jobStore';
import { useRouter } from 'next/router';

const MoreAboutJob = () => {
  const [selectedJob, setSelectedJob] = useState<IJobs>();
  const { job } = useJobStore();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    let item = job.find((job) => job.id === id);
    setSelectedJob(item);
  }, []);
  return (
    <Box bg="whiteAlpha.300" zIndex={4} p={0}>
      {selectedJob ? (
        <JobDetails
          job={selectedJob}
          setJobDetails={setSelectedJob}
          applyMode={true}
          companyName={selectedJob.company?.name}
        />
      ) : (
        <Text>Loading....</Text>
      )}
    </Box>
  );
};

export default MoreAboutJob;
