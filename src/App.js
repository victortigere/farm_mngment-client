import React from "react";
import {
  BrowserRouter as Router, Navigate, Route, Routes
} from 'react-router-dom';
import './App.css';
import Login from './Components/Logins/Login/Login';
import Registration from './Components/Registration/Registration/Registration';
import Dashboard from './Components/Dashboard/Dashboard';
import UserAdministration from "./Components/UserAdministration/UserAdministration";
import Deal from "./Components/Deal/Deal";
import {NotificationContainer} from 'react-notifications';
import ViewDeal from "./Components/ViewDeal/ViewDeal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/users" element={<UserAdministration/>} />
        <Route path="/deals" element={<ViewDeal/>} />
        <Route path="/create/deal" element={<Deal/>} />
      </Routes>
      <NotificationContainer />
  </Router>
  ); 
}

export default App;
