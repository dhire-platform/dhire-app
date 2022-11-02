import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { HiOutlineMail, HiOutlineUsers } from 'react-icons/hi';
import { TbAdjustmentsHorizontal, TbFolders } from 'react-icons/tb';
import { BiFilterAlt } from 'react-icons/bi';
import { AiOutlineBell } from 'react-icons/ai';
import { RiHandCoinLine } from 'react-icons/ri';

const NavBar = () => {
  let buttons = [
    { text: 'Inbox', icon: HiOutlineMail },
    { text: 'Screen', icon: BiFilterAlt },
    { text: 'Interview', icon: HiOutlineUsers },
    { text: 'Offer', icon: RiHandCoinLine },
    { text: 'Archive', icon: TbFolders },
  ];
  function renderButton(button: { text: string; icon: any }) {
    return (
      <Center
        as="button"
        bg="white"
        py={2}
        px={3}
        borderRadius="10px"
        fontWeight={500}
        _hover={{
          color: 'white',
          background: 'black',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <Icon as={button.icon} w={5} h={5} mr={2} />
        {button.text}
      </Center>
    );
  }
  return (
    <HStack w="full" justifyContent={'space-between'}>
      <HStack>
        {buttons.map((button: { text: string; icon: any }) => {
          return renderButton(button);
        })}
      </HStack>
      <HStack>
        <Center
          bg="rgba(255,255,255,0.6)"
          fontWeight={500}
          p={2}
          borderRadius="10px"
          as="button"
        >
          Post a job
        </Center>
        <Center
          bg="rgba(255,255,255,0.6)"
          fontWeight={500}
          p={2}
          borderRadius="10px"
          as="button"
        >
          <Icon as={TbAdjustmentsHorizontal} w={6} h={6} />
        </Center>
        <Popover>
          <PopoverTrigger>
            <Center
              bg="rgba(255,255,255,0.6)"
              fontWeight={500}
              p={2}
              borderRadius="10px"
              as="button"
            >
              <Icon as={AiOutlineBell} w={6} h={6} />
            </Center>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                <Text fontWeight={500}>Notifications</Text>
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <VStack>
                  <HStack>
                    <Image
                      src="https://xsgames.co/randomusers/avatar.php?g=female"
                      w="40px"
                      h="40px"
                      borderRadius={'50%'}
                    />
                    <Text display="inline-block" fontSize="14px">
                      <Text as="span" fontWeight={600} color="black">
                        Kia Antonoc
                      </Text>{' '}
                      applied for a job you posted.
                    </Text>
                    <Text fontSize="10px">1 day ago</Text>
                  </HStack>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>
    </HStack>
  );
};

export default NavBar;
