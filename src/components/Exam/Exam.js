import {
  Box,
  TableContainer,
  Table,
  TableCaption,
  HStack,
  Button,
  Thead,
  Tr,
  Th,
  useToast,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { get_item_list } from '../../api';
import { Link } from 'react-router-dom';

const Exam = () => {
  const toast = useToast();
  const [examList, setExamList] = useState([]);
  useEffect(() => {
    fetchExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchExams = async () => {
    const res = await get_item_list('exam');
    if (res.error) {
      return toast({
        title: 'Error',
        description: res.error.msg,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    setExamList(res.exam_list);
  };

  return (
    <Box w={'100%'}>
      <HStack gap={'5px'} justify={'flex-end'} margin={'20px'}>
        <Button colorScheme="red">
          <Link to={'/exams/add'}>Add New Exam</Link>
        </Button>
      </HStack>
      <ExamList examList={examList} />
    </Box>
  );
};

const ExamList = ({ examList }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          {examList.length === 0 ? 'No exams found' : 'List of all exams'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Class</Th>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {examList.map(exam => (
            <TableRow key={exam._id} exam={exam} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const TableRow = ({ exam }) => {
  return (
    <Tr>
      <Td>{exam.class.name}</Td>
      <Td>{exam.name}</Td>
      <Td>{exam.date_formatted}</Td>
      <Td>{exam.time}</Td>
    </Tr>
  );
};

export default Exam;
