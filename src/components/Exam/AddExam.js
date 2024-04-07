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
import { create_exam, get_item_list } from '../../api';

export default function ExamAdd() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('FN');
  const [classId, setClassId] = useState('');
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    getClassList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClassList = async () => {
    const res = await get_item_list('class');
    if (res.error) {
      return toast({
        title: 'Error in fetching tutor list.',
        description: res.error.msg,
        status: 'error',
        duration: 5000,
      });
    }

    if (res?.class_list?.length > 0) {
      setClassId(res.class_list[0]._id);
    }
    setClassList(res.class_list);
  };

  const handleRequest = async () => {
    setIsLoading(true);
    const res = await create_exam(name, date, time, classId);
    console.log(res);
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
    setDate('');
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
          Add Exam
        </Heading>
        <FormControl id="userName" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="date" isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="Lastname"
            _placeholder={{ color: 'gray.500' }}
            type="date"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Time</FormLabel>
          <Select onChange={e => setTime(e.target.value)} value={time}>
            <option value={'FN'}>Forenoon</option>
            <option value={'AN'}>Afternoon</option>
          </Select>
        </FormControl>
        <FormControl id="class" isRequired>
          <FormLabel>Class</FormLabel>
          <Select
            onChange={e => setClassId(e.target.value)}
            value={classId}
            placeholder="Select Class"
          >
            {classList.map(class_ => (
              <option key={class_._id} value={class_._id}>
                {class_.name}
              </option>
            ))}
          </Select>
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
            <Link to="/exams">Cancel</Link>
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
