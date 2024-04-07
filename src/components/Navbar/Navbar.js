'use client';

import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Links = ['Students', 'Classes', 'Tutors', 'Exams'];

const NavLink = props => {
  const { children } = props;

  return (
    <Box
      w={'120px'}
      textAlign={'center'}
      fontSize={'20px'}
      as="div"
      px={2}
      py={1}
      className="raleway"
      bg={'red.400'}
      color={'white'}
      rounded={'md'}
      transition="100ms"
      _hover={{
        textDecoration: 'none',
        bg: 'white',
        color: 'red.400',
        transform: 'translate(0px, 5px)',
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box
              className="merriweather"
              fontSize={'26px'}
              fontWeight={'bold'}
              _hover={{
                textDecoration: 'underline',
              }}
            >
              <Link to={'/'}>Attendance Manager</Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(link => (
                <NavLink>
                  <Link
                    w="100%"
                    h="100%"
                    key={link}
                    to={`/${link.toLowerCase()}`}
                  >
                    {link}
                  </Link>
                </NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
