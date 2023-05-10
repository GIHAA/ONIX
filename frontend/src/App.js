import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Registration";
import PortalHadler from "./components/PortalHadler";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Quatation from "./components/customer/Quatation";
import Feedback from "./components/customer/Feedback";
import User from "./components/humanResource/Users";
import Suppliers from "./components/stockController/Suppliers";
import Deliveries from "./components/salesOfficer/Deliveries";
import Orders from "./components/salesOfficer/Orders";
import Stock from "./components/stockController/Stock";
import Expenses from "./components/accountant/Expenses";
import EmployessAttendance from "./components/humanResource/EmployessAttendance";
import HomePage from "./components/customer/HomePage";
import Customer from "./components/customerServiceManager/Customer"
import ManageFeedback from "./components/customerServiceManager/ManageFeedback";
import Order from "./components/customer/Orders"

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PortalHadler />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/quotation" element={<Quatation />} />
          <Route path="/feedback" element={<Feedback />} />

          <Route path="/users" element={<User />} />
          <Route path="/admin" element={<PortalHadler />} />
          <Route path="/attendance" element={<EmployessAttendance />} />

          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/stock" element={<Stock />} />

          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/expenses" element={<Expenses />} />

          <Route path="/customers" element={<Customer />} />  
          <Route path="/managefeed" element={<ManageFeedback />} />

          <Route path="/myorder" element={<Order />} />
        </Routes>

      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
