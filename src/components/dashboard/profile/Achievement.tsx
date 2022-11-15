import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useLocalStore } from 'src/app/store/local/localStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';

const Achievement = () => {
  const { userProfile, user, updateUserProfile } = useProfileStore();
  const toast = useToast();
  const submit = (value: any) => {
    if (value !== userProfile.achievement) {
      axios
        .put('/api/userProfile/' + user.id, { achievement: value })
        .then((res) => {
          updateUserProfile(res.data);
          toast({
            position: 'top',
            title: 'DONE !!',
            description: 'Successfully Added.',
            status: 'success',
            duration: 1000,
            isClosable: true,
            containerStyle: {
              marginTop: '10%',
            },
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Center
      boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
      bg="white"
      w="100%"
      rounded="lg"
      flexDirection={'column'}
      justifyContent="start"
      gap="1rem"
      p="1.5rem"
      alignItems="start"
      border="1px solid"
      color="blackAlpha.200"
    >
      <Stack alignContent={'start'} direction={'row'}>
        <Heading color={'black'} fontSize={{ base: 'xl', lg: '2rem' }}>
          Achievement
        </Heading>
      </Stack>
      <Flex color={'black'} w="100%">
        <Editable
          defaultValue={userProfile.achievement || 'Click this to edit.'}
          onSubmit={submit}
          w={'100%'}
          fontSize={{ base: 'sm', md: 'md' }}
        >
          <EditablePreview />
          <EditableTextarea />
        </Editable>
      </Flex>
    </Center>
  );
};

export default Achievement;
