import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { BiMessageDetail } from 'react-icons/bi';
import { TbBellRinging } from 'react-icons/tb';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import ProgressModal from './ProgressModal';

const Profile = () => {
  const { user, userProfile } = useProfileStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const renderJob = () => {
    return (
      <HStack
        onClick={onOpen}
        cursor="pointer"
        _hover={{
          transform: 'scale(1.015)',
          transition: 'all 0.2s ease-out',
        }}
        transition="all 0.2s ease-in"
        bg="white"
        p={'1.5rem'}
        boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.04)"
        borderRadius="12px"
        gap={3}
      >
        <Box pt={1}>
          <Avatar name={'google'} size={'md'} colorScheme={'black'} />
        </Box>
        <VStack alignItems={'flex-start'} spacing={1}>
          <Heading fontSize={'xl'} fontWeight={600}>
            UI/UX Designer
          </Heading>
          <Heading fontSize={'15px'} fontWeight={500} color="blackAlpha.600">
            Google, New York
          </Heading>
        </VStack>
      </HStack>
    );
  };
  return (
    <Container h="fit-content" maxW="full" p="0" pb="10%">
      <ProgressModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <VStack spacing={0}>
        <Box
          zIndex={2}
          pos="relative"
          bottom="-50px"
          borderRadius={'50%'}
          p={2}
          bg="white"
          boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.04)"
        >
          <Avatar
            size="2xl"
            name={user?.name}
            colorScheme="black"
            src={userProfile.image}
          />
        </Box>
        <Stack
          w={{ base: '100%', lg: '90%' }}
          my="1rem"
          maxW="6xl"
          bg="white"
          p={{ base: '4rem 1rem', sm: '4rem' }}
          pb="2rem"
          rounded="md"
          pos="relative"
          boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
        >
          <HStack
            pos="absolute"
            fontSize={'2xl'}
            right="2rem"
            top="2rem"
            gap={2}
            color="blackAlpha.600"
          >
            <Icon
              as={TbBellRinging}
              cursor="pointer"
              _hover={{ color: 'blackAlpha.800' }}
            />
            <Icon
              as={BiMessageDetail}
              cursor="pointer"
              _hover={{ color: 'blackAlpha.800' }}
            />
          </HStack>
          <VStack
            pb="2rem"
            borderBottom={'1px solid black'}
            borderBottomColor="blackAlpha.200"
          >
            <Heading fontSize={'1.8rem'}>{user.name}</Heading>
            <Heading
              w={{ base: '100%', md: '85%' }}
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight={600}
              color="blackAlpha.600"
              textAlign={'center'}
            >
              {userProfile.bio}
            </Heading>
          </VStack>
          <VStack alignItems={['center', 'flex-start']} py={'1.5rem'} gap={7}>
            <Heading fontSize={'1.5rem'}>Applied Jobs</Heading>
            <Stack
              flexDir="row"
              flexWrap={'wrap'}
              spacing={0}
              gap={{ base: '40px', sm: '20px', lg: '40px' }}
              justifyContent="space-evenly"
            >
              {renderJob()}
              {renderJob()}
              {renderJob()}
              {renderJob()}
              {renderJob()}
              {renderJob()}
            </Stack>
            <Button alignSelf={'center'}>View More</Button>
          </VStack>
        </Stack>
      </VStack>
    </Container>
  );
};
export default Profile;
