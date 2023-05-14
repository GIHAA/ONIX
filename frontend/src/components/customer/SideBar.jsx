import React from 'react'
// import logo from "../assets/logo2.png"

import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";



function sideBar() {

  return (

    <div className=" bg-[#001233] h-[100vh] flex-[15%] sticky top-0">
      
      
    <div className='mt-4'>
    <img src={logo} alt="logo" className=" w- h-[100px] mx-auto object-contain"></img>
      <h3 className=" text-[#2E4960] font-bold text-l text-center w-[240px] leading-5 my-2 tracking-wide mx-auto">

      </h3>
    </div>

    
    <div className="my-6 ">

    <NavLink
  to="/"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    
  My Profile
</NavLink>

<NavLink
  to="/Home_Page"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    
  Home page
</NavLink>


<NavLink
  to="/myorder"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    
  My Orders
</NavLink>

<NavLink
  to="/feedback"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    
  Feedback
</NavLink>

{/* <NavLink
  to="/quotation"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    
    Quotation
</NavLink> */}

<NavLink
  to="/"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    
    Notifcations
</NavLink>


      

    </div>

    <div>


    </div>
  
</div>
   
  )
}

export default sideBar