import {
  Avatar,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Wrap,
  Tag,
  Divider,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useAuthStore } from 'src/app/authStore';
import { Redirect } from 'src/helpers/Redirect';

const Profile = () => {
  const isAuth = useAuthStore((state: any) => state.isAuth);
  if (!isAuth) {
    Redirect('/');
  }
  return (
    <Container
      maxW='full'
      py='5rem'
      bg={useColorModeValue('white', 'black')}
      color={useColorModeValue('black', 'white')}
      px='0'
    >
      <Container p='1rem' maxW='8xl' my='2rem'>
        <Flex
          bg={useColorModeValue('white', 'black')}
          h='clamp(54rem,150vh, 55rem)'
          gap='2rem'
          flexWrap={'wrap'}
          alignItems='center'
          alignContent={'center'}
          justifyContent={'top'}
          flexDirection='column'
        >
          <Center
            bg={useColorModeValue('white', 'blackAlpha.600')}
            w='clamp(16rem, 42vw, 36rem)'
            rounded='lg'
            flexDirection={'column'}
            gap='1rem'
            p='1.5rem'
            alignItems='start'
            border='1px solid'
            borderColor={'gray.100'}
            color={useColorModeValue('black', 'white')}
          >
            <Stack direction={'row'}>
              <Avatar size='lg' />
              <Stack direction={'column'}>
                <Heading
                  color={useColorModeValue('black', 'white')}
                  fontSize='xl'
                >
                  Irfan Asif
                </Heading>
                <Text color='gray.400'>UI/UX Designer</Text>
              </Stack>
            </Stack>
            <Text
              color={useColorModeValue('black', 'white')}
              w='100%'
              maxW='36rem'
            >
              Experienced UI/UX Designer with a strong bachground with
              marketing, Communication and psychology.
            </Text>
          </Center>
          <Center
            w='clamp(16rem, 42vw, 36rem)'
            rounded='lg'
            flexDirection={'column'}
            justifyContent='start'
            color={useColorModeValue('white', 'blackAlpha.600')}
            gap='1rem'
            p='1.5rem'
            alignItems='start'
            border='1px solid'
            borderColor={'gray.100'}
          >
            <Stack alignContent={'start'} direction={'column'}>
              <Heading
                color={useColorModeValue('black', 'white')}
                fontSize='xl'
              >
                Education
              </Heading>
              <Text color='gray.500'>
                CBSC Animation, AAFT Chhattisgarh, Raipur 2022.
              </Text>
            </Stack>{' '}
            <Divider />
            <Heading color={useColorModeValue('black', 'white')} fontSize='xl'>
              Experience
            </Heading>
            <Flex
              py='1rem'
              gap='0.7rem'
              minW='100%'
              wrap='wrap'
              color={useColorModeValue('black', 'white')}
              maxW='36rem'
            >
              <Stack direction={'row'}>
                <Avatar
                  src='http://logok.org/wp-content/uploads/2015/09/Google-logo-2015-G-icon-1024x768.png'
                  size='md'
                  bg='white'
                />
                <Stack direction={'column'}>
                  <Heading fontSize={'xl'}>Google</Heading>
                  <Text fontSize='md'>Aug 2022, Present</Text>
                  <Divider />
                  <Heading fontSize={'lg'}>Lead UX Designer</Heading>
                  <Text fontSize={'sm'} color='gray.500'>
                    Design full feature of batmobile autopilot. Userfloe, high
                    feadility mockup.
                  </Text>
                </Stack>
              </Stack>
              <Stack direction={'row'}>
                <Avatar
                  src='http://logok.org/wp-content/uploads/2015/09/Google-logo-2015-G-icon-1024x768.png'
                  size='md'
                  bg='white'
                />
                <Stack direction={'column'}>
                  <Heading fontSize={'xl'}>Google</Heading>
                  <Text fontSize='md'>Aug 2022, Present</Text>
                  <Divider />
                  <Heading fontSize={'lg'}>Lead UX Designer</Heading>
                  <Text fontSize={'sm'} color='gray.500'>
                    Design full feature of batmobile autopilot. Userfloe, high
                    feadility mockup.
                  </Text>
                </Stack>
              </Stack>
            </Flex>
          </Center>
          <Center
            w='clamp(16rem, 42vw, 36rem)'
            rounded='lg'
            flexDirection={'column'}
            justifyContent='start'
            gap='1rem'
            p='1.5rem'
            alignItems='start'
            border='1px solid'
            color='gray.200'
          >
            <Stack alignContent={'start'} direction={'row'}>
              <Heading
                color={useColorModeValue('black', 'white')}
                fontSize='xl'
              >
                Skills
              </Heading>
            </Stack>
            <Flex
              gap='0.7rem'
              minW='100%'
              wrap='wrap'
              color={useColorModeValue('black', 'white')}
              maxW='36rem'
            >
              <Tag p='0.5rem'>UI/UX</Tag>
              <Tag>UX Research</Tag>
              <Tag>Responsive Web Design</Tag>
              <Tag>Mobile Design</Tag>
              <Tag>Wireframing</Tag>
              <Tag>Branding</Tag>
              <Tag>Web UI</Tag>
              <Tag>Graphics Design</Tag>
            </Flex>
          </Center>
          <Center
            w='clamp(16rem, 42vw, 36rem)'
            rounded='lg'
            flexDirection={'column'}
            justifyContent='start'
            gap='1rem'
            p='1.5rem'
            alignItems='start'
            border='1px solid'
            color='gray.200'
          >
            <Stack alignContent={'start'} direction={'row'}>
              <Heading
                color={useColorModeValue('black', 'white')}
                fontSize='xl'
              >
                Achievement
              </Heading>
            </Stack>
            <Flex
              gap='0.7rem'
              minW='100%'
              wrap='wrap'
              color={useColorModeValue('black', 'white')}
              maxW='36rem'
            >
              <Text>
                I am flexible, reliable and possess excellent time keeping
                skills. I am an enthusiastic, self-motivated, reliable,
                responsible and hard working person. I am a mature team worker
                and adaptable to all challenging situations. I am able to work
                well both in a team environment as well as using own initiative.
              </Text>
            </Flex>
          </Center>
          <Center
            w='clamp(16rem, 42vw, 36rem)'
            rounded='lg'
            flexDirection={'column'}
            justifyContent='start'
            gap='1rem'
            p='1.5rem'
            alignItems='start'
            border='1px solid'
            color='gray.200'
          >
            <Heading color={useColorModeValue('black', 'white')} fontSize='xl'>
              Experience
            </Heading>
            <Flex
              py='1rem'
              gap='0.7rem'
              minW='100%'
              wrap='wrap'
              color={useColorModeValue('black', 'white')}
              maxW='36rem'
            >
              <Stack direction={'row'}>
                <Avatar
                  src='http://logok.org/wp-content/uploads/2021/11/Facebook-Logo-2019-1536x1152.png'
                  size='md'
                  bg='white'
                />
                <Stack direction={'column'}>
                  <Heading fontSize={'xl'}>Facebook</Heading>
                  <Text fontSize='md'>Aug 2022, Present</Text>
                  <Divider />
                  <Heading fontSize={'lg'}>Frontend Developer</Heading>
                  <Text fontSize={'sm'} color='gray.500'>
                    Design full feature of batmobile autopilot. Userfloe, high
                    feadility mockup.
                  </Text>
                </Stack>
              </Stack>
              <Stack direction={'row'}>
                <Avatar
                  src='http://logok.org/wp-content/uploads/2021/11/Facebook-Logo-2019-1536x1152.png'
                  size='md'
                  bg='white'
                />
                <Stack direction={'column'}>
                  <Heading fontSize={'xl'}>FAcebook</Heading>
                  <Text fontSize='md'>Aug 2022, Present</Text>
                  <Divider />
                  <Heading fontSize={'lg'}>Lead UX Designer</Heading>
                  <Text fontSize={'sm'} color='gray.500'>
                    Design full feature of batmobile autopilot. Userfloe, high
                    feadility mockup.
                  </Text>
                </Stack>
              </Stack>
            </Flex>
          </Center>
        </Flex>
      </Container>
    </Container>
  );
};

export default Profile;
