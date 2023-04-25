import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddCategory.css';
import './AllCategory.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";






export default function AllCategory(){

    const [categories, setCategories]= useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        getCategories();
    }, [])

    const getCategories= async()=>{
        const result =await axios.get(`http://localhost:8070/category/all_categories`);
        setCategories(result.data);
        console.log(result.data);

    }

    // delete one item
    const DeleteCategory = async (id)=> {
        console.warn(id)
        let result =await fetch(`http://localhost:8070/category/delete/${id}`,{
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
            let result = await fetch(`http://localhost:8070/category/searchCategory/${key}`)
            result = await result.json()
            if(result){
                setCategories(result)
            }
        }else{
            getCategories();
        }
    }



    return(

    	<div class="container" className="categoryList">
        <h2>Category List....</h2>
        <br/>
        <div className="btnAddCategory">
        
         </div>
        <form className="form-inline my-2 my-lg-0">

      <input className="form-control mr-sm-2" style={{width:"335px",borderWidth:"2px",borderColor:"#080C39"}} type="search" placeholder="Search Category or ID" aria-label="Search" onChange ={searchHandle}/>
      <a className="aa" href="add">Add Category</a>
     <Link to = "/inventryReport"><button className="searchBtn" type="submit">Generate Report</button></Link>
      
   
    
    </form>

        <br/>
         <table class="table">
            <thead class="thead-light">
                <tr>
                <th scope="col">Category ID</th>
                <th scope="col">Category Name</th>
                
              
                <th></th>
                <th></th>
                </tr>
           </thead>
          <tbody>
            { categories.length>0 ? categories.map((item) =>
                <tr key={item._id}>
                  
                    <td className="tdID">{item.CategoryID}</td>
                    <td className="tdName">{item.CategoryName}</td>
                    


                    <td className="tdButton"><Link to={"/update/"+item._id}><button className="btnUpdate">Update</button></Link></td>
                    <td className="tdButton"><button onClick={()=>DeleteCategory(item._id)} className="btnDelete">Delete</button></td>
                </tr>
            )
            :<h1>No Result Found..</h1>
        }
          </tbody>
        </table>

    </div>
    )
}