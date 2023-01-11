import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BiArrowBack, BiNotepad } from 'react-icons/bi';
import {
  BsFillBriefcaseFill,
  BsHourglassSplit,
  BsTrophy,
} from 'react-icons/bs';
import { HiAcademicCap, HiLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { FaUserTie } from 'react-icons/fa';
import { TbTools } from 'react-icons/tb';
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import ChakraTagInput from 'src/lib/helpers/ChakraTagInput';
import { UserProfile } from '@/interfaces/response.interface';
import { changeToMonth } from 'src/lib/helpers/Date/changeToMonth';
import { BsGithub, BsLink } from 'react-icons/bs';
import { IExperience } from '@/interfaces/store/data/experience.interface';
import { IProject } from '@/interfaces/store/data/projects.interface';
import { ImCross } from 'react-icons/im';
const socials = {
  link: <BsLink color="rgba(0,0,0,0.6)" size="18px" />,
  github: <BsGithub color="rgba(0,0,0,0.6)" size="18px" />,
};
const renderExp = (exp: IExperience, i: number) => {
  return (
    <HStack
      key={i}
      gap={[0, 5]}
      alignItems="flex-start"
      borderBottom="1px solid #D7D7D7"
      py={[5, 9]}
    >
      <Avatar
        size={['lg', 'lg']}
        name={exp.company}
        colorScheme="blue"
        src={exp.image}
      />
      <VStack alignItems={'flex-start'} spacing={[3, 5]}>
        <VStack alignItems={'flex-start'} spacing={[0, 1]}>
          <Heading fontSize={['lg', '1.5rem']}>{exp.company}</Heading>
          {exp.location && (
            <HStack
              color="#A8A8A8"
              fontSize={{ base: '12px', lg: '14px' }}
              spacing={0}
            >
              <Icon
                as={HiLocationMarker}
                fontSize="18px"
                mr={1}
                display={{ base: 'none', md: 'block' }}
              />
              <Text>{exp.location}</Text>
            </HStack>
          )}
          <HStack
            fontSize={{ base: '12px', lg: '14px' }}
            color="blackAlpha.600"
          >
            <Text as="span">{changeToMonth(new Date(exp.from || ''))} </Text>
            <Text as="span" color={'black'}>
              -
            </Text>
            <Text as="span">
              {exp.current ? 'Current' : changeToMonth(new Date(exp.to || ''))}
            </Text>
          </HStack>
        </VStack>
        <VStack alignItems={'flex-start'} spacing={1} fontSize={['sm', 'md']}>
          <Text color="gray.600" fontWeight={600}>
            {exp.designation}
          </Text>
          <Text color="blackAlpha.700" w={{ lg: '90%' }}>
            {exp.description}
          </Text>
        </VStack>
      </VStack>
    </HStack>
  );
};

const UserApplication = ({
  setUserDetails,
  userDetails,
}: {
  setUserDetails: any;
  userDetails?: UserProfile;
}) => {
  return (
    <>
      <Icon
        pos={'absolute'}
        top={'10px'}
        left={'10px'}
        fontSize="2rem"
        cursor="pointer"
        color={'white'}
        as={BiArrowBack}
        onClick={() => setUserDetails(undefined)}
      />
      <VStack
        w="full"
        bg="rgba(255,255,255,0.6)"
        overflow="hidden"
        gap={['30px', '50px']}
        pb="2rem"
      >
        <Box
          w="full"
          h="100px"
          bg="linear-gradient(90deg, rgba(127, 127, 213, 0.44) 0.93%, #86A8E7 59.1%, #91EAE4 120.46%)"
        >
          <VStack
            pos="relative"
            top="50%"
            alignItems={'flex-start'}
            px={['10px', '30px']}
          >
            <Box p={1} bg="white" rounded={'full'}>
              {/* <Image
                src="https://xsgames.co/randomusers/avatar.php?g=female"
                w={['80px', '100px']}
                h={['80px', '100px']}
                borderRadius={'50%'}
              /> */}
              <Avatar
                size={['lg', 'xl']}
                name={userDetails?.user?.name}
                colorScheme="blue"
                src={userDetails?.image}
              />
            </Box>
          </VStack>
        </Box>
        <VStack
          alignItems="flex-start"
          w="full"
          color={'#333'}
          px={['10px', '30px']}
          pb={[0, '20px']}
          spacing={0}
        >
          {/* NAME, LOCATION */}
          <HStack
            justifyContent={'space-between'}
            alignItems="flex-end"
            w="full"
            pb={5}
            borderBottom="1px solid #D7D7D7"
          >
            <VStack
              alignItems={'flex-start'}
              spacing={0}
              fontSize={['13px', 'md']}
            >
              <Heading fontSize={['1.7rem', '2rem']}>
                {userDetails?.user?.name}
              </Heading>
              <HStack color="#8e8e8e">
                <Icon as={HiOutlineMail} fontSize="20px" />
                <Text>{userDetails?.email || '----'}</Text>
              </HStack>
              {userDetails?.location && (
                <HStack color="#A8A8A8">
                  <Icon as={HiLocationMarker} fontSize="20px" />
                  <Text>{userDetails?.location}</Text>
                </HStack>
              )}
            </VStack>
            <Button rounded={'none'} w={['110px', '150px']} size={['sm', 'md']}>
              <HStack as="span">
                <Icon as={AiOutlinePlus} />
                <Text as="span" fontSize={['13px', '1rem']}>
                  Shortlist
                </Text>
              </HStack>
            </Button>
          </HStack>

          {/* ABOUT */}
          <VStack
            py={8}
            alignItems="flex-start"
            w="full"
            borderBottom="1px solid #D7D7D7"
          >
            <Heading fontWeight={600} fontSize={['22px', '25px', '1.8rem']}>
              About
            </Heading>
            <Text color="gray.500" fontSize={['sm', 'md']}>
              {' '}
              {userDetails?.bio}
            </Text>
          </VStack>

          <HStack
            w="full"
            flexDir={{ base: 'column', lg: 'row' }}
            alignItems={'flex-start'}
            spacing={0}
            borderBottom={'1px solid #D7D7D7'}
          >
            {/* EXPERIENCE */}
            <VStack
              alignSelf={'stretch'}
              alignItems="flex-start"
              w={{ base: 'full', lg: '40%' }}
              py={[5, 8]}
              pr={5}
              spacing={0}
              borderRight={{ lg: '1px solid #D7D7D7' }}
            >
              <Heading fontWeight={600} fontSize={['22px', '25px', '1.8rem']}>
                Experience
              </Heading>
              <VStack w="full" minH="full">
                {userDetails?.experience?.map((exp, i) => renderExp(exp, i))}
                {!userDetails?.experience?.length && (
                  <VStack color={'blackAlpha.400'} m="auto">
                    <Icon as={ImCross} w="60px" h="60px" />
                    <Heading fontSize={'1.4rem'}>no experience</Heading>
                  </VStack>
                )}
              </VStack>
            </VStack>

            <Stack w={{ base: 'full', md: '60%' }}>
              {/* EDUCATION */}
              <Stack
                py={8}
                pt={[0, 8]}
                px={5}
                gap={3}
                alignItems="flex-start"
                borderBottom="1px solid #D7D7D7"
              >
                <Heading fontWeight={600} fontSize={['22px', '25px', '1.8rem']}>
                  Achievements
                </Heading>
                <Text color="gray.500" fontSize={['sm', 'md']}>
                  {userDetails?.achievement || (
                    <Text as="span" color="#8e8e8e">
                      No achievement
                    </Text>
                  )}
                </Text>
              </Stack>

              {/* SKILLS */}
              <Stack
                py={5}
                pb={'50px'}
                px={5}
                gap={5}
                alignItems="flex-start"
                borderBottom="1px solid #D7D7D7"
              >
                <Heading fontWeight={600} fontSize={['22px', '25px', '1.8rem']}>
                  Skills
                </Heading>
                <HStack flexWrap={'wrap'} spacing={0} gap={3}>
                  {userDetails?.skills?.map((skill, i) => (
                    <Tag key={i} background="blackAlpha.100" px={3} py={'5px'}>
                      <TagLabel fontSize={['12px', '15px']}>
                        {skill.level[0] + skill.level.slice(1).toLowerCase()}:{' '}
                        {skill.name}
                      </TagLabel>
                    </Tag>
                  ))}
                  {!userDetails?.skills?.length && (
                    <Text color="#8e8e8e">No skill</Text>
                  )}
                </HStack>
              </Stack>

              {/* ACHIEVEMENTS */}
              <VStack
                px={5}
                py={[5, 8]}
                pb={'50px'}
                alignItems="flex-start"
                gap={5}
              >
                <Heading fontWeight={600} fontSize={['22px', '25px', '1.8rem']}>
                  Projects
                </Heading>
                <VStack>
                  {userDetails?.projects?.map((project, i) => (
                    <VStack
                      alignItems={'flex-start'}
                      spacing={1}
                      key={i}
                      role="group"
                      pos="relative"
                      w="100%"
                      py={'10px'}
                      borderBottom={
                        userDetails.projects?.length === i + 1
                          ? ''
                          : '1px solid rgba(0,0,0,0.2)'
                      }
                    >
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
                          {changeToMonth(new Date(project.from || ''))}{' '}
                        </Text>
                        <Text as="span" color={'black'}>
                          -
                        </Text>
                        <Text as="span">
                          {project.current
                            ? 'Current'
                            : changeToMonth(new Date(project.to || ''))}
                        </Text>
                      </HStack>
                      <Text
                        my={{ base: '5px !important', lg: '15px !important' }}
                        fontWeight="400"
                        noOfLines={3}
                        fontSize={{ base: '12px', lg: '14px' }}
                        color="blackAlpha.700"
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
                  {!userDetails?.projects?.length && (
                    <Text color="#8e8e8e">No project</Text>
                  )}
                </VStack>
              </VStack>
            </Stack>
          </HStack>
        </VStack>
        <HStack
          gap={5}
          w="full"
          justifyContent={'center'}
          pr={{ base: 0, md: '10%' }}
        >
          <Button w={['110px', '150px']} size={['sm', 'md']}>
            <HStack>
              <Icon as={AiOutlinePlus} />
              <Text as="span">Shortlist</Text>
            </HStack>
          </Button>
          <Button
            w={['110px', '150px']}
            bg={'red.500'}
            size={['sm', 'md']}
            _hover={{
              bg: 'red.400',
              transform: 'translateY(-0.1rem)',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <HStack>
              <Icon as={AiOutlineMinus} />
              <Text as="span">Reject</Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
    </>
  );
};
export default UserApplication;
