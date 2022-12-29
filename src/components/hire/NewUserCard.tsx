import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { IUsers } from '@/interfaces/store/data/user.interface';

type userCardProps = { key_index: number; user: IUsers };
export const NewUserCard = ({ key_index, user }: userCardProps) => {
  return (
    <Center
      key={key_index}
      boxShadow="0px 35px 41px 10px rgba(0, 0, 0, 0.03)"
      bg={'white'}
      w="300px"
      rounded="lg"
      flexDirection={'column'}
      p="1.5rem"
      alignItems={'flex-end'}
      border="1px solid"
      borderColor={'blackAlpha.200'}
      color={'black'}
      justifyContent="space-between"
    >
      <Stack direction={'row'} justify="space-between" align={'start'} w="full">
        <Stack direction={'row'} gap="0.7rem" w="full">
          <Avatar
            size="lg"
            name={user?.name}
            colorScheme="blue"
            src={user.UserProfile[0]?.image}
          />
          <Stack
            spacing={0}
            justifyContent={'center'}
            align="start"
            w="full"
            direction={'column'}
          >
            <Heading color={'black'} fontSize="xl">
              {user?.name}{' '}
            </Heading>

            <Text color="blackAlpha.500" as="span">
              @{user?.username}
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Flex mt={4} w="full" wrap={'wrap'} gap={2}>
        {user.UserProfile[0]?.skills?.map((skill, index) => (
          <Tag key={index} fontSize={'13px'}>
            {skill.name}
          </Tag>
        ))}
      </Flex>
      <Heading
        fontWeight="400"
        fontSize={{ base: '14px', lg: '15px' }}
        noOfLines={3}
        color={'blackAlpha.800'}
        w="100%"
        maxW="36rem"
        mt={user.UserProfile[0]?.bio && '1rem'}
      >
        {user.UserProfile[0]?.bio}
      </Heading>
      <Box mt="20px">
        <WalletMultiButton
          style={{
            background: 'transparent',
            color: 'black',
            border: '1px solid black',
          }}
        >
          Hire
        </WalletMultiButton>
      </Box>
    </Center>
  );
};
