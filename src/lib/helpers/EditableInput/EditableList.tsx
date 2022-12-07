import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
export const EditableList = ({
  list,
  setList,
}: {
  list: string[];
  setList: any;
}) => {
  const [newListItem, setNewListItem] = useState<string>();
  const btn = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <InputGroup size="sm" mb={3} display="flex">
        <Input
          w="100px"
          size={'sm'}
          flexGrow={1}
          value={newListItem}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              e.preventDefault();
              btn.current?.click();
            }
          }}
          onChange={(e) => setNewListItem(e.target.value)}
        />
        <InputRightAddon
          ref={btn}
          _hover={{ bg: 'gray.200' }}
          onClick={(e) => {
            console.log('click');
            if (newListItem?.trim()) {
              list?.length
                ? setList([...list, newListItem?.trim()])
                : setList([newListItem.trim()]);
              setNewListItem('');
            }
          }}
        >
          +
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
