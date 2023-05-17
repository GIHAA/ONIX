import {saveAs} from 'file-saver';
import axios from "axios";
import React, { useState, useEffect } from "react";

import PHeader from '../common/PHeader';
import SideBar from '../stockController/SideBar';
import AdminSideMenu from '../Layouts/AdminSideMenu';

function InventryReport(){


//get value of select button
//set result for relavant details 
const [categories, setCategories]= useState([]);
const [items,setItems] =useState([]);



    useEffect(() => {
        
        getCategories();
        getIssueItems();
    }, [])

const getCategories= async()=>{
        const result =await axios.get(`http://localhost:8080/category/all_categories`);
        setCategories(result.data);
        console.log(result.data);

    }
const getInventry_Report =async() =>{
  
        await  axios.post(`http://localhost:8080/categoryReport/createPdf`,categories).then((respnse)=>{
        console.log(respnse)
        axios.get(`http://localhost:8080/categoryReport/fetchPdf`,{responseType:'blob'}).then((res)=>{

        const pdfBlob=new Blob([res.data],{type:'application/pdf'})

        saveAs(pdfBlob,'CategoryReport.pdf')

        })
   })
}
const getIssueItems= async()=>{
    const result =await axios.get(`http://localhost:8080/Inventry_IssueItems/getAllItems/`);
    setItems(result.data);
    console.log(result.data);

}
const getInventry_Report_Items =async() =>{
  
    await  axios.post(`http://localhost:8080/issueItemReport/createPdf`,items).then((respnse)=>{
    console.log(respnse)
    axios.get(`http://localhost:8080/issueItemReport/fetchPdf`,{responseType:'blob'}).then((res)=>{

    const pdfBlob=new Blob([res.data],{type:'application/pdf'})

    saveAs(pdfBlob,'issueItemReport.pdf')

    })
})
}



    return(

<div class="flex scroll-smooth">
<SideBar />
<div class="w-full  h-full bg-white  rounded-xl ">
    <PHeader />
    {/* <AdminSideMenu /> */}


<div className="mt-32 pl-[400px] pr-[400px]">
  <div className="bg-gray-300 p-7 shadow-lg rounded-2xl">
    <label className=" font-bold text-3xl">Inventry Reports..</label>
    <table className="mt-7 w-full ">
      <tr>
        <th className="w-52 h-14">Category List</th>
        <th>
          <button onClick={getInventry_Report} className="bg-[#2E4960] hover:bg-[#0012] hover:text-black font-bold text-white px-4 py-2 rounded px-4 py-1 ">
            Generate Report
          </button>
        </th>
      </tr>
      <tr>
        <th className="w-52 h-14">Issued Item List</th>
        <th>
          <button onClick={getInventry_Report_Items} className="bg-[#2E4960] hover:bg-[#0012] hover:text-black font-bold text-white px-4 py-2 rounded px-4 py-1">
            Generate Report
          </button>
        </th>
      </tr>
    </table>
  </div>
</div>
</div>
</div>
    )
}
export default InventryReport;
