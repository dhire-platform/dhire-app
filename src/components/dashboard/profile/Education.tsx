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
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEdit, FiEdit2 } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
import { VscAdd } from 'react-icons/vsc';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { IExperience } from '@/interfaces/store/data/experience.interface';
import EditEducationModal from './UserDetails/EducationEditModal';
import ExpEditModal from './UserDetails/ExpEditModal';
import axios from 'axios';
import { deleteField } from './useDeleteField';
import { IEducation } from '@/interfaces/store/data/education.interface';
import { changeToMonth } from 'src/lib/helpers/Date/changeToMonth';
import { Mode } from 'src/lib/enums/enums';

const Education = () => {
  const [mode, setMode] = useState<Mode>();
  const [selected, setSelected] = useState<any>();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEduOpen,
    onOpen: onEduOpen,
    onClose: onEduClose,
  } = useDisclosure();
  const { user, userProfile, education, updateUserProfile } = useProfileStore();
  const { experience } = userProfile;
  function iconRender(icon: any, onClick: any, label: string) {
    return (
      <IconButton
        onClick={onClick}
        variant={'unstyled'}
        _hover={{
          bg: 'blackAlpha.100',
        }}
        display="flex"
        opacity={0}
        _groupHover={{ opacity: 1 }}
        p="0.1rem"
        size="sm"
        alignItems="center"
        justifyContent={'center'}
        color="blackAlpha.600"
        aria-label={label}
        icon={icon}
      />
    );
  }
  function experienceRender(experience: IExperience, index: number) {
    return (
      <Stack
        key={index}
        px={{ base: '0', lg: '1rem' }}
        py={index !== 1 ? 3 : 0}
        w="100%"
        gap={[0, 5]}
        direction={'row'}
        role="group"
        pos="relative"
      >
        <Box pt={1}>
          <Avatar
            name={experience?.company}
            src={experience?.image}
            size={'md'}
            colorScheme={'black'}
          />
        </Box>
        <Stack
          w="full"
          spacing={5}
          pb="1.5rem"
          borderBottom={
            userProfile.experience?.length === index + 1
              ? ''
              : '1px solid rgba(0,0,0,0.2)'
          }
        >
          <Stack dir="column">
            <HStack>
              <Heading fontSize={'xl'}>{experience.company}</Heading>
              <HStack alignSelf={'flex-start'}>
                {iconRender(
                  <FiEdit2 size="18px" />,
                  () => {
                    setMode(Mode.EDIT);
                    setSelected(experience);
                    onOpen();
                  },
                  'edit education'
                )}
                {iconRender(
                  <IoCloseSharp size="18px" />,
                  () =>
                    deleteField(
                      { del: index, type: 'exp' },
                      toast,
                      user,
                      userProfile,
                      updateUserProfile
                    ),
                  'delete experience'
                )}
              </HStack>
            </HStack>
            {(experience.to || experience.current) && experience.from && (
              <HStack fontSize={'14px'} color="blackAlpha.600">
                <Text as="span">
                  {changeToMonth(new Date(experience.from))}{' '}
                </Text>
                <Text as="span" color={'black'}>
                  -
                </Text>
                <Text as="span">
                  {!experience.to
                    ? 'Present'
                    : changeToMonth(new Date(experience.to))}
                </Text>
              </HStack>
            )}
          </Stack>
          <Stack dir="column">
            <Heading
              fontWeight={'700'}
              fontSize={{ base: '12px', lg: 'md' }}
              color="blackAlpha.600"
            >
              {experience.designation}
            </Heading>
            <Text
              fontWeight="400"
              noOfLines={2}
              fontSize={{ base: '12px', lg: '14px' }}
              color="blackAlpha.700"
            >
              {experience.description}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    );
  }
  function educationRender(edu: IEducation, index: number) {
    return (
      <VStack
        key={index}
        alignItems="flex-start"
        color="blackAlpha.700"
        fontSize={{ base: '12px', lg: '14px' }}
        spacing={4}
        pos="relative"
        role="group"
        w="full"
        pb={'40px'}
        borderBottom={'1px solid rgba(0,0,0,0.09)'}
      >
        <VStack alignItems={'flex-start'}>
          <HStack>
            <Heading
              mt={0}
              fontSize={{ base: 'lg', lg: '1.3rem' }}
              color="blackAlpha.800"
            >{`${edu.degree} , ${edu.school} ${edu.location || ''}`}</Heading>
            <HStack alignSelf={'flex-start'}>
              {iconRender(
                <FiEdit2 size="18px" />,
                () => {
                  setMode(Mode.EDIT);
                  setSelected(edu);
                  onEduOpen();
                },
                'edit education'
              )}
              {iconRender(
                <IoCloseSharp size="18px" />,
                () =>
                  deleteField(
                    { del: index, type: 'edu' },
                    toast,
                    user,
                    userProfile,
                    updateUserProfile
                  ),
                'Delete Education'
              )}
            </HStack>
          </HStack>

          {
            <HStack fontSize={'14px'} color="blackAlpha.600">
              <Text as="span">
                {edu.from && changeToMonth(new Date(edu.from))}{' '}
              </Text>
              <Text as="span" color={'black'}>
                -
              </Text>
              <Text as="span">
                {edu.current
                  ? 'Present'
                  : edu.to
                  ? changeToMonth(new Date(edu.to))
                  : ''}
              </Text>
            </HStack>
          }
        </VStack>
        <Stack dir="column" spacing={1} maxW={'80%'}>
          <Text
            color={'blackAlpha.700'}
            fontSize={{ base: 'md', lg: 'lg' }}
            fontWeight={700}
          >
            {edu.fieldOfStudy}
          </Text>
          <Text>{edu.description}</Text>
        </Stack>
      </VStack>
    );
  }

  return (
    <>
      <EditEducationModal
        isOpen={isEduOpen}
        onOpen={onEduOpen}
        onClose={onEduClose}
        mode={mode}
        item={selected}
      />
      <ExpEditModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        mode={mode}
        item={selected}
      />
      <Center
        boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
        bg="white"
        w="100%"
        rounded="lg"
        flexDirection={'column'}
        justifyContent="start"
        color={useColorModeValue('white', 'blackAlpha.600')}
        gap="1rem"
        p="1.5rem"
        alignItems="start"
      >
        {userProfile.education?.length ? (
          <VStack justify="space-between" align={'start'} w="full">
            <Stack
              direction={'row'}
              justify="space-between"
              align={'start'}
              w="full"
              pb="1rem"
              role="group"
              minH="40px"
            >
              <Heading
                color={'black'}
                fontSize={{ base: 'xl', lg: '1.7rem' }}
                borderBottom="1px solid"
                borderColor={'blackAlpha.200'}
                w={{ base: '100%', md: '80%' }}
                pb={'10px'}
              >
                Education
              </Heading>
              {iconRender(
                <VscAdd size="18px" />,
                () => {
                  setMode(Mode.CREATTE);
                  setSelected(undefined);
                  onEduOpen();
                },
                'add education'
              )}
            </Stack>{' '}
            {userProfile.education?.map((edu: IEducation, index: number) =>
              educationRender(edu, index)
            )}
          </VStack>
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
            <Heading color={'black'} fontSize="xl">
              Education
            </Heading>
            <Text pb="1rem" color="blackAlpha.400" textAlign={'center'}>
              You have not added any education yet.
            </Text>
            <Box
              onClick={() => {
                setSelected(undefined);
                onEduOpen();
              }}
              as="button"
              outline="1px solid gray"
              p="0.2rem 0.6rem"
              rounded="sm"
              fontSize={'xs'}
              my="1rem"
              color="black"
            >
              Add Education
            </Box>
          </Stack>
        )}

        <Stack w="100%" direction="column">
          {userProfile.experience?.length ? (
            <>
              <Stack
                h="2.5rem"
                direction={'row'}
                alignItems="center"
                justify={'space-between'}
                role="group"
              >
                <Heading
                  color={'black'}
                  fontSize={{ base: 'xl', lg: '1.7rem' }}
                >
                  Experience
                </Heading>
                {iconRender(
                  <VscAdd size="18px" />,
                  () => {
                    setMode(Mode.CREATTE);
                    setSelected(undefined);
                    onOpen();
                  },
                  'Add experience'
                )}
              </Stack>

              <Flex
                w="100%"
                py={'1.5rem'}
                gap="0.7rem"
                wrap="wrap"
                flexDir={'column'}
                color={'black'}
                maxW="36rem"
              >
                {experience?.map((experience: IExperience, index) =>
                  experienceRender(experience, index)
                )}
              </Flex>
            </>
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
              <Heading color={'black'} fontSize="xl">
                Experience
              </Heading>
              <Text pb="1rem" color="blackAlpha.400" textAlign={'center'}>
                You have not added any experiences yet.
              </Text>
              <Box
                onClick={() => {
                  setSelected(undefined);
                  onOpen();
                }}
                as="button"
                outline="1px solid gray"
                p="0.2rem 0.6rem"
                rounded="sm"
                fontSize={'xs'}
                my="1rem"
                color="black"
              >
                Add Experience
              </Box>
            </Stack>
          )}
        </Stack>
      </Center>
    </>
  );
};

export default Education;
