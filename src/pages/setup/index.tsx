import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  FormLabel,
  Stack,
  Text,
  FormErrorMessage,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'src/helpers/Redirect';
import { roleEnum } from 'src/enums/enums';
import { useProfileStore } from 'src/app/profileStore';

type Inputs = {
  name: string;
  role: roleEnum;
};

const Dashboard = () => {
  const { pubKey } = useProfileStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (!pubKey) {
    Redirect('/');
  }

  const onSubmit = (value: any) => {
    console.log(value);
    //router.push('/profile');
  };
  return (
    <Container maxW='full' p='0'>
      <Stack direction={'row'}>
        <Center
          minW='50vw'
          h='100vh'
          overflow={'hidden'}
          bg='black'
          _before={{
            content: '"dhire."',
            position: 'absolute',
            top: '0',
            left: '0',
            fontSize: '2rem',
            color: 'white',
            fontWeight: 'bold',
            padding: '1rem 2rem',
          }}
        ></Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Center w='40vw' h='100vh'>
            <Stack gap='2rem' fontSize='xl'>
              <Stack gap='0.6rem' direction={'column'}>
                <FormControl>
                  <FormLabel>What should we call you ?</FormLabel>
                  <chakra.input
                    p='0.5rem'
                    borderBottom={'1px solid black'}
                    type='text'
                    fontSize={'md'}
                    id='name'
                    placeholder='Full Name'
                    {...register('name', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                    _active={{ outline: '0' }}
                    _focus={{ outline: '0' }}
                  />{' '}
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack gap='0.6rem' direction={'column'}>
                <Text>What are you looking for ?</Text>
                <chakra.select
                  p='0.5rem'
                  fontSize={'md'}
                  borderBottom={'1px solid black'}
                  bg='white'
                  placeholder='Select option'
                  {...register('role')}
                >
                  <option value={roleEnum.RECRUITER}>Recruiter</option>
                  <option value={roleEnum.RECRUIT}>Recruit</option>
                </chakra.select>
                <Button type='submit' maxW='10rem'>
                  Next
                </Button>
              </Stack>
            </Stack>
          </Center>
        </form>
      </Stack>
    </Container>
  );
};

export default Dashboard;
