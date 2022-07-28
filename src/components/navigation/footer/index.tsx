import {
  Box,
  Center,
  chakra,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react';
import { RiTwitterFill, RiLinkedinFill } from 'react-icons/ri';
import { SiDiscord } from 'react-icons/si';

const SocialButton = ({ children, label, href }: any) => {
  return (
    <chakra.button
      w={['8', '10', '12']}
      h={['8', '10', '12']}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'all 0.3s ease'}
      _hover={{
        color: 'grey',
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = () => {
  return (
    <Container maxW='85rem' pt='6rem' px='2rem'>
      <Box w='100%' h='0.09rem' bg='gray.500' />
      <Flex
        gap='4rem'
        flexDirection={['column', 'row']}
        justify='space-between'
        py='6rem'
      >
        <VStack alignItems={'start'}>
          <Heading>D-Hire.</Heading>
          <Text color='#686868' maxW='25rem'>
            D-Hire is on a mission to enhance applicant’s experience and making
            it dead simple for leading recruiters to hire top tech talent.
          </Text>
          <Stack direction={'row'} spacing='1rem'>
            <SocialButton label={'Twitter'} href={'#'}>
              <RiTwitterFill size={['30']} />
            </SocialButton>
            <SocialButton label={'Discord'} href={'#'}>
              <SiDiscord size={30} />
            </SocialButton>
            <SocialButton as={'a'} label={'LinkedIn'} href={'#'}>
              <RiLinkedinFill size={30} />
            </SocialButton>
          </Stack>
        </VStack>
        <Flex
          flexDirection={['column-reverse', 'column-reverse', 'row']}
          gap={{ base: '2rem', md: '4rem' }}
        >
          <VStack alignItems={'start'}>
            <Heading fontSize='2xl'>Candidates</Heading>
            <Text color='#686868'>Apply for job</Text>
            <Text color='#686868'>Candidate FAQ</Text>
          </VStack>
          <VStack alignItems={'start'}>
            <Heading fontSize='2xl'>Employers</Heading>
            <Text color='#686868'>Hire Talent</Text>
            <Text color='#686868'>Employer FAQ</Text>
          </VStack>
          <VStack alignItems={'start'}>
            <Heading fontSize='2xl'>Blog</Heading>
          </VStack>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
