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
  Link,
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
import { useState, useEffect } from 'react';
import { useLocalStore } from 'src/app/store/local/localStore';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import { changeToMonth } from 'src/lib/helpers/Date/changeToMonth';
import { deleteField } from './useDeleteField';
import EditProjectModal from './UserDetails/ProjectEditModal';
import { Mode } from 'src/lib/enums/enums';
import { FiEdit2 } from 'react-icons/fi';
import { BsGithub, BsLink } from 'react-icons/bs';
const socials = {
  link: <BsLink color="rgba(0,0,0,0.6)" size="18px" />,
  github: <BsGithub color="rgba(0,0,0,0.6)" size="18px" />,
};
const Projects = () => {
  const { userProfile, user, updateUserProfile } = useProfileStore();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState<Mode>();
  const [selected, setSelected] = useState<any>();
  const toast = useToast();
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
  return (
    <>
      <EditProjectModal
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
              justifyContent="space-between"
            >
              <Heading color={'black'} fontSize={{ base: 'xl', lg: '1.8rem' }}>
                Projects
              </Heading>
              {iconRender(
                <VscAdd size="18px" />,
                () => {
                  setMode(Mode.CREATTE);
                  onOpen();
                },
                'add Project'
              )}
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
              {userProfile.projects?.map((project, index) => (
                <VStack
                  alignItems={'flex-start'}
                  spacing={1}
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
                  <HStack
                    flexDir={'row-reverse'}
                    justifyContent="space-between"
                    spacing={0}
                    w="full"
                  >
                    <HStack>
                      {iconRender(
                        <FiEdit2 size="18px" />,
                        () => {
                          setMode(Mode.EDIT);
                          setSelected(project);
                          onOpen();
                        },
                        'edit project'
                      )}
                      {iconRender(
                        <IoCloseSharp size="18px" />,
                        () =>
                          deleteField(
                            { del: index, type: 'project' },
                            toast,
                            user,
                            userProfile,
                            updateUserProfile
                          ),
                        'Delete project'
                      )}
                    </HStack>
                    <Heading
                      fontSize={{ base: 'lg', lg: '1.4rem' }}
                      color="blackAlpha.800"
                    >
                      {project.title}
                    </Heading>
                  </HStack>
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
                        ? 'Current'
                        : changeToMonth(new Date(project.to))}
                    </Text>
                  </HStack>
                  <Text
                    my={{ base: '5px !important', lg: '15px !important' }}
                    fontWeight="400"
                    noOfLines={3}
                    fontSize={{ base: '12px', lg: '14px' }}
                    color="blackAlpha.700"
                    w={{ base: '80%', sm: '100%', lg: '80%' }}
                  >
                    {project.description}
                  </Text>
                  <HStack wrap={'wrap'}>
                    {project.link?.map((link, i) => {
                      return (
                        <Link href={link} key={i} isExternal>
                          {link.includes('github')
                            ? socials.github
                            : socials.link}
                        </Link>
                      );
                    })}
                  </HStack>
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
