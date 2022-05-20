import React from "react";
import {
  BrowserRouter as Router, Navigate, Route, Routes
} from 'react-router-dom';
import './App.css';
import Login from './Components/Logins/Login/Login';
import Registration from './Components/Registration/Registration/Registration';
import Dashboard from './Components/Dashboard/Dashboard';
import UserAdministration from "./Components/UserAdministration/UserAdministration";
import CreateDeal from "./Components/CreateDeal/CreateDeal";
import DealInfo from "./Components/DealInfo/DealInfo";
import {NotificationContainer} from 'react-notifications';
import AllDeals from "./Components/AllDeals/AllDeals";
import Reports from "./Components/Reports/Reports";
import EditDeal from "./Components/EditDeal/EditDeal";
import FxPnL from "./Components/FxPnL/FxPnL";
import Rates from "./Components/Rates/Rates";

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
        <Route path="/deals" element={<AllDeals/>} />
        <Route path="/create/deal" element={<CreateDeal/>} />
        <Route path="/deal/:id" element={<DealInfo/>} />
        <Route path="/edit/:id" element={<EditDeal/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/fx-pnl" element={<FxPnL/>} />
        <Route path="/rates" element={<Rates/>} />
      </Routes>
      <NotificationContainer />
  </Router>
  ); 
}

export default App;
