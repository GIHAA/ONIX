import React,{useState}  from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import './AddCategory.css';
import './AllCategory.css';

import PHeader from "../common/PHeader";
import SideBar from "../stockController/SideBar";
import AdminSideMenu from "../Layouts/AdminSideMenu";

//export is also in the same line 

export default function AddCategory(){

  const [CategoryName, setCategoryName] = useState("");
  const [CategoryID, setCategoryID] = useState("");
 

  function sendData(e){
    e.preventDefault();
    //alert("Data inserted successfully");
    
 
 


    const newCategory ={
      CategoryName,
      CategoryID,

    }
    //console.log(newCategory);

    axios.post("http://localhost:8080/category/add ",newCategory).then(()=>{
      alert("New Category Added Successfully");
        setCategoryName("");
        setCategoryID("");
      

    }).catch((err)=>{
      alert(err)
    })
  }











    return(

      <div class="flex scroll-smooth">
      <SideBar />
      <div class="w-full  h-full bg-white  rounded-xl ">     
      <PHeader />  
      {/* <AdminSideMenu /> */}
        
        <div >   
        <div className="categoryListButton">
          <li>
          <Link to ="/all_categories"  > <button className="bg-[#2E4960] p-2 mt-5 ml-[750px] w-42 shadow-xl rounded-lg text-white hover:bg-[#0012]  font-bold ">View Category List</button></Link> 
        </li>
       </div>

       <div className="pl-[350px] pr-[350px] mt-6">
        <form className="bg-gray-300 p-8 shadow-xl rounded-xl " onSubmit={sendData}>
        <h2 className="text-3xl font-bold mb-10">Add Category...</h2>
    
      
        
        <label className="block font-bold ">Category ID  :</label>
        <input className="mt-3 h-10 w-[555px] rounded-md" type="text" id="CategoryID" name="CategoryID" placeholder="   Enter category ID" required
        value ={CategoryID} onChange={(e)=>{

          setCategoryID(e.target.value);
        }}/>
          <div>
            {CategoryID.length<=0?
          <label className="text-sm text-red-700 ">Category ID can't be empty</label>:""}
        </div>

        <label className="block font-bold mt-5">Category Name :</label>  
        <input className=" mt-3 h-10 w-[555px] rounded-md" type="text" id="CategoryName" name="CategoryName" placeholder="   Enter category name" required
        value={CategoryName} onChange={(e)=>{

          setCategoryName(e.target.value);
        }}/>
        <div>
          { CategoryName.length<=0?
          <label className="text-sm text-red-700">Category name can't be empty</label>:""}
        </div>    

        <button className="bg-[#2E4960] p-2 mt-5 w-32 rounded-lg text-white hover:bg-[#0012]  font-bold " type="submit">Submit</button>
         
      </form>
      </div>
      </div>
      </div>
      </div>

    )

}