
import './App.css';
import { React, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from "./components/Signin";
import Logout from "./components/Logout";

const user = localStorage.getItem("token");

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
        <Routes>
          {/* <Route path={"/"} element={<Home />} /> */}
           <Route path="/register" element={<Signup />} />
           <Route path="/login" exact element={<Login />} />
           {user && <Route path="/" exact element={<Logout />} />}
           {user==null && <Route path="/" element={<Navigate replace to="/login" />} />}
          </Routes>
    </div>
  );
}

export default App;
