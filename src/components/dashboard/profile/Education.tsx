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
import { FiEdit2 } from 'react-icons/fi';
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

const Education = () => {
  const [hover, setHover] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEduOpen,
    onOpen: onEduOpen,
    onClose: onEduClose,
  } = useDisclosure();
  const { user, userProfile, education, updateUserProfile } = useProfileStore();
  const { experience } = userProfile;

  function experienceRender(experience: IExperience, index: number) {
    return (
      <Stack
        key={index}
        px={{ base: '0', lg: '2rem' }}
        w="100%"
        gap={[0, 5]}
        direction={'row'}
        role="group"
        pos="relative"
      >
        <IconButton
          onClick={() =>
            deleteField(
              { del: index, type: 'exp' },
              toast,
              user,
              userProfile,
              updateUserProfile
            )
          }
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
          spacing={[5, 5, 7]}
          direction={'column'}
          pb="1.5rem"
          borderBottom={
            userProfile.experience?.length === index + 1
              ? ''
              : '1px solid rgba(0,0,0,0.2)'
          }
        >
          <Stack dir="column">
            <Heading fontSize={'xl'}>{experience.company}</Heading>
            {experience.to && experience.from && (
              <HStack fontSize={'14px'} color="blackAlpha.600">
                <Text as="span">
                  {changeToMonth(new Date(experience.from))}{' '}
                </Text>
                <Text as="span" color={'black'}>
                  -
                </Text>
                <Text as="span">
                  {experience.current
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
            <Heading
              fontWeight="400"
              noOfLines={2}
              fontSize={{ base: '13px', lg: 'md' }}
              color="blackAlpha.500"
            >
              {experience.description}
            </Heading>
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
        <IconButton
          onClick={() =>
            deleteField(
              { del: index, type: 'edu' },
              toast,
              user,
              userProfile,
              updateUserProfile
            )
          }
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
        <VStack alignItems={'flex-start'}>
          <Heading
            mt={0}
            fontSize={{ base: 'lg', lg: '1.4rem' }}
            color="blackAlpha.800"
          >{`${edu.degree} , ${edu.school} ${edu.location || ''}`}</Heading>

          {edu.to && edu.from && (
            <HStack fontSize={'14px'} color="blackAlpha.600">
              <Text as="span">{changeToMonth(new Date(edu.from))} </Text>
              <Text as="span" color={'black'}>
                -
              </Text>
              <Text as="span">
                {edu.current ? 'Present' : changeToMonth(new Date(edu.to))}
              </Text>
            </HStack>
          )}
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
        w="100%"
        rounded="lg"
        flexDirection={'column'}
        justifyContent="start"
        color={useColorModeValue('white', 'blackAlpha.600')}
        gap="1rem"
        p="1.5rem"
        alignItems="start"
      >
        <VStack justify="space-between" align={'start'} w="full">
          <Stack
            direction={'row'}
            justify="space-between"
            align={'start'}
            w="full"
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
            <IconButton
              onClick={onEduOpen}
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
              aria-label="add experience"
              icon={<FiEdit2 size="18px" />}
            />
          </Stack>{' '}
          {userProfile.education?.map((edu: IEducation, index: number) =>
            educationRender(edu, index)
          )}
        </VStack>
        <Stack w="100%" direction="column">
          <Stack
            h="2.5rem"
            direction={'row'}
            alignItems="center"
            justify={'space-between'}
          >
            <Heading color={'black'} fontSize={{ base: 'xl', lg: '1.7rem' }}>
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
              display={
                hover && experience && experience.length > 0 ? 'flex' : 'none'
              }
              alignItems="center"
              justifyContent={'center'}
              color="blackAlpha.600"
              aria-label="add experience"
              icon={<VscAdd size="18px" />}
            />
          </Stack>
          <Flex
            w="100%"
            py={{ base: '1rem', lg: '2rem' }}
            gap="0.7rem"
            wrap="wrap"
            flexDir={'column'}
            color={'black'}
            maxW="36rem"
          >
            {userProfile.experience?.length ? (
              experience?.map((experience: IExperience, index) =>
                experienceRender(experience, index)
              )
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
                <Text pb="1rem" color="blackAlpha.400" textAlign={'center'}>
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
