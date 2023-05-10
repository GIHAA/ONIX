import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './DashboardInventry.css';


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
        
        <div className='container'>
            <h1 className='h1_text'>Inventry Details...</h1>
        <div className='divDashboard'><label>Total Issue Items</label>
        <br></br>
            <label className='labelDashboard'>{issueItems.length}</label>
        </div>
        <div className='divDashboard'><label>Total Categories</label>
        <br></br>
            <label className='labelDashboard'>{categories.length}</label>
        </div>
        <div className='divDashboard2'>
            <label>Expired Items </label>
            <br></br>
            <label className='labelDashboard'>0</label>
            
            </div>
        </div>
    )


}

export default DashboardInventry;