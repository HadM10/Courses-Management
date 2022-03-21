
import './App.css';
import { React, useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          {/* <Route path={"/"} element={<Home />} /> */}
          </Routes>
    </div>
  );
}

export default App;
