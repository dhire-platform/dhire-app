import {
  Company,
  IExperience,
} from '@/interfaces/store/data/experience.interface';
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileStore } from 'src/app/store/profile/profileStore';

const ExpEditModal = ({ isOpen, onOpen, onClose }: any) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const { user, userProfile, setExperience, updateUserProfile } =
    useProfileStore();
  async function onSubmit(values: any) {
    const { company, image, designation, description, current }: IExperience =
      values;
    const from: Date = new Date(values.from);
    const to: Date = new Date(values.to);

    if (to && from && (to < from || from > new Date())) {
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
    const experienceData: IExperience = {
      company: company,
      image,
      designation: designation,
      from: from,
      to: to,
      current,
      location: 'remote',
      description: description,
    };

    let expArray: IExperience[] = userProfile.experience?.length
      ? [...userProfile.experience, experienceData]
      : [experienceData];
    try {
      const res = await axios.put('/api/userProfile/' + user.id, {
        experience: expArray,
      });

      updateUserProfile(res.data);
      setExperience(experienceData);
      reset();
      onClose();
    } catch (e: any) {
      console.log(e.response.data.error);
    }
  }
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

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
        <ModalHeader>Job Details</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody
            pt="1rem"
            display="flex"
            flexDirection={'column'}
            gap="1rem"
            pb={6}
          >
            {/* CompanyName */}
            <FormControl>
              <FormLabel htmlFor="company">Company Name</FormLabel>
              <Input
                isRequired
                id="company"
                placeholder="Name"
                {...register('company', {
                  required: 'This is required',
                  minLength: {
                    value: 3,
                    message: 'Minimum length should be 3',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="company"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/*company logo URL */}
            <FormControl>
              <FormLabel htmlFor="image">Company Logo</FormLabel>
              <InputGroup>
                <InputLeftAddon>URL:</InputLeftAddon>
                <Input
                  type="url"
                  id="image"
                  placeholder="Logo URL"
                  {...register('image')}
                />
              </InputGroup>
            </FormControl>

            {/*Designation */}
            <FormControl>
              <FormLabel htmlFor="designation">Position</FormLabel>
              <Input
                id="designation"
                placeholder="Position"
                {...register('designation')}
              />
            </FormControl>

            {/* Location */}
            <FormControl>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                type="text"
                placeholder="Location"
                id="location"
                {...register('location')}
              />
            </FormControl>

            {/* from/To */}
            <Stack direction={'row'}>
              <FormControl>
                <FormLabel htmlFor="date">From</FormLabel>
                <Input id="from" type={'date'} {...register('from')} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="date">To</FormLabel>
                <Input id="to" type={'date'} {...register('to')} />
              </FormControl>
            </Stack>

            {/* Current (ongoing/present) */}
            <FormControl>
              <Checkbox {...register('current')}> Ongoing </Checkbox>
            </FormControl>
            {/* Job Description */}
            <FormControl>
              <FormLabel htmlFor="name">Job Description</FormLabel>
              <Input
                id="description"
                placeholder="Description"
                {...register('description')}
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

export default ExpEditModal;
