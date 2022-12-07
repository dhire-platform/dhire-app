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
  Tab,
  TabList,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineUsers } from 'react-icons/hi';
import { TbAdjustmentsHorizontal, TbFolders } from 'react-icons/tb';
import { BiFilterAlt } from 'react-icons/bi';
import { AiOutlineBell } from 'react-icons/ai';
import { RiHandCoinLine } from 'react-icons/ri';

const HireNavBar = ({ postJobAction }: any) => {
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
      <Tab border="none" my={2} p={0}>
        <Button
          as="div"
          bg={selectedBtn !== index ? 'white' : 'black'}
          color={selectedBtn === index ? 'white' : 'black'}
          fontSize={['12px']}
          size={{ base: 'sm', lg: 'md' }}
          key={index}
          onClick={() => setSelectedBtn(index)}
        >
          <Icon as={button.icon} w={[4, 5]} h={[4, 5]} mr={[0, 0, 2]} />
          <Text display={['none', 'none', 'block']}>{button.text}</Text>
        </Button>
      </Tab>
    );
  }
  return (
    <HStack
      w="full"
      p={2}
      pt={0}
      alignItems={'flex-end'}
      justifyContent={'space-between'}
      flexDir="column-reverse"
    >
      <TabList border="none">
        <HStack gap={[0, 2]}>
          {buttons.map((button: { text: string; icon: any }, index) => {
            return renderButton(button, index);
          })}
        </HStack>
      </TabList>
      <HStack>
        <Button size={{ base: 'sm', lg: 'md' }} onClick={postJobAction}>
          Post a job
        </Button>
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
