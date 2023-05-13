
import "./AdminSidebar.css"

import { Link } from "react-router-dom";
import React from 'react'
import logo_Image from './Images/Onex_logo.png';
import {FaSignOutAlt} from "react-icons/fa";



const AdminSidebar = ({item}) => {
    return (
      <div  class="col-md-3 col-lg-2 sidebar-offcanvas pl-0 pr-0 " id="sidebar" role="navigation" style={{backgroundColor:"#04062c",height:"500vh"}}>
      <ul style={{textAlign:"center"}} class="nav flex-column sticky-top pl-0 pt-5 p-0 mt-3 d-block ">
      
           <center>   <li class="nav-item mb-3 mt-3"><a class="nav-link text-white" href="#"><img height="110px" width="230px" src={logo_Image}/></a></li></center>
          
               <li style={{marginTop:"60px"}}   id='item'  class="nav-item mb-2 "><Link to={"/inventry_dashboard"} class="nav-link" >Dashboard</Link></li>
               <li id='item'  class="nav-item mb-2 "><Link to={"/getAllItems"} class="nav-link" >Issued Items</Link></li>
               <li id='item'  class="nav-item mb-2 "><Link to={"/all_categories"} class="nav-link" >Categories</Link></li>
               <li id='item'  class="nav-item mb-2 "><Link to={"#"} class="nav-link" >Discount And Offers</Link></li>
               <li id='item'  class="nav-item mb-2 "><Link to={"/inventryReport"} class="nav-link" >Reports</Link></li>



               <button style={{backgroundColor:"#080C39", color:"white", marginTop:"120px"}}>Sign Out  <FaSignOutAlt  size='1.5rem' /></button>

               

    

      </ul>
 </div>
   
    )}

    export default AdminSidebar;