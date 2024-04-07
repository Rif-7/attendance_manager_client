'use client';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { create_class, get_item_list } from '../../api';

export default function ClassAdd() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [currentSem, setCurrentSem] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [tutor, setTutor] = useState('');
  const [tutorList, setTutorList] = useState([]);

  useEffect(() => {
    getTutorList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTutorList = async () => {
    const res = await get_item_list('tutor');
    if (res.error) {
      return toast({
        title: 'Error in fetching tutor list.',
        description: res.error.msg,
        status: 'error',
        duration: 5000,
      });
    }

    if (res?.tutor_list?.length > 0) {
      setTutor(res.tutor_list[0]._id);
    }
    setTutorList(res.tutor_list);
  };

  const handleRequest = async () => {
    if (
      startYear.length !== 4 ||
      endYear.length !== 4 ||
      isNaN(parseInt(startYear) || isNaN(parseInt(endYear)))
    ) {
      return toast({
        title: 'Error.',
        description: 'Years should be in proper format',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setIsLoading(true);
    const res = await create_class(name, currentSem, startYear, endYear, tutor);
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

    setName('');
    setCurrentSem('');
    setStartYear('');
    setEndYear('');
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
          Add Class
        </Heading>
        <FormControl id="userName" isRequired>
          <FormLabel>Class Name</FormLabel>
          <Input
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Class Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="lname" isRequired>
          <FormLabel>Current Semester</FormLabel>
          <Input
            value={currentSem}
            onChange={e => setCurrentSem(e.target.value)}
            placeholder="Current Semester"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="tutor" isRequired>
          <FormLabel>Tutor</FormLabel>
          <Select
            onChange={e => setTutor(e.target.value)}
            value={tutor}
            placeholder="Select tutor"
          >
            {tutorList.map(tutor => (
              <option key={tutor._id} value={tutor._id}>
                {`${tutor.f_name} ${tutor.l_name}`}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Start Year</FormLabel>
          <Input
            value={startYear}
            onChange={e => setStartYear(e.target.value)}
            placeholder="Start Year"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>End Year</FormLabel>
          <Input
            value={endYear}
            onChange={e => setEndYear(e.target.value)}
            placeholder="End Year"
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
            <Link to="/classes">Cancel</Link>
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
