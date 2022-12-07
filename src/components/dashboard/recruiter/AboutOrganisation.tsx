import { Container, Heading, Text, VStack } from '@chakra-ui/layout';
import { useProfileStore } from 'src/app/store/profile/profileStore';
export const AboutOrganisation = () => {
  const { recruiterProfile, company } = useProfileStore();
  return (
    <VStack
      w="95%"
      bg="white"
      borderRadius="10px"
      gap={3}
      p={['1.5rem', '1.8em 3em']}
      flex={1}
      alignItems="flex-start"
    >
      <Heading fontSize={['20px', '22px', '25px']}>
        About Organisation/Culture
      </Heading>
      <Text fontSize={['11px', '12px', '14px']}>
        {company.description || 'Add description about your organisation here'}
      </Text>
    </VStack>
  );
};
