import {saveAs} from 'file-saver';
import axios from "axios";
import React, { useState, useEffect } from "react";



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
        const result =await axios.get(`http://localhost:8070/category/all_categories`);
        setCategories(result.data);
        console.log(result.data);

    }


const getInventry_Report =async() =>{
  
        await  axios.post(`http://localhost:8070/categoryReport/createPdf`,categories).then((respnse)=>{
        console.log(respnse)
        axios.get(`http://localhost:8070/categoryReport/fetchPdf`,{responseType:'blob'}).then((res)=>{

        const pdfBlob=new Blob([res.data],{type:'application/pdf'})

        saveAs(pdfBlob,'CategoryReport.pdf')

        })
   })
}


const getIssueItems= async()=>{
    const result =await axios.get(`http://localhost:8070/Inventry_IssueItems/getAllItems/`);
    setItems(result.data);
    console.log(result.data);

}


const getInventry_Report_Items =async() =>{
  
    await  axios.post(`http://localhost:8070/issueItemReport/createPdf`,items).then((respnse)=>{
    console.log(respnse)
    axios.get(`http://localhost:8070/issueItemReport/fetchPdf`,{responseType:'blob'}).then((res)=>{

    const pdfBlob=new Blob([res.data],{type:'application/pdf'})

    saveAs(pdfBlob,'issueItemReport.pdf')

    })
})
}








    return(
<div  style={{marginLeft:"250px"}}>
    
<div  style={{backgroundColor:" #ececf4",width:"800px"}}>
<table style={{marginTop:"220px",marginLeft:"200px"}}>
<tr>
    <th style={{width:"200px", height:"60px"}}>Category List</th>
    <td> <button onClick={getInventry_Report} style={{backgroundColor:"#080C39", color:"white",padding:"4px"}}>Genarate Report</button></td>   
</tr>
<tr>
    <th style={{width:"200px", height:"60px"}}>Issued Item List</th>
    <th> <button onClick={getInventry_Report_Items} style={{backgroundColor:"#080C39", color:"white",padding:"4px"}}>Genarate Report</button></th> 


</tr>
</table>

</div>
</div>

    )
}
export default InventryReport;
