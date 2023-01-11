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
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { Mode } from 'src/lib/enums/enums';

const ExpEditModal = ({ isOpen, onOpen, onClose, mode, item }: any) => {
  const [current, setCurrent] = useState<boolean>(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const { user, userProfile, setExperience, updateUserProfile } =
    useProfileStore();
  async function onSubmit(values: any) {
    const from: Date = new Date(values.from);
    const to: Date = new Date(values.to);
    let dateDetails = current
      ? { current, to: undefined }
      : { to, current: false };

    if (
      (to && from && to < from) ||
      (from && from > new Date()) ||
      (to && to > new Date())
    ) {
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
      ...values,
      from,
      ...dateDetails,
    };
    let expArray: IExperience[];
    if (mode === Mode.EDIT && userProfile.experience) {
      let index = userProfile.experience?.findIndex((exp) => exp === item);
      expArray = [...userProfile.experience];
      expArray[index] = experienceData;
    } else {
      expArray = userProfile.experience?.length
        ? [...userProfile.experience, experienceData]
        : [experienceData];
    }
    try {
      const res = await axios.put('/api/userProfile/' + user.id, {
        experience: expArray,
      });

      updateUserProfile(res.data);
      setExperience(experienceData);
      reset();
      setCurrent(false);
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
  useEffect(() => {
    if (mode === Mode.EDIT && item) {
      reset({
        ...item,
        from: item.from.split('T')[0],
        to: item.to ? item.to.split('T')[0] : '',
      });
      setCurrent(item.current);
    } else {
      setCurrent(false);
      reset({});
    }
  }, [isOpen]);
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
            <FormControl isRequired>
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
            <FormControl isRequired>
              <FormLabel htmlFor="designation">Position</FormLabel>
              <Input
                id="designation"
                placeholder="Position"
                {...register('designation')}
              />
            </FormControl>

            {/* Location */}
            <FormControl isRequired>
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
              <FormControl isRequired>
                <FormLabel htmlFor="from">From</FormLabel>
                <Input id="from" type={'date'} {...register('from')} />
              </FormControl>
              <FormControl isRequired={!current}>
                <FormLabel htmlFor="to">To</FormLabel>
                <Input
                  disabled={current}
                  type="date"
                  id="to"
                  {...register('to')}
                />
              </FormControl>
            </Stack>

            {/* Current Disable to when current checked*/}
            <FormControl>
              <Checkbox
                onChange={(e) => setCurrent(e.target.checked)}
                defaultChecked={item && item.current}
              >
                {' '}
                Current{' '}
              </Checkbox>
            </FormControl>
            {/* Job Description */}
            <FormControl isRequired>
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
