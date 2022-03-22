
import './App.css';
import { React, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/NavbarTeacher';
import Signup from './components/Signup';
import Login from "./components/Signin";
import TeacherPage from './components/TeacherPage';
import AdminPage from './components/AdminPage';


const user = localStorage.getItem("token");

function App() {
  return (
    <div className="App">
     
        <Routes>
          {/* <Route path={"/"} element={<Home />} /> */}
           <Route path="/register" element={<Signup />} />
           <Route path="/login" exact element={<Login />} />
           {user && <Route path="/teacherPage" exact element={<TeacherPage />} />}
           <Route path="/adminPage" exact element={<AdminPage />} />
           {user==null && <Route path="/" element={<Navigate replace to="/login" />} />}
          </Routes>
    </div>
  );
}

export default App;
