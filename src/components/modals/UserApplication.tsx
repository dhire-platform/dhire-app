import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
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
import { HiAcademicCap } from 'react-icons/hi';
import { FaUserTie } from 'react-icons/fa';
import { TbTools } from 'react-icons/tb';
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import ChakraTagInput from 'src/lib/helpers/ChakraTagInput';

const UserApplication = ({ setUserDetails }: any) => {
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
        onClick={() => setUserDetails(false)}
      />
      <VStack
        w="full"
        bg="rgba(255,255,255,0.6)"
        overflow="hidden"
        gap={'50px'}
        pb="2rem"
      >
        <Box
          w="full"
          h="100px"
          bg="linear-gradient(90deg, rgba(127, 127, 213, 0.44) 0.93%, #86A8E7 59.1%, #91EAE4 120.46%)"
        >
          <VStack pos="relative" top="50%" left={'-40%'}>
            <Box p={1} bg="white" rounded={'full'}>
              <Image
                src="https://xsgames.co/randomusers/avatar.php?g=female"
                w="100px"
                h="100px"
                borderRadius={'50%'}
              />
            </Box>
          </VStack>
        </Box>
        <VStack
          alignItems="flex-start"
          w="full"
          color={'#333'}
          p={'0px 30px 20px 30px'}
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
            <VStack alignItems={'flex-start'} spacing={0}>
              <Heading fontSize={'2rem'}>Tushar Rao</Heading>
              <Text color="#8e8e8e">Product, Design, Research</Text>
              <Text color="#A8A8A8">San Francisco Bay Area, United States</Text>
            </VStack>
            <Button rounded={'none'} w="150px">
              <HStack>
                <Icon as={AiOutlinePlus} />
                <Text as="span">Shortlist</Text>
              </HStack>
            </Button>
          </HStack>

          {/* ABOUT */}
          <VStack
            py={8}
            alignItems="flex-start"
            borderBottom="1px solid #D7D7D7"
          >
            <Heading fontWeight={600} fontSize={['1.8rem']}>
              About
            </Heading>
            <Text color="gray.500">
              {' '}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
              quas asperiores unde illum sequi repellat, officiis necessitatibus
              laborum? Dicta, nemo inventore. Iure laudantium odit autem
              nesciunt sint consequatur quas distinctio! Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Nihil quas asperiores unde
              illum sequi repellat, officiis necessitatibus laborum? Dicta, nemo
              inventore. Iure laudantium odit autem nesciunt sint consequatur
              quas distinctio!
            </Text>
          </VStack>

          <HStack
            w="full"
            alignItems={'flex-start'}
            spacing={0}
            borderBottom={'1px solid #D7D7D7'}
          >
            {/* EXPERIENCE */}
            <VStack
              alignSelf={'stretch'}
              alignItems="flex-start"
              w="40%"
              py={8}
              pr={5}
              spacing={3}
              borderRight="1px solid #D7D7D7"
            >
              <Heading fontWeight={600} fontSize={['1.8rem']}>
                Experience
              </Heading>
              <VStack>
                <HStack
                  gap={5}
                  alignItems="flex-start"
                  borderBottom="1px solid #D7D7D7"
                  py={9}
                >
                  <Icon as={FcGoogle} fontSize="4rem" />
                  <VStack alignItems={'flex-start'} spacing={5}>
                    <VStack alignItems={'flex-start'} spacing={1}>
                      <Heading fontSize={['1.5rem']}>Google</Heading>
                      <Text color={'#8e8e8e'} fontSize="md">
                        Aug 2022 - Present
                      </Text>
                    </VStack>
                    <VStack alignItems={'flex-start'} spacing={1}>
                      <Text color="gray.600" fontWeight={600}>
                        Lead UX Designer
                      </Text>
                      <Text color="blackAlpha.700" fontSize={'15px'} w={'90%'}>
                        Design full feature of batmobile autopilot. Userfloe,
                        high feadility mockup.
                      </Text>
                    </VStack>
                  </VStack>
                </HStack>
                <HStack gap={5} alignItems="flex-start" py={5}>
                  <Icon as={FcGoogle} fontSize="4rem" />
                  <VStack alignItems={'flex-start'} spacing={5}>
                    <VStack alignItems={'flex-start'} spacing={1}>
                      <Heading fontSize={['1.5rem']}>Google</Heading>
                      <Text color={'#8e8e8e'} fontSize="md">
                        Aug 2022 - Present
                      </Text>
                    </VStack>
                    <VStack alignItems={'flex-start'} spacing={1}>
                      <Text color="gray.600" fontWeight={600}>
                        Lead UX Designer
                      </Text>
                      <Text color="blackAlpha.700" fontSize={'15px'} w={'90%'}>
                        Design full feature of batmobile autopilot. Userfloe,
                        high feadility mockup.
                      </Text>
                    </VStack>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>

            <Stack w="60%">
              {/* EDUCATION */}
              <Stack
                py={8}
                px={5}
                gap={3}
                alignItems="flex-start"
                borderBottom="1px solid #D7D7D7"
              >
                <Heading fontWeight={600} fontSize={['1.8rem']}>
                  Eductaion
                </Heading>
                <Text color="gray.500">
                  CBSC Animation, AAFT Chhattisgarh, Raipur 2022.
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
                <Heading fontWeight={600} fontSize={['1.8rem']}>
                  Skills
                </Heading>
                <HStack flexWrap={'wrap'} spacing={0} gap={3}>
                  {(() => {
                    let tags = [];
                    for (let i = 0; i < 20; i++) {
                      tags.push(
                        <Tag background="blackAlpha.100" px={5} py={'5px'}>
                          <TagLabel>HTML</TagLabel>
                        </Tag>
                      );
                    }
                    return tags;
                  })()}
                </HStack>
              </Stack>

              {/* ACHIEVEMENTS */}
              <VStack px={5} py={8} pb={'50px'} alignItems="flex-start" gap={5}>
                <Heading fontWeight={600} fontSize={['1.8rem']}>
                  About
                </Heading>
                <Text color="gray.500">
                  {' '}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Nihil quas asperiores unde illum sequi repellat, officiis
                  necessitatibus laborum? Dicta, nemo inventore. Iure laudantium
                  odit autem nesciunt sint consequatur quas distinctio! Lorem
                  ipsum dolor, sit amet consectetur adipisicing elit. Nihil quas
                  asperiores unde illum sequi repellat, officiis necessitatibus
                  laborum? Dicta, nemo inventore. Iure laudantium odit autem
                  nesciunt sint consequatur quas distinctio!
                </Text>
              </VStack>
            </Stack>
          </HStack>
        </VStack>
        <HStack gap={5} w="full" justifyContent={'center'} pr={'10%'}>
          <Button w="150px">
            <HStack>
              <Icon as={AiOutlinePlus} />
              <Text as="span">Shortlist</Text>
            </HStack>
          </Button>
          <Button
            w="150px"
            bg={'red.500'}
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
