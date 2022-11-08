import {
  Box,
  Button,
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
import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineUsers } from 'react-icons/hi';
import { TbAdjustmentsHorizontal, TbFolders } from 'react-icons/tb';
import { BiFilterAlt } from 'react-icons/bi';
import { AiOutlineBell } from 'react-icons/ai';
import { RiHandCoinLine } from 'react-icons/ri';

const HireNavBar = () => {
  const [selectedBtn, setSelectedBtn] = useState<number>(0);
  let buttons = [
    { text: 'Inbox', icon: HiOutlineMail },
    { text: 'Screen', icon: BiFilterAlt },
    { text: 'Interview', icon: HiOutlineUsers },
    { text: 'Offer', icon: RiHandCoinLine },
    { text: 'Archive', icon: TbFolders },
  ];
  function renderButton(button: { text: string; icon: any }, index: number) {
    return (
      <Button
        bg={selectedBtn !== index ? 'white' : 'black'}
        color={selectedBtn === index ? 'white' : 'black'}
        key={index}
        onClick={() => setSelectedBtn(index)}
      >
        <Icon as={button.icon} w={5} h={5} mr={2} />
        {button.text}
      </Button>
    );
  }
  return (
    <HStack w="full" justifyContent={'space-between'}>
      <HStack>
        {buttons.map((button: { text: string; icon: any }, index) => {
          return renderButton(button, index);
        })}
      </HStack>
      <HStack>
        <Button>Post a job</Button>
        <Popover>
          <PopoverTrigger>
            <Center
              bg="white"
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

export default HireNavBar;
