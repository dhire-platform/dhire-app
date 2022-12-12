import { IJobs } from '@/interfaces/store/data/job.interface';
import {
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { BsBuilding } from 'react-icons/bs';
import { RiMapPin2Line } from 'react-icons/ri';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { Mode } from 'src/lib/enums/enums';
import PostJobModal from '../modals/PostJobModal';

export const JobDetails = ({
  job,
  setJobDetails,
}: {
  job: IJobs;
  setJobDetails: any;
}) => {
  const { company } = useProfileStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(job);
  return (
    <VStack w={'100%'} p={'20px'} gap={'30px'}>
      <PostJobModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        jobDetails={job}
        mode={Mode.EDIT}
        setJobDetails={setJobDetails}
      />
      <VStack
        p={'30px 50px'}
        alignItems={'flex-start'}
        w="100%"
        bg={'rgba(255,255,255,0.7)'}
        gap={0}
      >
        <Heading fontWeight={600} fontSize="2rem">
          {job.title}
        </Heading>
        <HStack w="100%" justifyContent={'space-between'}>
          <HStack gap={3}>
            <Center color="gray.400" gap={2}>
              <Icon as={BsBuilding} w={4} h={4} color="gray.400" />
              <Text>{company.name}</Text>
            </Center>
            <Center color="gray.400" gap={2}>
              <Icon as={RiMapPin2Line} w={4} h={4} color="gray.400" />
              <Text>{job.location}</Text>
            </Center>
          </HStack>
          <Button w="100px" onClick={onOpen}>
            Edit
          </Button>
        </HStack>
      </VStack>
      <VStack
        p={'30px 50px'}
        alignItems={'flex-start'}
        w="100%"
        bg={'rgba(255,255,255,0.7)'}
        gap={'50px'}
      >
        <VStack alignItems={'flex-start'}>
          <Heading fontWeight={600} fontSize="1.5rem">
            Job Description
          </Heading>
          <UnorderedList
            fontSize={['11px', '12px', '14px']}
            alignItems={'flex-start'}
            listStylePos={'inside'}
          >
            {job.description &&
              job.description.map(
                (item, index) => item && <ListItem key={index}>{item}</ListItem>
              )}
          </UnorderedList>
        </VStack>
        <VStack alignItems={'flex-start'}>
          <Heading fontWeight={600} fontSize="1.5rem">
            Key Responsibilities
          </Heading>
          <Text>{job.description}</Text>
        </VStack>
        <VStack alignItems={'flex-start'}>
          <Heading fontWeight={600} fontSize="1.5rem">
            Skills Required
          </Heading>
          <HStack flexWrap={'wrap'} gap={'20px'}>
            {job.skills.map((skill, index) => (
              <Text key={index}>
                {skill.level[0] + skill.level.slice(1).toLowerCase()} :{' '}
                {skill.name}{' '}
              </Text>
            ))}
          </HStack>
        </VStack>
        <VStack alignItems={'flex-start'}>
          <Heading fontWeight={600} fontSize="1.5rem">
            Benefits
          </Heading>
          <UnorderedList listStylePos={'inside'}>
            {job.benefits.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </UnorderedList>
        </VStack>
        <VStack alignItems={'flex-start'}>
          <Heading fontWeight={600} fontSize="1.5rem">
            Jobtype (joblevel)
          </Heading>
          <Text>
            {job.jobType.map((type, index) => (
              <Text key={index} as="span">
                {type[0] + type.slice(1).toLowerCase()}{' '}
              </Text>
            ))}{' '}
            (
            {job.jobLevel
              ? job.jobLevel[0] + job.jobLevel?.slice(1).toLowerCase()
              : ''}
            )
          </Text>
        </VStack>
        <VStack alignItems={'flex-start'}>
          <Heading fontWeight={600} fontSize="1.5rem">
            Salary
          </Heading>
          <Text>
            {job.minSalary} - {job.maxSalary} (
            {job.salaryType?.toLocaleLowerCase()})
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};
