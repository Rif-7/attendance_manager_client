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
        description: res.error,
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
        <Button colorScheme="red">Add New Exam</Button>
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
            <TableRow key={exam._id} props={exam} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const TableRow = props => {
  return (
    <Tr>
      <Td>{props.class.name}</Td>
      <Td>{props.name}</Td>
      <Td>{props.date_formatted}</Td>
      <Td>{props.time}</Td>
    </Tr>
  );
};

export default Exam;
