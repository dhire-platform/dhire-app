import {
  Avatar,
  Center,
  Heading,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useProfileStore } from 'src/app/profileStore';
import EditProfileComponent from './UserDetails/ProfileEditModal';

const ProfileComponent = () => {
  const [hover, setHover] = useState(false);
  const { user } = useProfileStore();
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
        w={{ base: '100%', md: 'clamp(16rem, 42vw, 36rem)' }}
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
              name={user.name}
              colorScheme="black"
              src={user.image}
            />
            <Stack
              gap="0"
              justify={'center'}
              align="start"
              w="full"
              direction={'column'}
            >
              <Heading color={'black'} fontSize="xl">
                {user.name}
              </Heading>
              <Text marginBlock="0" margin="0.1rem" color="blackAlpha.500">
                @{user.userName}
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
          fontWeight="300"
          fontSize={'md'}
          noOfLines={3}
          color={'black'}
          w="100%"
          maxW="36rem"
          mt={user.about && '1rem'}
        >
          {user.about}
        </Heading>
      </Center>
    </>
  );
};

export default ProfileComponent;
