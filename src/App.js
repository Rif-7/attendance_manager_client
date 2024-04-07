import React from 'react';
import './App.css';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Class from './components/Class/Class';
import Student from './components/Student/Student';
import Tutor from './components/Tutor/Tutor';
import Exam from './components/Exam/Exam';
import TutorAdd from './components/Tutor/AddTutor';
import ClassAdd from './components/Class/AddClass';
import StudentAdd from './components/Student/AddStudent';
import ExamAdd from './components/Exam/AddExam';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Class />} />
          <Route path="/classes/add" element={<ClassAdd />} />
          <Route path="/students" element={<Student />} />
          <Route path="/students/add" element={<StudentAdd />} />
          <Route path="/tutors" element={<Tutor />} />
          <Route path="/tutors/add" element={<TutorAdd />} />
          <Route path="/exams" element={<Exam />} />
          <Route path="/exams/add" element={<ExamAdd />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
