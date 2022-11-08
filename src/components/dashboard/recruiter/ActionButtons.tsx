import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import PostJobModal from 'src/components/modals/PostJobModal';

export const ActionButtons = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  return (
    <HStack alignSelf={'flex-end'}>
      <PostJobModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Button onClick={onOpen}>Post A Job</Button>
      <Button variant={'outline'} borderColor="black">
        Edit
      </Button>
    </HStack>
  );
};
