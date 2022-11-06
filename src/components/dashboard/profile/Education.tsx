import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
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
  useColorModeValue,
  useDisclosure,
  useEditableControls,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { VscAdd } from 'react-icons/vsc';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { IProfileStore } from '@/interfaces/store/profileStore.interface';
import {
  IExperience,
  Company,
} from '@/interfaces/store/data/experience.interface';
import { IEducation } from '@/interfaces/store/data/education.interface';
import axios from 'axios';

const Education = () => {
  const [hover, setHover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setExperience, experience, education } = useProfileStore();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    const { company, image, designation, description }: IExperience = values;
    const from: Date = new Date(values.from);
    const to: Date = new Date(values.to);

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

    axios
      .put('/api/userProfile/' + user.id, {
        experience: [experienceData],
      })
      .then((res) => {
        setExperience(experienceData);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <Flex
        _hover={{
          bg: 'blackAlpha.100',
        }}
        justifyContent="center"
        p="0.5rem"
        rounded="md"
      >
        <Box as="button" color="blackAlpha.500" {...getCancelButtonProps()}>
          <IoMdClose size="22px" />
        </Box>
      </Flex>
    ) : (
      <Flex
        _hover={{
          bg: 'blackAlpha.100',
        }}
        justifyContent="center"
        p="0.5rem"
        rounded="md"
      >
        <Box as="button" color="blackAlpha.500" {...getEditButtonProps()}>
          <FiEdit2 size="18px" />
        </Box>
      </Flex>
    );
  }

  return (
    <>
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
      <Center
        boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        bg="white"
        w={{ base: '100%', md: 'clamp(16rem, 42vw, 36rem)' }}
        rounded="lg"
        flexDirection={'column'}
        justifyContent="start"
        color={useColorModeValue('white', 'blackAlpha.600')}
        gap="1rem"
        p="1.5rem"
        alignItems="start"
        border="1px solid"
        borderColor={'blackAlpha.200'}
      >
        <Stack w="100%" alignContent={'start'} direction={'column'}>
          <Heading color={'black'} fontSize="xl">
            Education
          </Heading>
          <Editable
            textAlign="center"
            fontSize="md"
            display={'flex'}
            alignItems="center"
            justifyContent={'space-between'}
            flexDirection="row"
            defaultValue="Enter your education details..."
            w="100%"
            gap="1rem"
            h="1.8rem"
            color={'blackAlpha.500'}
            isPreviewFocusable={false}
          >
            <EditablePreview />
            {/* Here is the custom input */}
            <Input textAlign={'start'} as={EditableInput} />
            <Center display={hover ? 'flex' : 'none'}>
              <EditableControls />
            </Center>
          </Editable>
        </Stack>{' '}
        <Divider />
        <Stack w="100%" direction="column">
          <Stack
            h="2rem"
            direction={'row'}
            alignItems="center"
            justify={'space-between'}
          >
            <Heading color={'black'} fontSize="xl">
              Experience
            </Heading>
            <IconButton
              onClick={onOpen}
              variant={'unstyled'}
              _hover={{
                bg: 'blackAlpha.100',
              }}
              p="0.1rem"
              size="sm"
              display={hover && experience?.length > 0 ? 'flex' : 'none'}
              alignItems="center"
              justifyContent={'center'}
              color="blackAlpha.600"
              aria-label="add experience"
              icon={<VscAdd size="18px" />}
            />
          </Stack>
          <Flex
            w="100%"
            py="1rem"
            gap="0.7rem"
            wrap="wrap"
            flexDir={'column'}
            color={'black'}
            maxW="36rem"
          >
            {experience?.length ? (
              experience?.map((experience: IExperience, index) => (
                <Stack
                  key={index}
                  px="2rem"
                  w="100%"
                  py="0.5rem"
                  direction={'row'}
                >
                  <Avatar src={experience?.image} size="md" bg="white" />
                  <Stack w="full" direction={'column'}>
                    <Heading fontSize={'xl'}>experience</Heading>
                    <Text fontSize="md">
                      <></>
                    </Text>
                    <Divider />
                    <Heading fontWeight={'500'} fontSize={'lg'}>
                      {experience.designation}
                    </Heading>
                    <Heading
                      fontWeight="400"
                      noOfLines={2}
                      fontSize={'sm'}
                      color="blackAlpha.500"
                    >
                      {experience.description}
                    </Heading>
                  </Stack>
                </Stack>
              ))
            ) : (
              <Stack
                border={'1px dashed'}
                borderColor="gray.200"
                p="4rem 1rem"
                rounded="md"
                align={'center'}
                direction={'column'}
                w="full"
              >
                <Text pb="1rem" color="blackAlpha.400">
                  You have not added any experiences yet.
                </Text>
                <Box
                  onClick={onOpen}
                  as="button"
                  outline="1px solid gray"
                  p="0.2rem 0.6rem"
                  rounded="sm"
                  fontSize={'xs'}
                  my="1rem"
                >
                  Add Experience
                </Box>
              </Stack>
            )}
          </Flex>
        </Stack>
      </Center>
    </>
  );
};

export default Education;
