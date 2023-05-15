import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './DashboardInventry.css';
import SideBar from '../stockController/SideBar';
import PHeader from '../common/PHeader';
import AdminSidebar from '../Layouts/AdminSideMenu';

const DashboardInventry =() => {



    const [categories, setCategories]= useState([]);
    const [issueItems, setItems]= useState([]);
     useEffect(() => {
           
           
    const getIssueItems= async()=>{
        const result =await axios.get(`http://localhost:8080/Inventry_IssueItems/getAllItems/`);
        setItems(result.data);
        console.log(result.data);

    }


    const getCategories= async()=>{
        const result =await axios.get(`http://localhost:8080/category/all_categories`);
        setCategories(result.data);
        console.log(result.data);

    }


    getIssueItems();
    getCategories();


     }, [])



    return(
    <div class="flex scroll-smooth">
    <SideBar />
    <div class="w-full h-full bg-white shadow-lg rounded-xl">
        <PHeader />
        <AdminSidebar/>
        <div className="ml-10">
            <h1 className='h1_text'>Inventry Details...</h1>
            <div class='flex flex-wrap'>
                <div class='bg-gray-300 h-45 w-96 border-4 border-blue-900 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Total Issue Items</label>
                    <label class='text-5xl'>{issueItems.length}</label><br/>
                    <Link to="/getAllItems" >      <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label></Link>
                </div>
                <div class='bg-gray-300 h-45 w-96 border-4 border-blue-900 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Total Categories</label>
                    <label class='text-5xl'>{categories.length}</label>
                    <br/>
                    <Link to ="/all_categories"  > <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label></Link>
                </div>
                <div class='bg-gray-300 h-45 w-96 border-4 border-red-700 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Expired Items</label>
                    <label class='text-5xl'>0</label>
                    <br/>  
                    <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label>

                </div>
                <div class='bg-gray-300 h-45 w-96 border-4 border-red-700 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Out of Stock(Issued)</label>
                    <label class='text-5xl'>0</label>
                    <br/>  
                    <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label>

                </div>
                <div class='bg-gray-300 h-45 w-96 border-4 border-red-700 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Low Stock(Issued)</label>
                    <label class='text-5xl'>0</label>
                    <br/>  
                    <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label>

                </div>
            </div>
        </div>
    </div>
    </div>

    )


}

export default DashboardInventry;