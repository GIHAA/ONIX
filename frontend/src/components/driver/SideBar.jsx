import React, { useState } from "react";
// import logo from "../assets/logo2.png"

import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import updateUser from "../../services/api/user";

function SideBar() {
  const [showdisplay, setshowdisplay] = useState("true");

  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    confirmpassword: "",
    token: user.token,
    _id: user._id,
    phone: "",
    image: "",
    dob: "",
    gender: ""
  });

  const { name, email, password, password2, address, phone , dob , gender ,confirmpassword } = formData;

const navigate = useNavigate();
const dispatch = useDispatch();

const onChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });
const onSubmit = (e) => {
  e.preventDefault();
  
  if (password !== password2) {
    toast.error("Passwords do not match");
  } 
  else if(formData.confirmpassword === ""){
    toast.error("Please enter your password to confirm changes");
  }
  else{
    
    const formDataID = { ...formData, _id: user._id} 
    const response = updateUser(formDataID)
      .then(() => {
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        toast.error("An error occurred while updating profile");
        console.log(err);
      });

    console.log(response.data);
  }
};
  return (
    <>
    <div className=" bg-[#001233] h-[100vh] flex-[15%] sticky top-0">
      <div className="mt-4">
        <img
          src={logo}
          alt="logo"
          className=" w- h-[100px] mx-auto object-contain"
        ></img>
        <h3 className=" text-[#2E4960] font-bold text-l text-center w-[150px] leading-5 my-2 tracking-wide mx-auto"></h3>
      </div>

      <div className="my-6 ">
        <NavLink
          to="/"
          activeClassName="active"
          className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
        >
          Profile
        </NavLink>

        <NavLink
          to="/"
          onClick={() => setshowdisplay(true)}
          activeClassName="active"
          className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
        >
          Add driver details
        </NavLink>

        <NavLink
          to="/deliveries"
          activeClassName="active"
          className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
        >
          Deliveries
        </NavLink>

        <NavLink
          to="/"
          activeClassName="active"
          className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
        >
          Reports
        </NavLink>

        <NavLink
          to="/"
          activeClassName="active"
          className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
        >
          My Activities
        </NavLink>

        {/* <NavLink
  to="/quotation"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    
    Quotation
</NavLink> */}
      </div>
    

      <div></div>
      
    </div>
      { showdisplay && (
        <div className="fixed inset-0 z-50 overflow-auto bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 ">Update Driver details</h2>
            <div className="flex mt-6">
      
      <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
        Name  :
      </label>
      <input
        id="name"
        name="name"
        value={name}
        onChange={onChange}
        placeholder={user.name}
        type="text"
        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
      />

</div>
<div className="flex">
      <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
        Email :
      </label>
      <input
        id="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder={user.email}
        type="text"
        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
      />
</div>
<div className="flex">
      <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
        Adderess :
      </label>
      <input
        id="address"
        name="address"
        value={address}
        onChange={onChange}
        placeholder={user.address}
        type="text"
        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
      />
</div>

            <div className="flex">
              <button className="" onClick={() => setshowdisplay(false)}>
                Close
              </button>
              <button className="ml-auto" onClick={() => onSubmit()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  );
}

export default SideBar;
