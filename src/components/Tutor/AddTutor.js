'use client';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { create_tutor } from '../../api';

export default function TutorAdd() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const handleRequest = async () => {
    setIsLoading(true);
    const res = await create_tutor(fname, lname);
    if (res.error) {
      setIsLoading(false);
      return toast({
        title: 'Error.',
        description: res.error.msg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setFname('');
    setLname('');
    setIsLoading(false);

    return toast({
      title: 'Success.',
      description: res.success,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Add Tutor
        </Heading>
        <FormControl id="userName" isRequired>
          <FormLabel>Firstname</FormLabel>
          <Input
            onChange={e => setFname(e.target.value)}
            value={fname}
            placeholder="Firstname"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="lname" isRequired>
          <FormLabel>Lastname</FormLabel>
          <Input
            value={lname}
            onChange={e => setLname(e.target.value)}
            placeholder="Lastname"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
          >
            <Link to="/tutors">Cancel</Link>
          </Button>
          <Button
            isLoading={isLoading}
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleRequest}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
