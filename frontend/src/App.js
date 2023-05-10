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






import AllCategory from './components/Page/AllCategory';
import SideMenu from './components/Layouts/AdminSideMenu';
import AddCategory from './components/Page/AddCategory';
import Adminlayout from './components/Layouts/AdminLayouts';
import UpdateCategory from './components/Page/UpdateCategory';
import InventryReport from './components/Page/Inventry_Reports';
import AllIssueItems from './components/Page/AllIssueItems';
import AddIssueItem from './components/Page/AddIssueItem';
import UpdateIssueItems from './components/Page/UpdateIssueItems';
import DashboardInventry from './components/Page/DashboardInventry';







function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PortalHadler />} />

          <Route path="/quotation" element={<Quatation />} />
          <Route path="/feedback" element={<Feedback />} />

          <Route path="/users" element={<User />} />
          <Route path="/admin" element={<PortalHadler />} />

          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/stock" element={<Stock />} />

          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/expenses" element={<Expenses />} />
    






        <Route path="/add" element={<Adminlayout><AddCategory/></Adminlayout>}/>
        <Route path="/all_categories" element={<Adminlayout><AllCategory/></Adminlayout>} /> 
        <Route path="/update/:id" element={<Adminlayout><UpdateCategory/></Adminlayout>}/>
        <Route path="/inventryReport"element={<Adminlayout><InventryReport/></Adminlayout>}/>

        <Route path="/getAllItems"element={<AllIssueItems/>}/>
        <Route path="/add_IssueItem" element={<Adminlayout><AddIssueItem/></Adminlayout>} />
        <Route path="/update_IssueItem/:id" element={<Adminlayout><UpdateIssueItems/></Adminlayout>} />
        <Route path="/inventry_dashboard" element={<Adminlayout><DashboardInventry/></Adminlayout>} />



        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
