import {
  Box,
  Center,
  Checkbox,
  CheckboxGroup,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import UserCard from './UserCard';

const Data = [
  {
    id: '1',
    userName: 'John Doe',
    walletId: '0x1234567890',
    name: 'John Doe',
    //role: roleEnum.RECRUIT,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    achievements:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    image:
      'https://images.unsplash.com/photo-1616489067199-8b8b2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    experience: [],
    skills: [],
    location: 'India',
    website: 'https://www.google.com',
    achievement: 'none',
  },
  {
    id: '1',
    userName: 'John Doe',
    walletId: '0x1234567890',
    name: 'John Doe',
    //role: roleEnum.RECRUIT,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    achievements:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    image:
      'https://images.unsplash.com/photo-1616489067199-8b8b2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    experience: [],
    skills: [],
    location: 'India',
    website: 'https://www.google.com',
    achievement: 'none',
  },
  {
    id: '1',
    userName: 'John Doe',
    walletId: '0x1234567890',
    name: 'John Doe',
    //role: roleEnum.RECRUIT,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    achievements:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    image:
      'https://images.unsplash.com/photo-1616489067199-8b8b2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    experience: [],
    skills: [],
    location: 'India',
    website: 'https://www.google.com',
    achievement: 'none',
  },
  {
    id: '1',
    userName: 'John Doe',
    walletId: '0x1234567890',
    name: 'John Doe',
    //role: roleEnum.RECRUIT,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    achievements:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    image:
      'https://images.unsplash.com/photo-1616489067199-8b8b2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    experience: [],
    skills: [],
    location: 'India',
    website: 'https://www.google.com',
    achievement: 'none',
  },
  {
    id: '1',
    userName: 'John Doe',
    walletId: '0x1234567890',
    name: 'John Doe',
    //role: roleEnum.RECRUIT,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    achievements:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl lorem quis nisl.',
    image:
      'https://images.unsplash.com/photo-1616489067199-8b8b2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    experience: [],
    skills: [],
    location: 'India',
    website: 'https://www.google.com',
    achievement: 'none',
  },
];

const Talent = () => {
  return (
    <Container maxW="6xl">
      <Stack direction={'row'}>
        <Stack m="0.5rem">
          <Stack
            bg="white"
            spacing={'2rem'}
            minW="15rem"
            direction={'column'}
            p="1rem"
            py="2rem"
            rounded={'lg'}
          >
            <Stack direction={'column'}>
              <Heading fontWeight="600" fontSize="xl">
                Job Type
              </Heading>
              <CheckboxGroup
              // onChange={(checked_fields: string[]) => {
              //   jobTypeFilter(checked_fields, 'job_type');
              // }}
              >
                <Stack direction={'column'} p="1rem">
                  <Checkbox value="1" size={'md'}>
                    Full Time Job
                  </Checkbox>
                  <Checkbox value="2" size={'md'}>
                    Part Time Job
                  </Checkbox>
                  <Checkbox value="3" size={'md'}>
                    Freelance Job
                  </Checkbox>
                  <Checkbox value="4" size={'md'}>
                    Remote Job
                  </Checkbox>
                  <Checkbox value="5" size={'md'}>
                    Internship
                  </Checkbox>
                </Stack>{' '}
              </CheckboxGroup>
            </Stack>
            <Stack direction={'column'}>
              {' '}
              <Heading fontWeight="600" fontSize="xl">
                Experience
              </Heading>
              <CheckboxGroup
              //</Stack>onChange={(checked_fields: string[]) => {
              // setChecked_value(checked_fields);
              // modifyArray();
              // jobTypeFilter(checked_fields, 'job_level');
              //}}
              >
                <Stack direction={'column'} p="1rem">
                  <Checkbox value="1">Entry Level</Checkbox>
                  <Checkbox value="2">Intermediate Level</Checkbox>
                  <Checkbox value="3">Senior Level</Checkbox>
                </Stack>
              </CheckboxGroup>
            </Stack>
          </Stack>
        </Stack>
        <Wrap justify="start" align={'center'} spacing="1rem" p="0.5rem">
          {Data.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Wrap>
      </Stack>
    </Container>
  );
};

export default Talent;
