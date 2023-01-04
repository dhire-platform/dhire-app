import {
  chakra,
  Button,
  Center,
  Flex,
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
  Text,
  VStack,
  Box,
} from '@chakra-ui/react';
import Image from 'next/image';
import { ErrorMessage } from '@hookform/error-message';
import { useWallet } from '@solana/wallet-adapter-react';
import { useForm } from 'react-hook-form';
import { useCreateAccount } from 'src/lib/hooks/createUser/useCreateUser';
import { useState } from 'react';
import { roleEnum } from 'src/lib/enums/enums';

const UserTypeModal = ({
  isOpen,
  onOpen,
  onClose,
  openNext,
  setUserData,
}: any) => {
  const [userType, setUserType] = useState<roleEnum>(roleEnum.RECRUIT);
  const connected_wallet = useWallet();
  const submit = (data: any) => {
    setUserData({ ...data, userType });
    openNext();
    onClose();
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({});

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        connected_wallet.disconnect();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent p="1rem" w="80vw" maxWidth="100vw" h="90vh" m={'5vh'}>
        <Flex w="100%" h="100%">
          <Center w={{ base: '100%', md: '50%' }} h="100%">
            <form onSubmit={handleSubmit(submit)}>
              <ModalBody
                display="flex"
                flexDirection={'column'}
                gap="1rem"
                pb={6}
              >
                {/* Full Name */}
                <FormControl isRequired>
                  <FormLabel htmlFor="name">
                    <Box as="span" color="#ACACAC">
                      What should we
                    </Box>{' '}
                    call you ?
                  </FormLabel>
                  <Input
                    isRequired
                    id="name"
                    placeholder="name"
                    mb={4}
                    border="none"
                    borderBottom="1px solid #C3B9B9"
                    borderRadius="none"
                    _focusVisible={{
                      border: 'none',
                      borderBottom: '1px solid black',
                    }}
                    _placeholder={{ color: '#AEAEAE' }}
                    {...register('name', {
                      required: 'This is required',
                      minLength: {
                        value: 2,
                        message: 'Minimum length should be 2',
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

                {/*userType */}
                <FormControl isRequired>
                  <FormLabel htmlFor="userType">
                    <Box as="span" color="#ACACAC">
                      {' '}
                      What are you{' '}
                    </Box>
                    looking for ?
                  </FormLabel>
                  <chakra.select
                    mb={5}
                    mt={2}
                    w="100%"
                    border="none"
                    borderBottom="1px solid #C3B9B9"
                    bg="white"
                    name="jobType"
                    placeholder="Select option"
                    borderRadius="none"
                    _focusVisible={{ border: '0px solid white' }}
                    onChange={(event: { target: { value: any } }) => {
                      setUserType(event.target.value);
                    }}
                  >
                    <chakra.option
                      borderRadius={0}
                      bg="#F4F4F4"
                      value={roleEnum.RECRUIT}
                    >
                      Talent
                    </chakra.option>
                    <chakra.option
                      borderRadius={0}
                      bg="#F4F4F4"
                      value={roleEnum.RECRUITER}
                    >
                      Earning Opportunity
                    </chakra.option>
                  </chakra.select>
                </FormControl>
              </ModalBody>
              <ModalFooter p="0rem 1rem">
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                >
                  Next
                </Button>
              </ModalFooter>
            </form>
          </Center>
          <Center
            w={{ base: '100%', md: '50%' }}
            h="100%"
            position="relative"
            bg="#DFE1F5"
            borderRadius="8px"
          >
            <Image
              src="/assets/user.svg"
              alt="saly"
              layout="fill"
              objectFit="contain"
            />
          </Center>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default UserTypeModal;
