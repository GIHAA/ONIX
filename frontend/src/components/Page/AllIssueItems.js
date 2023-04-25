import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddIssueItem.css';
import './AllIssueItems.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";



export default function AllIssueItems(){

    const [issueItems, setItems]= useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        getIssueItems();
    }, [])

    const getIssueItems= async()=>{
        const result =await axios.get(`http://localhost:8070/Inventry_IssueItems/getAllItems/`);
        setItems(result.data);
        console.log(result.data);

    }










    // delete one item
    const DeleteIssueItem = async (id)=> {
        console.warn(id)
        let result =await fetch(`http://localhost:8070/Inventry_IssueItems/delete_IssueItem/${id}`,{
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
            let result = await fetch(`http://localhost:8070/Inventry_IssueItems/search_IssueItem/${key}`)
            result = await result.json()
            if(result){
                setItems(result)
            }
        }else{
            getIssueItems();
        }
    }



    return(

    	<div class="container" className="ItemList">
        <h2 >Issue Item List....</h2>
        <br/>
 
        <form className="form-inline my-2 my-lg-0">

      <input className="form-control mr-sm-2" style={{width:"400px",borderWidth:"2px",borderColor:"#080C39"}} type="search" placeholder="Search Category or ID" aria-label="Search" onChange ={searchItemHandle}/>
      
      <Link to = "/add_IssueItem"><button className="addItemBtn1" type="submit"> Add New Issue Item</button></Link>
     <Link to = "/inventryReport"><button className="Generate_Reportbtn" type="submit">Generate Report</button></Link>
      
   
    
    </form>
    <div>

        <br/>
         <table class="table">
            <thead class="tableheader">
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Display.Name</th>
                <th scope="col">Category </th>
                <th scope="col">Description</th>
                <th scope="col">Image </th>
                <th scope="col">Issue.Qnt </th>     
                <th scope="col">Price </th>
                <th scope="col">Discount </th>
                <th scope="col">Sell.Price </th>
                <th scope="col">Weight </th>
                <th scope="col">Ex.Date </th>

                <th></th>
                <th></th>
                </tr>
           </thead>
          <tbody>
            <br></br>
            { issueItems.length>0 ? issueItems.map((item) =>
                <tr key={item._id}>
                  
                    <td className="tdID1">{item.Inventry_Item_ID}</td>
                    <td className="">{item.Inventry_Item_Name}</td>         
                    <td className="tdID1">{item.Inventry_Item_DisplayName}</td>
                    <td className="">{item.Inventry_Item_Category}</td>
                    <td className="tdID1">{item.Inventry_Item_Description}</td>
                    <td ><img src ={`http://localhost:8070${item.Image}`} style={{width:"50px",height:"50px"}}/></td>
                    
                    <td className="tdID">{item.Inventry_Item_IssuedQuantity}</td>
                    <td className="">{item.Inventry_Item_Price}</td>
                    <td className="tdID">{item.Inventry_Item_Discount}</td>
                    <td className="">{item.Inventry_Item_SellPrice}</td>
                    <td className="tdID">{item.Inventry_Item_Weight}</td>
                    <td className="">{item.Inventry_Item_ExDate}</td>



                    <td className="tdButton"><Link to={"/update_IssueItem/"+item._id}><button className="btnUpdate">Update</button></Link></td>
                    <td className="tdButton"><button onClick={()=>DeleteIssueItem(item._id)} className="btnDelete">Delete</button></td>
                </tr>
            )
            :<h1>No Result Found..</h1>
        }
          </tbody>
        </table>
        </div>

    </div>
    )
}