import {
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { SkillLevel } from 'src/lib/enums/enums';
type Tag = {
  name: string;
  level: SkillLevel;
};
export const LevelInput = ({
  tags,
  setTags,
  level,
  setLevel,
  name,
  setName,
}: any) => {
  const deleteTag = (del: number) => {
    let newArr = tags.filter((tag: any, index: number) => index !== del);
    setTags(newArr);
  };
  return (
    <>
      <HStack wrap={'wrap'} spacing={0} gap={1}>
        {tags.map((tag: Tag, index: number) => {
          return (
            <Tag key={index} w="fit-content">
              <TagLabel>
                {tag.name} : {tag.level?.toLowerCase()}
              </TagLabel>
              <TagCloseButton onClick={() => deleteTag(index)} />
            </Tag>
          );
        })}
      </HStack>
      <InputGroup size="sm" mb={3} display="flex">
        <Select
          size="sm"
          w="fit-content"
          value={level}
          onChange={({ target }) => {
            let level = target.value as SkillLevel;
            setLevel(level);
          }}
        >
          <option value={SkillLevel.BEGINNER}>Beginner</option>
          <option value={SkillLevel.INTERMEDIATE}>Intermediate</option>
          <option value={SkillLevel.ADVANCED}>Advanced</option>
        </Select>
        <Input
          w="100px"
          size={'sm'}
          flexGrow={1}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputRightAddon
          cursor={'pointer'}
          _hover={{ bg: 'gray.200' }}
          onClick={() => {
            let newObj = { name, level };
            if (name && level) setTags([...tags, newObj]);
            setName('');
            setLevel(SkillLevel.BEGINNER);
          }}
        >
          +
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
