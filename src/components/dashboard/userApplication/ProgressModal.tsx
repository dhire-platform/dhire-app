import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

const ProgressModal = ({ isOpen, onOpen, onClose, job }: any) => {
  const renderCircle = (text: string, full: boolean) => {
    return full ? (
      <Box
        w="20px"
        h="20px"
        rounded="full"
        bg="red.500"
        pos="relative"
        _before={{
          content: `"${text}"`,
          pos: 'absolute',
          w: 'max-content',
          bottom: '130%',
          left: '-100%',
          fontSize: { base: '13px', xl: 'md' },
        }}
      />
    ) : (
      <Box
        w="20px"
        h="20px"
        rounded="full"
        border="2px solid red"
        borderColor="red.500"
        pos="relative"
        _before={{
          content: `"${text}"`,
          w: 'max-content',
          pos: 'absolute',
          bottom: '130%',
          left: '-100%',
          fontSize: { base: '13px', xl: 'md' },
        }}
      />
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent
        p="1rem"
        pb="2rem"
        maxW="8xl"
        w={{ base: '90vw', sm: '80vw' }}
      >
        <ModalHeader fontWeight={'700'} textAlign="center">
          <Heading
            w="50%"
            minW="300px"
            mx="auto"
            px={'2rem'}
            pb="15px"
            fontSize={{ base: 'md', md: 'xl', xl: '1.7rem' }}
            borderBottom={'1px solid black'}
            borderBottomColor="blackAlpha.300"
          >
            Track your Application
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <HStack p={'1.5rem'} gap={3}>
              <Box pt={1}>
                <Avatar
                  name={job?.title || 'google'}
                  size={'md'}
                  colorScheme={'black'}
                />
              </Box>
              <VStack alignItems={'flex-start'} spacing={1}>
                <Heading fontSize={'xl'} fontWeight={600}>
                  {job?.title}
                </Heading>
                <Heading
                  fontSize={'15px'}
                  fontWeight={500}
                  color="blackAlpha.600"
                >
                  {job?.company.name}, {job?.location}
                </Heading>
              </VStack>
            </HStack>
          </VStack>
          <HStack
            display={{ base: 'none', md: 'flex' }}
            w="full"
            px="2rem"
            gap={0}
            spacing={1}
            my={'4rem'}
          >
            {renderCircle('Applied', true)}
            <Box border={'2px solid red'} borderColor="red.300" flex={1} />
            {renderCircle('Application Seen', false)}
            <Box border={'2px solid red'} borderColor="red.300" flex={1} />
            {renderCircle('Shortlisted', false)}
            <Box border={'2px solid red'} borderColor="red.300" flex={1} />
            {renderCircle('Interview', false)}
            <Box border={'2px solid red'} borderColor="red.300" flex={1} />
            {renderCircle('Status Review', false)}
            <Box border={'2px solid red'} borderColor="red.300" flex={1} />
            {renderCircle('Hired', false)}
          </HStack>
          <VStack my="4rem" display={{ base: 'flex', md: 'none' }}>
            <HStack alignItems={'flex-start'} w="full">
              <HStack w="full">
                {renderCircle('Applied', true)}
                <Box border={'2px solid red'} borderColor="red.300" flex={1} />
                {renderCircle('Application Seen', false)}
                <Box border={'2px solid red'} borderColor="red.300" flex={1} />
              </HStack>
              <VStack>
                {renderCircle('Shortlisted', false)}
                <Box
                  border={'2px solid red'}
                  borderColor="red.300"
                  h={'50px'}
                  mt="10px !important"
                />
              </VStack>
            </HStack>
            <HStack w="full">
              {renderCircle('Hired', false)}
              <Box border={'2px solid red'} borderColor="red.300" flex={1} />
              {renderCircle('Status Review', false)}
              <Box border={'2px solid red'} borderColor="red.300" flex={1} />
              {renderCircle('Interview', false)}
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ProgressModal;
