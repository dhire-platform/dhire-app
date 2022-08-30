import {
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Tag,
  Text,
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import React, { useCallback, useState, SyntheticEvent } from 'react';
import { useProfileStore } from 'src/app/profileStore';
import {
  IProfile,
  IProfileStore,
  skill,
  SkillLevel,
} from 'src/definitions/definitions';
import { MdDone } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi';
import { useLocalStore } from 'src/app/localStore';
import ChakraTagInput from 'src/helpers/ChakraTagInput';

const SkillsComponent = () => {
  const [hover, setHover] = useState(false);
  const { user } = useProfileStore();
  const setSkills = useProfileStore((state: any) => state.setSkills);
  const [edit, setEdit] = useState(false);
  const [tags, setTags] = useState(
    user.skills?.map((skill: any) => skill.name)
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const skillArr: string[] = user.skills?.map((skill: skill) => skill.name)!;
  const skills: string[] = skillArr;

  const handleTagsChange = useCallback(
    (_event: SyntheticEvent, tags: string[]) => {
      setTags(tags);
    },
    []
  );

  const submitHandler = () => {
    setSkills(tags);
    setEdit(false);
  };

  return (
    <Center
      shadow={'lg'}
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
      gap="1rem"
      p="1.5rem"
      alignItems="start"
      border={'1px solid'}
      color="blackAlpha.200"
    >
      {edit ? (
        <Stack color="black" w="100%" direction={'row'} align="start">
          <FormControl>
            <FormLabel htmlFor="name">
              <Stack
                h="2rem"
                w="full"
                justifyContent="space-between"
                direction={'row'}
              >
                <Heading pb="0.5rem" color={'black'} fontSize="xl">
                  Skills
                </Heading>
              </Stack>
            </FormLabel>
            <ChakraTagInput
              tags={tags}
              onTagsChange={handleTagsChange}
              //  colorScheme='red'
            />
          </FormControl>
          <IconButton
            onClick={() => submitHandler()}
            variant={'unstyled'}
            _hover={{
              bg: 'blackAlpha.100',
            }}
            p="0.1rem"
            size="sm"
            display={hover ? 'flex' : 'none'}
            alignItems="center"
            justifyContent={'center'}
            color="blackAlpha.600"
            aria-label="add experience"
            icon={<MdDone size="18px" />}
          />
        </Stack>
      ) : skills?.[0] ? (
        <>
          <Stack
            h="2rem"
            w="full"
            justifyContent="space-between"
            direction={'row'}
          >
            <Heading color={'black'} fontSize="xl">
              Skills
            </Heading>
            <IconButton
              onClick={() => setEdit(true)}
              variant={'unstyled'}
              _hover={{
                bg: 'blackAlpha.100',
              }}
              p="0.1rem"
              size="sm"
              display={hover ? 'flex' : 'none'}
              alignItems="center"
              justifyContent={'center'}
              color="blackAlpha.600"
              aria-label="add experience"
              icon={<FiEdit2 size="18px" />}
            />
          </Stack>
          <Flex
            gap="0.7rem"
            minW="100%"
            wrap="wrap"
            color={'black'}
            maxW="36rem"
          >
            {skills?.map((skill: string) => (
              <Tag
                background="blackAlpha.50"
                p="0.4rem 0.8rem"
                fontWeight={'400'}
                key={skill}
              >
                {skill}
              </Tag>
            ))}
          </Flex>
        </>
      ) : (
        <>
          <Stack
            border={'1px dashed'}
            borderColor="gray.200"
            p="3rem 1rem"
            rounded="md"
            align={'center'}
            direction={'column'}
            w="full"
          >
            <Heading
              //  p='1rem 1rem'
              //  bg='blackAlpha.200'
              rounded={'full'}
              color={'black'}
              fontSize="xl"
            >
              Skills
            </Heading>
            <Text pb="1.5rem" color="blackAlpha.400">
              Add Your Skills by editing your profile.
            </Text>
            <Box
              onClick={() => setEdit(true)}
              as="button"
              outline="1px solid gray"
              p="0.2rem 0.6rem"
              rounded="sm"
              fontSize={'xs'}
              my="1rem"
              color="black"
            >
              Add Skills
            </Box>
          </Stack>
        </>
      )}
    </Center>
  );
};

export default SkillsComponent;
