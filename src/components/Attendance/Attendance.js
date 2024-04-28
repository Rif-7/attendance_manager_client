import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Text,
  VStack,
  useToast,
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Tbody,
  Th,
  Thead,
  Td,
  Button,
  Heading,
} from '@chakra-ui/react';
import {
  get_attendance_data,
  mark_attendance,
  unmark_attendance,
} from '../../api';

const Attendance = () => {
  const { examId } = useParams();
  const toast = useToast();
  const [attendees, setAttendees] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  const [examName, setExamName] = useState('');
  const [examClass, setExamClass] = useState('');

  useEffect(() => {
    fetchAttendanceDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  const toggleAttendance = async (studentId, isMark) => {
    const res = (await isMark)
      ? await mark_attendance(examId, studentId)
      : await unmark_attendance(examId, studentId);

    if (res.error) {
      return toast({
        title: 'Error.',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    fetchAttendanceDetails();
    return toast({
      title: 'Success.',
      description: res.success,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const fetchAttendanceDetails = async () => {
    const res = await get_attendance_data(examId);
    if (res.error) {
      return toast({
        title: 'Error.',
        description: res.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    console.log(res);
    setAttendees(res.attendance_list);
    setAbsentees(res.absentee_list);
    setExamName(res.exam.name);
    setExamClass(res.exam.class.name + '-' + res.exam.class.current_sem);
  };

  return (
    <VStack gap={'20px'} align={'stretch'}>
      <Text
        mt={'10px'}
        fontSize={'x-large'}
        fontWeight={'bold'}
        className="raleway"
        alignSelf={'center'}
      >{`${examName} | ${examClass}`}</Text>
      <Attended toggleAttendance={toggleAttendance} students={attendees} />
      <Absentee toggleAttendance={toggleAttendance} students={absentees} />
    </VStack>
  );
};

const Attended = ({ students, toggleAttendance }) => {
  const handleAttendance = studentId => {
    return () => toggleAttendance(studentId, false);
  };

  return (
    <TableContainer>
      <Text
        margin="10px"
        textAlign="center"
        fontSize="32px"
        fontWeight="bold"
        className="raleway"
        textDecoration="underline"
      >
        Attendees
      </Text>{' '}
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          {students.length === 0 ? 'No attendees' : 'List of all attendees'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Roll No</Th>
            <Th>Time</Th>
            <Th>Unmark Attendance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map(student => (
            <Tr>
              <Td>{`${student.student.f_name} ${student.student.l_name}`}</Td>
              <Td>{student.student.rollno}</Td>
              <Td>{student.time_formatted}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={handleAttendance(student.student._id)}
                >
                  Unmark Attendance
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const Absentee = ({ students, toggleAttendance }) => {
  const handleAttendance = studentId => {
    return () => toggleAttendance(studentId, true);
  };

  return (
    <TableContainer>
      <Text
        margin="10px"
        textAlign="center"
        fontSize="32px"
        fontWeight="bold"
        className="raleway"
        textDecoration="underline"
      >
        Absentees
      </Text>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          {students.length === 0 ? 'No absentees' : 'List of all absentees'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Roll No</Th>
            <Th>Mark Attendance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map(student => (
            <Tr>
              <Td>{`${student.f_name} ${student.l_name}`}</Td>
              <Td>{student.rollno}</Td>
              <Td>
                <Button
                  colorScheme="green"
                  onClick={handleAttendance(student._id)}
                >
                  Mark Attendance
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Attendance;
