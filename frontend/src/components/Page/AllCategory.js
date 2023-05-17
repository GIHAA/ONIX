import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddCategory.css';
import './AllCategory.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import PHeader from "../common/PHeader";
import SideBar from "../stockController/SideBar";
import AdminSideMenu from "../Layouts/AdminSideMenu";
import editImg from "../../assets/edit.png";
import deleteImg from "../../assets/delete.png";

export default function AllCategory(){

    const [categories, setCategories]= useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        getCategories();
    }, [])

    const getCategories= async()=>{
        const result =await axios.get(`http://localhost:8080/category/all_categories`);
        setCategories(result.data);
        console.log(result.data);

    }

    // delete one item
    const DeleteCategory = async (id)=> {
        console.warn(id)
        let result =await fetch(`http://localhost:8080/category/delete/${id}`,{
            method:"Delete"
        });
        result =await result.json()
        if(result)
        {
            alert("Category Deleted")
            getCategories();
        }
    
    } 

    //search method

    const searchHandle = async (e)=>{
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:8080/category/searchCategory/${key}`)
            result = await result.json()
            if(result){
                setCategories(result)
            }
        }else{
            getCategories();
        }
    }



    return(

        <div class="flex scroll-smooth">
        <SideBar />
        <div class="w-full  h-full bg-white shadow-lg rounded-xl ">
           
          <PHeader />   
          {/* <AdminSideMenu /> */}


        <div className=" mx-auto p-8 ">
        <h2 className="text-3xl mb-10 font-bold mb-4">Category List....</h2>
        <div className="mb-4 ml-44">
          <form className="flex items-center  ">
            <input
              className="border-2 border-gray-300 border-4 w-96 rounded px-2 py-1 mr-2 "   type="search"    placeholder="Search Category or ID"    aria-label="Search"
             onChange={searchHandle}  />
            <Link to="/add">
              <button className="bg-[#2E4960] hover:bg-[#0012] hover:text-black font-bold text-white px-4 py-2 rounded ml-36" >Add Category</button>
            </Link>
            <Link to="/inventryReport">
              <button className="bg-[#2E4960] hover:bg-[#0012] hover:text-black font-bold text-white  px-4 py-2 rounded ml-8" type="submit">Generate Report</button>
            </Link>

          </form>
        </div>
        <div className="pl-[170px] pr-[200px] mt-14">
        <table className=" table text-center w-full ">
          <thead className="bg-[#2E4960] text-white">
            <tr>
              <th className="px-4 py-2">Category ID</th>
              <th className="px-4 py-2 w-[450px]">Category Name</th>
              <th className="px-4 py-2 w-32"></th>
              <th className="px-4 py-2 w-32"></th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? categories.map((item) =>
              <tr key={item._id} > 
                <td className="px-4 py-2 border-2">{item.CategoryID}</td>
                <td className="px-4 py-2 border-2">{item.CategoryName}</td>
                <td className="px-4 py-2 border-2">
                  <Link to={"/update/" + item._id}>
                    <button className="bg-[#2E4960] hover:bg-[#0012] hover:text-black  text-white px-2 py-1 rounded">
                    <span className="flex">
                     <img src={editImg} alt="" className="w-4 h-4 mr-2 mt-1" /> Update 
                     </span></button>
                  </Link>
                </td>
                <td className="px-4 py-2 border-2">
                  <button onClick={() => DeleteCategory(item._id)} className=" bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"><span className="flex"> <img src={deleteImg} alt="" className="w-4 h-4 mr-2 mt-1" />Delete</span></button>
                </td>
              </tr>
            )
            :<td className="text-2xl w-56 font-bold">No Result Found..</td>
        }
          </tbody>
        </table>
        </div>
    </div>
    </div>
    </div>
    )
}