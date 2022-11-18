import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { IoCloseSharp } from 'react-icons/io5';
import { VscAdd } from 'react-icons/vsc';
import { useLocalStore } from 'src/app/store/local/localStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { changeToMonth } from 'src/lib/helpers/Date/changeToMonth';
import { deleteField } from './useDeleteField';
import EditProjectModal from './UserDetails/ProjectEditModal';

const Projects = () => {
  const { userProfile, user, updateUserProfile } = useProfileStore();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <EditProjectModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Center
        boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
        bg="white"
        w="100%"
        rounded="lg"
        flexDirection={'column'}
        justifyContent="start"
        gap="1rem"
        p="1.5rem"
        alignItems="start"
        border="1px solid"
        color="blackAlpha.200"
      >
        {userProfile.projects?.length ? (
          <>
            <Stack
              alignContent={'start'}
              direction={'row'}
              role="group"
              pos="relative"
              w={'100%'}
            >
              <Heading color={'black'} fontSize={{ base: 'xl', lg: '1.8rem' }}>
                Projects
              </Heading>
              <IconButton
                onClick={onOpen}
                display="flex"
                justifyContent={'center'}
                alignItems="center"
                variant={'unstyled'}
                _hover={{
                  bg: 'blackAlpha.100',
                }}
                p="0.1rem"
                size="sm"
                pos="absolute"
                top="0px"
                right="0px"
                visibility={'hidden'}
                _groupHover={{ visibility: 'visible' }}
                color="blackAlpha.600"
                aria-label="add project"
                icon={<VscAdd size="18px" />}
              />
            </Stack>
            <Flex
              gap="0.7rem"
              minW="100%"
              wrap="wrap"
              color={'black'}
              maxW="36rem"
              pl={[0, 0, 0, 5]}
              my={[2, 2, 3, 4]}
            >
              {userProfile.projects.map((project, index) => (
                <VStack
                  alignItems={'flex-start'}
                  spacing={[0]}
                  key={index}
                  role="group"
                  pos="relative"
                  w="100%"
                  py={'10px'}
                  borderBottom={
                    userProfile.projects?.length === index + 1
                      ? ''
                      : '1px solid rgba(0,0,0,0.2)'
                  }
                >
                  <IconButton
                    onClick={() =>
                      deleteField(
                        { del: index, type: 'project' },
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
                    aria-label="delete project"
                    icon={<IoCloseSharp size="18px" />}
                  />
                  <Heading
                    fontSize={{ base: 'lg', lg: '1.4rem' }}
                    color="blackAlpha.800"
                  >
                    {project.title}
                  </Heading>
                  <HStack
                    fontSize={{ base: '12px', lg: '14px' }}
                    color="blackAlpha.600"
                  >
                    <Text as="span">
                      {changeToMonth(new Date(project.from))}{' '}
                    </Text>
                    <Text as="span" color={'black'}>
                      -
                    </Text>
                    <Text as="span">
                      {project.current
                        ? 'Present'
                        : changeToMonth(new Date(project.to))}
                    </Text>
                  </HStack>

                  <Text
                    color={'blackAlpha.700'}
                    fontSize={{ base: '12px', lg: '14px' }}
                  >
                    {project.link}
                  </Text>

                  <Text
                    my={{ base: '5px !important', lg: '15px !important' }}
                    fontWeight="400"
                    noOfLines={2}
                    fontSize={{ base: '12px', lg: '14px' }}
                    color="blackAlpha.700"
                    w={{ base: '80%', sm: '100%', lg: '80%' }}
                  >
                    {project.description}
                  </Text>
                </VStack>
              ))}
            </Flex>
          </>
        ) : (
          <>
            <Stack
              border={'1px dashed'}
              borderColor="blackAlpha.400"
              p="3rem 1rem"
              rounded="md"
              align={'center'}
              direction={'column'}
              w="full"
            >
              <Heading color={'black'} fontSize="xl">
                Projects
              </Heading>
              <Text pb="1.5rem" color="blackAlpha.400" textAlign={'center'}>
                You have not added any Projects yet.
              </Text>
              <Box
                onClick={onOpen}
                as="button"
                outline="1px solid gray"
                p="0.2rem 0.6rem"
                rounded="sm"
                fontSize={'xs'}
                my="1rem"
                color="black"
              >
                Add Projects
              </Box>
            </Stack>
          </>
        )}
      </Center>
    </>
  );
};

export default Projects;
