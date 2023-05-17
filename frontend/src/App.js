import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Registration";
import PortalHadler from "./components/PortalHadler";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Quatation from "./components/customer/Quatation";
import Feedback from "./components/customer/Feedback";
import User from "./components/humanResource/Users";
import Suppliers from "./components/stockController/Suppliers";
import Deliveries from "./components/salesOfficer/Deliveries";
import MyDeliveries from "./components/driver/Deliveries";
import Orders from "./components/salesOfficer/Orders";
import Stock from "./components/stockController/Stock";
import Expenses from "./components/accountant/Expenses";
import EmployessAttendance from "./components/humanResource/EmployessAttendance";
import HomePage from "./components/customer/HomePage";
import Customer from "./components/customerServiceManager/Customer";
import ManageFeedback from "./components/customerServiceManager/ManageFeedback";
import Order from "./components/customer/Orders";

import AllCategory from "./components/Page/AllCategory";
import SideMenu from "./components/Layouts/AdminSideMenu";
import AddCategory from "./components/Page/AddCategory";
import Adminlayout from "./components/Layouts/AdminLayouts";
import UpdateCategory from "./components/Page/UpdateCategory";
import InventryReport from "./components/Page/Inventry_Reports";
import AllIssueItems from "./components/Page/AllIssueItems";
import AddIssueItem from "./components/Page/AddIssueItem";
import UpdateIssueItems from "./components/Page/UpdateIssueItems";
import DashboardInventry from "./components/Page/DashboardInventry";
import HomePageCustomer from "./components/Page/HomePageCustomer";
import ItemView from "./components/Page/ItemView";

import StockOrder from "./components/stockController/StockOrder";
import Salary from "./components/accountant/Salary";
import SoReport from "./components/salesOfficer/Report"
import ScReport from "./components/stockController/Report"

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
          <Route path="/mydeliveries" element={<MyDeliveries />} />
          <Route path="/stockorder" element={<StockOrder />} />

          <Route path="/salary" element={<Salary />} />

          <Route path="/soreport" element={<SoReport />} />
          <Route path="/screport" element={<ScReport />} />

      



        <Route path="/add" element={<AddCategory/>}/>
        <Route path="/all_categories" element={<AllCategory/>} /> 
        <Route path="/update/:id" element={<UpdateCategory/>}/>
        <Route path="/inventryReport"element={<InventryReport/>}/>

        <Route path="/getAllItems"element={<AllIssueItems/>}/>
        <Route path="/add_IssueItem" element={<AddIssueItem/>} />
        <Route path="/update_IssueItem/:id" element={<UpdateIssueItems/>} />
        <Route path="/inventry_dashboard" element={<DashboardInventry/>} />
        <Route path="/Home_Page" element={<HomePageCustomer/>}/>
        <Route path="/ItemView/:id" element={<ItemView/>}/>

        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
