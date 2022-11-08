import { Button, HStack } from '@chakra-ui/react';

export const ActionButtons = () => {
  return (
    <HStack alignSelf={'flex-end'}>
      <Button>Post A Job</Button>
      <Button variant={'outline'} borderColor="black">
        Edit
      </Button>
    </HStack>
  );
};
