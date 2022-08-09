import {
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FiChevronDown, FiLogOut } from 'react-icons/fi';
import { useAuthStore } from 'src/app/authStore';

const DashboardNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isAuth = useAuthStore((state: any) => state.isAuth);
  return (
    <Container
      color={useColorModeValue('black', 'white')}
      bg={useColorModeValue('white', 'blackAlpha.800')}
      zIndex={'999'}
      position={'fixed'}
      filter={'blur(100)'}
      borderBottom='1px solid'
      borderColor={'gray.100'}
      p='0'
      maxW='full'
    >
      <Stack
        maxW={'8xl'}
        mx='auto'
        direction={'row'}
        align={'center'}
        justifyContent='space-between'
        p='1rem 2rem'
      >
        <Center>
          <Heading fontSize='2xl'>dhire.</Heading>
        </Center>
        <Center gap='2rem' fontSize={'18px'} flexDirection='row'>
          <Box as='button' fontWeight='600'>
            <Link href={'/dashboard'}>Dashboard</Link>
          </Box>
          <Box as='button' fontWeight='600'>
            <Link href='/profile'>Profile</Link>
          </Box>
        </Center>
        <Stack direction='row' align='center'>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FiChevronDown />}
              _hover={{ transform: 'translateY(0)' }}
              _active={{ transform: 'translateY(0)' }}
            >
              4lsda.....lksdf
            </MenuButton>
            <MenuList>
              {/* <MenuItem>New File</MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuDivider /> */}
              <MenuItem>
                <Stack
                  w='full'
                  direction={'row'}
                  justifyContent='space-between'
                >
                  <Text>Dark Mode</Text>
                  <Center pr='1rem'>
                    <Switch onChange={() => toggleColorMode()} />
                  </Center>
                </Stack>
              </MenuItem>
              <MenuItem>
                <Stack
                  w='full'
                  direction={'row'}
                  justifyContent='space-between'
                >
                  <Text>Sign out</Text>
                  <Center pr='1rem'>
                    {/* <FiLogOut width='18' height='18' /> */}
                  </Center>
                </Stack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DashboardNavbar;
