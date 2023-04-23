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
        </Routes>

      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
