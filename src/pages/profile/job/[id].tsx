import { Container, Stack } from '@chakra-ui/react';
import JobDetails from 'src/components/landing/Jobs/JobDetails';

const index = () => {
  return (
    <Container maxW="8xl">
      <Stack direction="row">
        <JobDetails />
      </Stack>
    </Container>
  );
};

export default index;
