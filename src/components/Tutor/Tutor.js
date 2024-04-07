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

const Tutor = () => {
  const toast = useToast();
  const [tutorList, setTutorList] = useState([]);
  useEffect(() => {
    fetchTutors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTutors = async () => {
    const res = await get_item_list('tutor');
    if (res.error) {
      return toast({
        title: 'Error',
        description: res.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    setTutorList(res.tutor_list);
  };

  return (
    <Box w={'100%'}>
      <HStack gap={'5px'} justify={'flex-end'} margin={'20px'}>
        <Button colorScheme="red">Add New Tutor</Button>
      </HStack>
      <TutorList tutorList={tutorList} />
    </Box>
  );
};

const TutorList = ({ tutorList }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          {tutorList.length === 0 ? 'No tutors found' : 'List of all tutors'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Class</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tutorList.map(tutor => (
            <TableRow key={tutor._id} props={tutor} />
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
      <Td>{props?.class?.name || 'No Class'}</Td>
    </Tr>
  );
};

export default Tutor;
