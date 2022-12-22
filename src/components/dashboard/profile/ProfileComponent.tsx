import { ISocial } from '@/interfaces/store/data/socials.interface';
import {
  Avatar,
  Center,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import EditProfileComponent from './UserDetails/ProfileEditModal';
const socials = {
  youtube: <BsYoutube color="#A0AEC0" size="18px" />,
  twitter: <BsTwitter color="#A0AEC0" size="18px" />,
  facebook: <FaFacebook color="#A0AEC0" size="18px" />,
  linkedin: <BsLinkedin color="#A0AEC0" size="18px" />,
  instagram: <BsInstagram color="#A0AEC0" size="18px" />,
  github: <BsGithub color="#A0AEC0" size="18px" />,
};
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
        {userProfile.social && (
          <HStack mt={4} gap={1}>
            {Object.keys(userProfile.social).map(
              (k, i) =>
                userProfile.social && (
                  <Link
                    href={userProfile.social[k as keyof ISocial]}
                    key={i}
                    isExternal
                  >
                    {socials[k as keyof ISocial]}
                  </Link>
                )
            )}
          </HStack>
        )}
      </Center>
    </>
  );
};

export default ProfileComponent;
