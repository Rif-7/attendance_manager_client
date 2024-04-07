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

const Student = () => {
  const toast = useToast();
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStudents = async () => {
    const res = await get_item_list('student');
    if (res.error) {
      return toast({
        title: 'Error',
        description: res.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    setStudentList(res.student_list);
  };

  return (
    <Box w={'100%'}>
      <HStack gap={'5px'} justify={'flex-end'} margin={'20px'}>
        <Button colorScheme="red">Add New Student</Button>
      </HStack>
      <StudentList studentList={studentList} />
    </Box>
  );
};

const StudentList = ({ studentList }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          {studentList.length === 0
            ? 'No students found'
            : 'List of all students'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Roll number</Th>
            <Th>Class</Th>
            <Th>Current Semester</Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentList.map(student => (
            <TableRow key={student._id} props={student} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const TableRow = props => {
  return (
    <Tr>
      <Td>{`${props.f_name} ${props.l_name}`}</Td>
      <Td>{props.rollno}</Td>
      <Td>{props.class.name}</Td>
      <Td>{props.class.current_sem}</Td>
    </Tr>
  );
};

export default Student;
