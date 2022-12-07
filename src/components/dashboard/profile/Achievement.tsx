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
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';
import { useLocalStore } from 'src/app/store/local/localStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';

const Achievement = () => {
  const { userProfile, user, updateUserProfile } = useProfileStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({});
  const submit = async (e: any) => {
    if (e.achievement !== userProfile.achievement) {
      try {
        const res = await axios.put('/api/userProfile/' + user.id, {
          achievement: e.achievement,
        });
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
        reset();
      } catch (err) {
        console.log(err);
      }
    }
    onClose();
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
        scrollBehavior="outside"
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your achievements</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(submit)}>
            <ModalBody
              display="flex"
              flexDirection={'column'}
              gap="1rem"
              pb={6}
            >
              <FormControl isRequired>
                <Textarea
                  id="achievement"
                  placeholder="About You"
                  defaultValue={userProfile.achievement}
                  {...register('achievement', {
                    required: 'This is Required',
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="achievement"
                  render={({ message }) => (
                    <Text fontSize="sm" color="red.500" py="0.5rem">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                type="submit"
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
              <Button variant={'outline'} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
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
        role="group"
      >
        <Stack
          alignContent={'start'}
          direction={'row'}
          w="full"
          justifyContent={'space-between'}
        >
          <Heading color={'black'} fontSize={{ base: 'xl', lg: '1.7rem' }}>
            Achievement
          </Heading>
          <IconButton
            onClick={onOpen}
            variant={'unstyled'}
            _hover={{
              bg: 'blackAlpha.100',
            }}
            p="0.1rem"
            size="sm"
            display={'flex'}
            opacity={0}
            _groupHover={{ opacity: 1 }}
            alignItems="center"
            justifyContent={'center'}
            color="blackAlpha.600"
            aria-label="add experience"
            icon={<FiEdit2 size="18px" />}
          />
        </Stack>
        <Flex color={'black'} w="100%">
          <Text
            w={'100%'}
            fontWeight="400"
            fontSize={{ base: '12px', lg: '14px' }}
            color="blackAlpha.700"
          >
            {userProfile.achievement}
          </Text>
        </Flex>
      </Center>
    </>
  );
};

export default Achievement;
