import { IEducation } from '@/interfaces/store/data/education.interface';
import { IProject } from '@/interfaces/store/data/projects.interface';
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
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { Mode } from 'src/lib/enums/enums';
import { EditableList } from 'src/lib/helpers/EditableInput/EditableList';

const EditProjectModal = ({ isOpen, onOpen, onClose, mode, item }: any) => {
  const [current, setCurrent] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
  const { user, userProfile, updateUserProfile } = useProfileStore();
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onSubmit = async (values: any) => {
    // useToast when date.to < date.from
    let dateDetails = current
      ? { current, to: undefined }
      : { to: new Date(values.to), current };
    let project: IProject = {
      ...values,
      ...dateDetails,
      link: links,
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
    let projectArray: IProject[];
    if (mode === Mode.EDIT && userProfile.projects) {
      let index = userProfile.projects.findIndex((p) => p === item);
      projectArray = [...userProfile.projects];
      projectArray[index] = project;
    } else {
      projectArray = userProfile.projects?.length
        ? [...userProfile.projects, project]
        : [project];
    }
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
  useEffect(() => {
    if (mode === Mode.EDIT) {
      reset({
        ...item,
        from: item.from.split('T')[0],
        to: item.to ? item.to.split('T')[0] : '',
      });
      if (item.link?.length) setLinks(item.link);
      setCurrent(item.current);
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
              <FormLabel htmlFor="link">Project links</FormLabel>

              <EditableList
                list={links}
                setList={setLinks}
                type={'url'}
                placeholder="https://www.abcd.com"
              />
              <HStack wrap={'wrap'} spacing={0} gap={1}>
                {links.map((link, i) => (
                  <Tag key={i}>
                    <TagLabel>{link}</TagLabel>
                    <TagCloseButton
                      onClick={() => {
                        let newtags = links.filter(
                          (item, index) => index !== i
                        );
                        setLinks(newtags);
                      }}
                    />
                  </Tag>
                ))}
              </HStack>
              {/* <InputLeftAddon>URL:</InputLeftAddon>
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
                /> */}
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
              <Checkbox
                onChange={(e) => setCurrent(e.target.checked)}
                defaultChecked={item && item.current}
              >
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
                    value: 500,
                    message: 'Maximum length should be 500',
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
