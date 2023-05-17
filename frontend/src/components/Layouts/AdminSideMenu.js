
import "./AdminSidebar.css"

import { Link } from "react-router-dom";
import React from 'react'
import logo_Image from './Images/Onex_logo.png';
import {FaSignOutAlt} from "react-icons/fa";



const AdminSidebar = ({item}) => {
    return (
      <div className=""> 
        {/* class="col-md-3 col-lg-2 sidebar-offcanvas pl-0 pr-0 " id="sidebar" role="navigation" style={{backgroundColor:"#04062c",height:"500vh"}}> */}
      {/* <ul style={{textAlign:"center"}} class="nav flex-column sticky-top pl-0 pt-5 p-0 mt-3 d-block ">
      
           <center>   <li class="nav-item mb-3 mt-3"><a class="nav-link text-white" href="#"><img height="110px" width="230px" src={logo_Image}/></a></li></center>
          
               <li style={{marginTop:"60px"}}   id='item'  class="nav-item mb-2 "><Link to={"/inventry_dashboard"} class="nav-link" >Dashboard</Link></li>
               <li id='item'  class="nav-item mb-2 "><Link to={"/getAllItems"} class="nav-link" >Issued Items</Link></li>
               <li id='item'  class="nav-item mb-2 "><Link to={"/all_categories"} class="nav-link" >Categories</Link></li>
               <li id='item'  class="nav-item mb-2 "><Link to={"#"} class="nav-link" >Discount And Offers</Link></li>
               <li id='item'  class="nav-item mb-2 "><Link to={"/inventryReport"} class="nav-link" >Reports</Link></li>



               <button style={{backgroundColor:"#080C39", color:"white", marginTop:"120px"}}>Sign Out  <FaSignOutAlt  size='1.5rem' /></button>

               

    





















      </ul> */}













      <nav className="bg-[#001233] text-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-primary">
      
      <div className="container flex-wrap items-center mx-auto  flex justify-start">
        <Link to="/" className="flex items-center"></Link>
        
        <div>
          <ul className="flex flex-col p-4 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
          <li className="text-[20px] font-semibold">
              <Link
                to="/inventry_dashboard"
                className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0   "
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
           
           
            <li className="text-[20px] font-semibold">
              <Link
                to="/getAllItems"
                className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Issued Items
              </Link>
            </li>

            {/* <li className="text-[20px] font-semibold">
              <Link
                to="/all_categories"
                className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0 "
              >
                Categories
              </Link>
            </li>

            <li className="text-[20px] font-semibold">
              <Link
                to="/inventryReport"
                className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0 "
              >
                Reports
              </Link>
            </li> */}
          </ul>
        </div>
        <div
          className="hidden w-full md:block md:w-auto "
          id="navbar-default"
        >
      
        </div>

   
      </div>
    </nav>

 </div>

 
   
    )}

    export default AdminSidebar;