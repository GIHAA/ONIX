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
      <h3 className=" text-[#2E4960] font-bold text-l text-center w-[260px] leading-5 my-2 tracking-wide mx-auto">

      </h3>
    </div>

    
    <div className="my-6 ">

    <NavLink
  to="/"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    <img src="https://img.icons8.com/ios-glyphs/30/null/user-male-circle.png" className="w-6 h-6 mr-2"/>
  Profile
</NavLink>

<NavLink
  to="/expenses"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    <img src="https://img.icons8.com/ios-glyphs/30/null/user-male-circle.png" className="w-6 h-6 mr-2"/>
    Expenses
</NavLink>

<NavLink
  to="/"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    <img src="https://img.icons8.com/ios-glyphs/30/null/user-male-circle.png" className="w-6 h-6 mr-2"/>
    Customer Transactions 
</NavLink>

<NavLink
  to="/"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    <img src="https://img.icons8.com/ios-glyphs/30/null/user-male-circle.png" className="w-6 h-6 mr-2"/>
    Employee Salary
 
</NavLink>

<NavLink
  to="/"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    <img src="https://img.icons8.com/ios-glyphs/30/null/user-male-circle.png" className="w-6 h-6 mr-2"/>
    Reports
 
</NavLink>

<NavLink
  to="/"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    <img src="https://img.icons8.com/ios-glyphs/30/null/user-male-circle.png" className="w-6 h-6 mr-2"/>
    My Activities 
 
</NavLink>




{/* <NavLink
  to="/quotation"
  activeClassName="active"
  className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
>
    <img src="https://img.icons8.com/ios-glyphs/30/null/user-male-circle.png" className="w-6 h-6 mr-2"/>
    Quotation
</NavLink> */}


      

    </div>

    <div>


    </div>
  
</div>
   
  )
}

export default sideBar