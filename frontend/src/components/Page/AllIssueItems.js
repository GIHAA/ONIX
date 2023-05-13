import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddIssueItem.css';
import './AllIssueItems.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SideBar from "../stockController/SideBar";
import PHeader from "../common/PHeader";

import AdminSideMenu from "../Layouts/AdminSideMenu"

export default function AllIssueItems(){

    const [issueItems, setItems]= useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        getIssueItems();
       
    }, [])

    const getIssueItems= async()=>{
        const result =await axios.get(`http://localhost:8080/Inventry_IssueItems/getAllItems/`);
        setItems(result.data);
        console.log(result.data);
        

    }










    // delete one item
    const DeleteIssueItem = async (id)=> {
        console.warn(id)
        let result =await fetch(`http://localhost:8080/Inventry_IssueItems/delete_IssueItem/${id}`,{
            method:"Delete"
        });
        result =await result.json()
        if(result)
        {
            alert("Category Deleted")
            getIssueItems();
        }
    
    } 

    //search method

    const searchItemHandle = async (e)=>{
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:8080/Inventry_IssueItems/search_IssueItem/${key}`)
            result = await result.json()
            if(result){
                setItems(result)
            }
        }else{
            getIssueItems();
        }
    }



    return(
        <div class="flex scroll-smooth">
        <SideBar />
        <div class="w-full  h-full bg-white shadow-lg rounded-xl ">
           
          <PHeader />
          
          <AdminSideMenu />
          <div class="container" className="ItemList">
            <h2 class="m-5 text-3xl font-bold ">Issue Item List....</h2>
            <br />
            <form class="flex justify">
              <input class="form-input w-80 h-10 border-4 border-gray-300 ml-16 rounded-md" type="search" placeholder="  Search Items..." aria-label="Search" onChange={searchItemHandle} />
             
                 <Link to ="/add_IssueItem"> <button className="bg-[#2E4960] p-1.5 ml-96 text-white hover:bg-[#0012] ">Add New Issue Item</button></Link>
                <Link to ="/inventryReport"><button className="bg-[#2E4960] p-1.5 ml-10 text-white hover:bg-[#0012] ">Generate Report</button></Link>
            
            </form>
            <div>
              <br />
              <table class="ml-3 table-auto w-full">
                <thead class="tableheader">
                  <tr class=" bg-[#2E4960] text-white  top-0">
                    <th class=" bg-[#2E4960] text-white   py-3">ID</th>
                    <th >Name</th>
                    <th >Display.Name</th>
                    <th >Category</th>
                    <th >Description</th>
                    <th >Image</th>
                    <th >Issue.Qnt</th>
                    <th >Price</th>
                    <th >Discount</th>
                    <th >Sell.Price</th>
                  
                    <th >Ex.Date</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <br />
                  {issueItems.length > 0 ? issueItems.map((item) =>
                    <tr key={item._id}>
                      <td class="border px-1 py-2">{item.Inventry_Item_ID}</td>
                      <td class="border px-4 py-2">{item.Inventry_Item_Name}</td>
                      <td class="border px-2 py-2">{item.Inventry_Item_DisplayName}</td>
                      <td class="border px-4 py-2">{item.Inventry_Item_Category}</td>
                      <td class="border px-2 py-2">{item.Inventry_Item_Description}</td>
                      <td class="border px-1 py-2"><img src={`http://localhost:8080${item.Image}`} class="w-16 h-16 object-cover" /></td>
                      <td class="border px-4 py-2">{item.Inventry_Item_IssuedQuantity}</td>
                    
                    <td class="border px-4 py-2">{item.Inventry_Item_Price}</td>
                    <td class="border px-4 py-2">{item.Inventry_Item_Discount}</td>
                    <td class="border px-4 py-2">{item.Inventry_Item_Price*(100-item.Inventry_Item_Discount)/100}</td>
                
                    <td class="border px-4 py-2">{item.Inventry_Item_ExDate}</td>



                    <td class="border px-2 py-2"><Link to={"/update_IssueItem/"+item._id}><button className="bg-[#2E4960] p-1  text-white hover:bg-[#0012] rounded-md">Update</button></Link></td>
                    <td class="border px-2 py-2"><button onClick={()=>DeleteIssueItem(item._id)} className="bg-[#800000] p-1  text-white hover:bg-[#0012] rounded-md">Delete</button></td>
                </tr>
            )
            :<h1>No Result Found..</h1>
        }
          </tbody>
        </table>
        </div>

    </div>
    </div>
    </div>
    )
}