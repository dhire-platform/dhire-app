import { Textarea } from '@chakra-ui/react';

export const ListTextArea = ({
  text,
  setText,
}: {
  text?: string;
  setText: any;
}) => {
  //console.log(text.reduce((a, b) => '\n\u2022 ' + a + '\n\u2022 ' + b));
  console.log(text);
  return (
    <Textarea
      id="description"
      value={text}
      h={{ base: '120px', md: '150px' }}
      onKeyPress={(e: any) => {
        if (!e.target.value) {
          e.target.value = '\u2022 ';
        }
        if (e.charCode === 13) {
          e.preventDefault();
          e.target.value += '\n\u2022 ';
          console.log(e.target.value);
        }
      }}
    />
  );
};
