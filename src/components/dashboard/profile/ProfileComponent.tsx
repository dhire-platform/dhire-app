import {
  Avatar,
  Center,
  Heading,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import EditProfileComponent from './UserDetails/ProfileEditModal';

const ProfileComponent = () => {
  const [hover, setHover] = useState(false);
  const { userProfile, user } = useProfileStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EditProfileComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Center
        boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        bg={useColorModeValue('white', 'blackAlpha.600')}
        w="100%"
        rounded="lg"
        flexDirection={'column'}
        p="1.5rem"
        alignItems="start"
        border="1px solid"
        borderColor={'blackAlpha.200'}
        color={'black'}
      >
        <Stack
          direction={'row'}
          justify="space-between"
          align={'start'}
          w="full"
        >
          <Stack direction={'row'} gap="0.7rem" w="full">
            <Avatar
              size="lg"
              name={user?.name}
              colorScheme="black"
              src={userProfile.image}
            />
            <Stack
              gap="0"
              justify={'center'}
              align="start"
              w="full"
              direction={'column'}
            >
              <Heading color={'black'} fontSize="xl">
                {user?.name}{' '}
                {userProfile?.location?.trim()
                  ? `(${userProfile?.location.trim()})`
                  : ''}
              </Heading>
              <Text marginBlock="0" margin="0" color="blackAlpha.500">
                @{user?.username}
              </Text>
            </Stack>
          </Stack>
          <IconButton
            onClick={onOpen}
            variant={'unstyled'}
            _hover={{
              bg: 'blackAlpha.100',
            }}
            p="0.1rem"
            size="sm"
            display={hover ? 'flex' : 'none'}
            alignItems="center"
            justifyContent={'center'}
            color="blackAlpha.600"
            aria-label="add experience"
            icon={<FiEdit2 size="18px" />}
          />
        </Stack>
        <Heading
          fontWeight="400"
          fontSize={{ base: '12px', lg: '14px' }}
          noOfLines={3}
          color={'blackAlpha.800'}
          w="100%"
          maxW="36rem"
          mt={userProfile?.bio && '1rem'}
        >
          {userProfile?.bio}
        </Heading>
      </Center>
    </>
  );
};

export default ProfileComponent;
