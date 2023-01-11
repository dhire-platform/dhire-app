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
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { BsBuilding } from 'react-icons/bs';
import { FiArrowLeft } from 'react-icons/fi';
import { RiMapPin2Line } from 'react-icons/ri';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { Mode } from 'src/lib/enums/enums';
import { ApplyButton } from '../dashboard/jobs/ApplyButton';
import PostJobModal from '../modals/PostJobModal';
import { useRouter } from 'next/router';

export const JobDetails = ({
  job,
  setJobDetails,
  applyMode,
  companyName,
}: {
  job: IJobs;
  setJobDetails: any;
  applyMode?: boolean;
  companyName?: string;
}) => {
  const wallet = useWallet();
  const router = useRouter();
  const { company } = useProfileStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack w={'100%'} p={'20px'} gap={'30px'} pos={'relative'}>
      {wallet.connected && (
        <Icon
          as={FiArrowLeft}
          color={'black'}
          fontSize={'1.5rem'}
          cursor="pointer"
          pos="absolute"
          left="10px"
          top="0px"
          onClick={() => setJobDetails(undefined)}
        />
      )}
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
              <Text>{company.name || companyName}</Text>
            </Center>
            <Center color="gray.400" gap={2}>
              <Icon as={RiMapPin2Line} w={4} h={4} color="gray.400" />
              <Text>{job.location}</Text>
            </Center>
          </HStack>
          {applyMode ? (
            wallet.connected ? (
              <ApplyButton job={job} />
            ) : (
              <HStack>
                <WalletMultiButton>Apply</WalletMultiButton>
                <Button
                  variant={'outline'}
                  onClick={() => router.push('/jobs')}
                >
                  Back
                </Button>
              </HStack>
            )
          ) : (
            <Button w="100px" onClick={onOpen}>
              Edit
            </Button>
          )}
        </HStack>
      </VStack>
      <VStack
        p={'30px 50px'}
        alignItems={'flex-start'}
        w="100%"
        bg={'rgba(255,255,255,0.7)'}
        gap={'50px'}
        fontSize={{ base: '14px', md: '16px' }}
      >
        <VStack alignItems={'flex-start'}>
          <Heading fontWeight={600} fontSize="1.5rem">
            Job Description
          </Heading>
          <VStack alignItems={'flex-start'}>
            {job.description &&
              job.description.map(
                (item, index) => item.trim() && <Text key={index}>{item}</Text>
              )}
          </VStack>
        </VStack>
        <VStack alignItems={'flex-start'}>
          <Heading fontWeight={600} fontSize="1.5rem">
            Skills Required
          </Heading>
          <HStack flexWrap={'wrap'} gap={'20px'} spacing={0}>
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
            Jobtype
          </Heading>
          <Text>
            {job.jobType.map((type, index) => (
              <Text key={index} as="span">
                {type[0] + type.slice(1).toLowerCase()}{' '}
                {job.jobType.length - 1 !== index && ' , '}
              </Text>
            ))}{' '}
            {job.jobLevel ? (
              <Text ml={3} as="span">
                {' Level : ' +
                  job.jobLevel[0] +
                  job.jobLevel?.slice(1).toLowerCase()}
              </Text>
            ) : (
              ''
            )}
          </Text>
        </VStack>
        <VStack alignItems={'flex-start'}>
          <Heading fontWeight={600} fontSize="1.5rem">
            Salary
          </Heading>
          <Text>
            ${job.minSalary} - ${job.maxSalary} (
            {job.salaryType?.toLocaleLowerCase()})
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};
