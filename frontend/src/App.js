
import './App.css';
import { React, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/NavbarTeacher';
import Signup from './components/Signup';
import Login from "./components/Signin";
import TeacherPage from './components/TeacherPage';
import AdminPage from './components/AdminPage';
import StudentPage from './components/StudentPage'
import StudentListforAdmin from './components/Studentlists'
// import TeacherListforAdmin from './components/Teacherlists'



const user = localStorage.getItem("token");

function App() {
  return (
    <div className="App">

      <Routes>
        {/* <Route path={"/"} element={<Home />} /> */}
        <Route path="/register" element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/teacherPage" exact element={<TeacherPage />} />
        <Route path="/studentPage" exact element={<StudentPage />} />
        <Route path="/adminPage" exact element={<AdminPage />} />
        <Route path="/adminPage/studentslist" exact element={<StudentListforAdmin />} />
        {/* <Route path="/adminPage/teacherslist" exact element={<TeacherListforAdmin />} /> */}
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
