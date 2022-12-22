import {
  Container,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/layout';
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
      <UnorderedList
        fontSize={['11px', '12px', '14px']}
        alignItems={'flex-start'}
        listStylePos={'inside'}
      >
        {!company.description
          ? 'Add description about your organisation here'
          : company.description
              .split('\u2022')
              .map(
                (item, index) => item && <ListItem key={index}>{item}</ListItem>
              )}
      </UnorderedList>
    </VStack>
  );
};
