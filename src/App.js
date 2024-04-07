import React, { useEffect } from 'react';
import './App.css';

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Class from './components/Class/Class';
import Student from './components/Student/Student';
import Tutor from './components/Tutor/Tutor';
import Exam from './components/Exam/Exam';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Class />} />
          <Route path="/students" element={<Student />} />
          <Route path="/tutors" element={<Tutor />} />
          <Route path="/exams" element={<Exam />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
