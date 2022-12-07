import { IEducation } from '@/interfaces/store/data/education.interface';
import { IProject } from '@/interfaces/store/data/projects.interface';
import {
  Button,
  Checkbox,
  FormControl,
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
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileStore } from 'src/app/store/profile/profileStore';

const EditProjectModal = ({ isOpen, onOpen, onClose }: any) => {
  const [current, setCurrent] = useState(false);
  const { user, userProfile, updateUserProfile } = useProfileStore();
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onSubmit = async (values: any) => {
    // useToast when date.to < date.from
    let dateDetails = current
      ? { current, to: undefined }
      : { to: new Date(values.to) };
    let project: IProject = {
      ...values,
      ...dateDetails,
      from: new Date(values.from),
    };
    if (
      (project.to && project.from && project.to < project.from) ||
      (project.from && project.from > new Date()) ||
      (project.to && project.to > new Date())
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
    let projectArray: IProject[] = userProfile.projects?.length
      ? [...userProfile.projects, project]
      : [project];
    const res = await axios.put('/api/userProfile/' + user.id, {
      projects: projectArray,
    });
    updateUserProfile(res.data);
    reset();
    setCurrent(false);
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
        <ModalHeader>Project Details</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody display="flex" flexDirection={'column'} gap="1rem" pb={6}>
            {/* title */}
            <FormControl isRequired>
              <FormLabel htmlFor="title">Project title</FormLabel>
              <Input
                isRequired
                type="text"
                id="title"
                {...register('title', {
                  required: 'This is Required',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="title"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* link*/}
            <FormControl>
              <FormLabel htmlFor="link">Project link</FormLabel>
              <InputGroup>
                <InputLeftAddon>URL:</InputLeftAddon>
                <Input
                  type="url"
                  id="link"
                  placeholder="project link"
                  {...register('link', {
                    pattern: {
                      value:
                        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                      message: 'Enter a Valid URL',
                    },
                  })}
                />
              </InputGroup>
              <ErrorMessage
                errors={errors}
                name="link"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
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

            <FormControl isRequired={!current}>
              <FormLabel htmlFor="to">To</FormLabel>
              <Input
                disabled={current}
                type="date"
                id="to"
                {...register('to')}
              />
            </FormControl>

            {/* Current Disable to when current checked*/}
            <FormControl>
              <Checkbox onChange={(e) => setCurrent(e.target.checked)}>
                {' '}
                current{' '}
              </Checkbox>
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

export default EditProjectModal;
