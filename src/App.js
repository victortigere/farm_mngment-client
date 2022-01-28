import React from "react";
import {
  BrowserRouter as Router, Navigate, Route, Routes
} from 'react-router-dom';
import './App.css';
import Login from './Components/Logins/Login/Login';
import Registration from './Components/Registration/Registration/Registration';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
  </Router>
  ); 
}

export default App;
