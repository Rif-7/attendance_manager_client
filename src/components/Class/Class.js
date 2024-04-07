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

const Class = () => {
  const toast = useToast();
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    fetchClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchClass = async () => {
    const res = await get_item_list('class');
    if (res.error) {
      return toast({
        title: 'Error',
        description: res.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    setClassList(res.class_list);
  };

  return (
    <Box w={'100%'}>
      <HStack gap={'5px'} justify={'flex-end'} margin={'20px'}>
        <Button colorScheme={'red'}>Add New Class</Button>
      </HStack>
      <ClassList classList={classList} />
    </Box>
  );
};

const ClassList = ({ classList }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          {classList.length === 0 ? 'No classes found' : 'List of all classes'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Current Sem</Th>
            <Th>Tutor</Th>
            <Th>Start Year</Th>
            <Th>End Year</Th>
          </Tr>
        </Thead>
        <Tbody>
          {classList.map(class_ => (
            <TableRow key={class_._id} props={class_} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const TableRow = ({ name, current_sem, tutor, start_year, end_year }) => {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{current_sem}</Td>
      <Td>{`${tutor.f_name} ${tutor.l_name}`}</Td>
      <Td>{start_year}</Td>
      <Td>{end_year}</Td>
    </Tr>
  );
};

export default Class;
