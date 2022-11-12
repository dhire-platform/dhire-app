import {
  Company,
  IExperience,
} from '@/interfaces/store/data/experience.interface';
import {
  Button,
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
} from '@chakra-ui/react';
import axios from 'axios';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileStore } from 'src/app/store/profile/profileStore';

const ExpEditModal = ({ isOpen, onOpen, onClose }: any) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { user, userProfile, setExperience, updateUserProfile } =
    useProfileStore();
  function onSubmit(values: any) {
    const { company, image, designation, description }: IExperience = values;
    const from: Date = new Date(values.from);
    const to: Date = new Date(values.to);
    // Add this in prisma
    const companyDetails: Company = {
      name: company as string,
      image: image,
    };

    const experienceData: IExperience = {
      company: companyDetails,
      designation: designation,
      from: from,
      to: to,
      current: false,
      location: 'remote',
      description: description,
    };

    let expArray: IExperience[] = userProfile.experience?.length
      ? [...userProfile.experience, experienceData]
      : [experienceData];
    axios
      .put('/api/userProfile/' + user.id, {
        experience: expArray,
      })
      .then((res) => {
        updateUserProfile(res.data);
        setExperience(experienceData);
        onClose();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  const {
    handleSubmit,
    register,
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
            {/* Full Name */}
            <FormControl>
              <FormLabel htmlFor="name">Company Name</FormLabel>
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
              <FormErrorMessage>errors?.name?.message</FormErrorMessage>
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
              <FormLabel htmlFor="name">Position</FormLabel>
              <Input
                id="designation"
                placeholder="Position"
                {...register('designation')}
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

            {/* Job Description */}
            <FormControl>
              <FormLabel htmlFor="name">Job Description</FormLabel>
              <Input
                id="description"
                placeholder="Position"
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
