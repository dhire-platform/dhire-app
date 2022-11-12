import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
import { VscAdd } from 'react-icons/vsc';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { IExperience } from '@/interfaces/store/data/experience.interface';
import EditEducationModal from './UserDetails/EducationEditModal';
import ExpEditModal from './UserDetails/ExpEditModal';
import axios from 'axios';

const Education = () => {
  const [hover, setHover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEduOpen,
    onOpen: onEduOpen,
    onClose: onEduClose,
  } = useDisclosure();
  const { user, userProfile, experience, education, updateUserProfile } =
    useProfileStore();

  const deleteEdu = async (del: number) => {
    let newEdu = userProfile.education?.filter((edu, index) => index !== del);
    const res = await axios.put('/api/userProfile/' + user.id, {
      education: newEdu,
    });

    updateUserProfile(res.data);
  };
  function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

  return (
    <>
      <EditEducationModal
        isOpen={isEduOpen}
        onOpen={onEduOpen}
        onClose={onEduClose}
      />
      <ExpEditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
        <VStack justify="space-between" align={'start'} w="full">
          <Stack
            direction={'row'}
            justify="space-between"
            align={'start'}
            w="full"
            role="group"
            minH="50px"
          >
            <Heading color={'black'} fontSize="xl">
              Education
            </Heading>
            <IconButton
              onClick={onEduOpen}
              variant={'unstyled'}
              _hover={{
                bg: 'blackAlpha.100',
              }}
              display="none"
              _groupHover={{ display: 'flex' }}
              p="0.1rem"
              size="sm"
              alignItems="center"
              justifyContent={'center'}
              color="blackAlpha.600"
              aria-label="add experience"
              icon={<FiEdit2 size="18px" />}
            />
          </Stack>{' '}
          {userProfile.education?.map((edu, index) => (
            <VStack
              key={index}
              alignItems="flex-start"
              color="black"
              fontSize={'12px'}
              border="1px solid gray"
              borderColor="gray.300"
              p={4}
              rounded={'8px'}
              pos="relative"
              role="group"
            >
              <IconButton
                onClick={() => deleteEdu(index)}
                variant={'unstyled'}
                _hover={{
                  bg: 'blackAlpha.100',
                }}
                display="none"
                _groupHover={{ display: 'flex' }}
                p="0.1rem"
                size="sm"
                pos="absolute"
                top="0px"
                right="0px"
                color="blackAlpha.600"
                aria-label="add experience"
                icon={<IoCloseSharp size="18px" />}
              />
              <Text>{`${edu.degree}, ${edu.school} ${
                edu.location || ''
              }`}</Text>
              <Text>{`${edu.from} - ${edu.to}`}</Text>
              <Text>{edu.description}</Text>
            </VStack>
          ))}
        </VStack>
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
