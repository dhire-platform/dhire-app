import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import EditCompany from 'src/components/modals/EditCompany';
import PostJobModal from 'src/components/modals/PostJobModal';

export const ActionButtons = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const {
    onClose: onEditClose,
    onOpen: onEditOpen,
    isOpen: isEditOpen,
  } = useDisclosure();
  return (
    <HStack alignSelf={'flex-end'}>
      <PostJobModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <EditCompany
        isOpen={isEditOpen}
        onClose={onEditClose}
        onOpen={onEditOpen}
      />
      <Button onClick={onOpen}>Post A Job</Button>
      <Button variant={'outline'} borderColor="black" onClick={onEditOpen}>
        Edit
      </Button>
    </HStack>
  );
};
