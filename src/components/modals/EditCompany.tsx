import { ICompany } from '@/interfaces/store/data/company.interface';
import {
  Button,
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
import { useCallback, useState, SyntheticEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import ChakraTagInput from 'src/lib/helpers/ChakraTagInput';
import ChakraTagInputTag from 'src/lib/helpers/ChakraTagInput/Tag';

const EditCompany = ({ isOpen, onOpen, onClose }: any) => {
  const { company, updateCompany } = useProfileStore();
  const [specializations, setSpecializations] = useState<string[]>();
  const [benefits, setBenefits] = useState<string[]>();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({});
  const submit = async (data: any) => {
    let newCompany: any = {};

    if (specializations?.length) newCompany.specializations = specializations;
    if (benefits?.length) newCompany.benefits = benefits;

    // Add only changed keys
    Object.keys(data).map((key) => {
      if (data[key] && data[key] !== company[key as keyof ICompany]) {
        if (key === 'founded') newCompany.founded = new Date(data.founded);
        else if (key === 'size') newCompany.size = parseInt(data.size);
        else newCompany[key] = data[key];
      }
    });

    // Check if there is any change
    if (Object.keys(newCompany).length) {
      const res = await axios.put('/api/company/' + company.id, newCompany);
      const changedCompany = res.data;
      updateCompany(changedCompany);
      reset();
      onClose();
      toast({
        position: 'top',
        title: 'DONE !!',
        description: 'Successfull Changed',
        status: 'success',
        duration: 3000,
        isClosable: true,
        containerStyle: {
          marginTop: '10%',
        },
      });
    }
  };

  const handleTagsChange = useCallback(
    (_event: SyntheticEvent, tags: string[]) => {
      setSpecializations(tags);
    },
    []
  );
  const handleBenefitsChange = useCallback(
    (_event: SyntheticEvent, tags: string[]) => {
      setBenefits(tags);
    },
    []
  );

  useEffect(() => {
    setSpecializations(company.specializations);
    setBenefits(company.benefits);
  }, [company]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent
        p="1rem"
        pb="2rem"
        maxW="8xl"
        w={{ base: '90vw', sm: '80vw' }}
        mt={{ base: '10px', sm: '40px', '2xl': '100px' }}
      >
        <ModalHeader fontWeight={'700'}>Company Information</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(submit)}>
          <ModalBody
            display="flex"
            fontSize={['10px !important']}
            flexDirection={'row'}
            gap="1rem"
            pb={6}
            flexWrap="wrap"
            justifyContent={'space-between'}
          >
            {/* Name */}
            <FormControl w={{ base: '100%', md: '45%' }} isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                isRequired
                id="name"
                defaultValue={company.name}
                placeholder="Name"
                {...register('name', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message:
                      'Entered value cant start/end or contain only white spacing',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* COMPANY LOCATION */}
            <FormControl w={{ base: '100%', md: '45%' }}>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                defaultValue={company.location}
                placeholder="Location"
                {...register('location', {
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message:
                      'Entered value cant start/end or contain only white spacing',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="location"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* Website */}
            <FormControl w={{ base: '100%', md: '45%' }}>
              <FormLabel htmlFor="website">Website</FormLabel>
              <InputGroup>
                <InputLeftAddon>URL:</InputLeftAddon>
                <Input
                  type="url"
                  id="website"
                  defaultValue={company.website}
                  placeholder="Company URL"
                  {...register('website', {
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
                name="website"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* Logo */}
            <FormControl w={{ base: '100%', md: '45%' }}>
              <FormLabel htmlFor="logo">Logo URL</FormLabel>
              <InputGroup>
                <InputLeftAddon>URL:</InputLeftAddon>
                <Input
                  type="url"
                  id="logo"
                  defaultValue={company.logo}
                  placeholder="Logo URL"
                  {...register('logo', {
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
                name="logo"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* Size */}
            <FormControl w={{ base: '100%', md: '45%' }}>
              <FormLabel htmlFor="size">Company Size</FormLabel>
              <Input
                type="number"
                id="size"
                defaultValue={company.size}
                placeholder="Approx. Employees"
                {...register('size')}
              />
              <ErrorMessage
                errors={errors}
                name="size"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* Type */}
            <FormControl w={{ base: '100%', md: '45%' }}>
              <FormLabel htmlFor="type">Company Type</FormLabel>
              <Input
                type="text"
                id="type"
                defaultValue={company.type}
                placeholder=""
                {...register('type')}
              />
              <ErrorMessage
                errors={errors}
                name="type"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* Industry */}
            <FormControl w={{ base: '100%', md: '45%' }}>
              <FormLabel htmlFor="industry">Industry</FormLabel>
              <Input
                type="text"
                id="industry"
                defaultValue={company.industry}
                placeholder=""
                {...register('industry')}
              />
              <ErrorMessage
                errors={errors}
                name="industry"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* Founded */}
            <FormControl w={{ base: '100%', md: '45%' }}>
              <FormLabel htmlFor="founded">Founded on</FormLabel>
              <Input
                type="date"
                id="founded"
                defaultValue={company.founded?.toString().split('T')[0]}
                placeholder=""
                {...register('founded')}
              />
              <ErrorMessage
                errors={errors}
                name="founded"
                render={({ message }) => (
                  <Text fontSize="sm" color="red.500" py="0.5rem">
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* SPECIALISATION */}
            <FormControl w={{ base: '100%', md: '45%' }}>
              <FormLabel>Specializations: </FormLabel>
              <ChakraTagInput
                tags={specializations}
                onTagsChange={handleTagsChange}
              />
            </FormControl>

            {/* Benefits */}
            <FormControl w={{ base: '100%', md: '45%' }}>
              <FormLabel>Benefits: </FormLabel>
              <ChakraTagInput
                tags={benefits}
                onTagsChange={handleBenefitsChange}
              />
            </FormControl>

            {/* Description */}
            <FormControl w="100%">
              <FormLabel htmlFor="description">Company Description</FormLabel>

              <Textarea
                id="description"
                defaultValue={company.description}
                h={{ base: '120px', md: '150px' }}
                placeholder="Write minimum 50 character description"
                {...register('description', {
                  minLength: {
                    value: 50,
                    message:
                      'write at least 50 letter description about the job',
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
          <ModalFooter p="0rem 1rem">
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="blue"
              mr={3}
              w="120px"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default EditCompany;
