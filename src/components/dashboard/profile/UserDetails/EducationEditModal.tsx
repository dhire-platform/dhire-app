import { IEducation } from '@/interfaces/store/data/education.interface';
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import useProfileEdit from './useProfileEdit';

const EditEducationModal = ({ isOpen, onOpen, onClose }: any) => {
  const { user, userProfile, updateUserProfile } = useProfileStore();
  const router = useRouter();
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onSubmit = async (values: any) => {
    // useToast when date.to < date.from
    let edu: IEducation = {
      ...values,
      to: new Date(values.to),
      from: new Date(values.from),
    };
    if (edu.to && edu.from && (edu.to < edu.from || edu.from > new Date())) {
      toast({
        position: 'top',
        title: 'Error !!',
        description: 'Date to/from is incorrect',
        status: 'error',
        duration: 2000,
        isClosable: true,
        containerStyle: {
          marginTop: '10%',
        },
      });
      return;
    }
    let eduArray: IEducation[] = userProfile.education?.length
      ? [...userProfile.education, edu]
      : [edu];
    const res = await axios.put('/api/userProfile/' + user.id, {
      education: eduArray,
    });
    updateUserProfile(res.data);
    reset();
    onClose();
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({});

  return (
    <Modal
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      scrollBehavior="outside"
      size="xl"
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Education Details</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody display="flex" flexDirection={'column'} gap="1rem" pb={6}>
            {/* school */}
            <FormControl isRequired>
              <FormLabel htmlFor="school">Institution Name</FormLabel>
              <Input
                isRequired
                type="text"
                id="school"
                {...register('school', {
                  required: 'This is Required',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="school"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/*Degree*/}
            <FormControl isRequired>
              <FormLabel htmlFor="degree">Degree</FormLabel>
              <Input
                type="text"
                id="degree"
                {...register('degree', {
                  required: 'This is Required',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="degree"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* Field of Study */}
            <FormControl>
              <FormLabel htmlFor="fieldOfStudy">Field of study</FormLabel>
              <Input
                type="text"
                id="fieldOfStudy"
                placeholder="Computer Science ..etc"
                {...register('fieldOfStudy')}
              />
            </FormControl>

            {/* from */}
            <FormControl isRequired>
              <FormLabel htmlFor="from">From</FormLabel>
              <Input
                type="date"
                id="from"
                {...register('from', {
                  required: 'This is Required',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="from"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* to */}
            <FormControl isRequired>
              <FormLabel htmlFor="to">To</FormLabel>
              <Input
                type="date"
                id="to"
                {...register('to', {
                  required: 'This is Required',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="to"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* current */}
            <FormControl>
              <Checkbox {...register('current')}> Ongoing </Checkbox>
            </FormControl>

            {/* Location */}
            <FormControl>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input type="text" id="location" {...register('location')} />
            </FormControl>

            {/* Description */}
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                {...register('description', {
                  maxLength: {
                    value: 200,
                    message: 'Maximum length should be 200',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="description"
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
  );
};

export default EditEducationModal;
