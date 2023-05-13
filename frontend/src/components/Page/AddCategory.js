import React,{useState}  from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import './AddCategory.css';
import './AllCategory.css';

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

        
        <div >
          
        <div className="categoryListButton">
          <li>
          <Link to ="/all_categories" className= "aa" >View Category List</Link> 
        </li>
       </div>
       <div className="abc">
        <form className="form_category" onSubmit={sendData}>
        <h2>Add Category</h2>
        <br></br>
        <br></br>
        <label className="label_category" for="categoryName">Category Name :</label>
        <input className="input_category" type="text" id="CategoryName" name="CategoryName" placeholder="Enter category name" required
        value={CategoryName} onChange={(e)=>{

          setCategoryName(e.target.value);
        }}/>
        <div>
          { CategoryName.length<=0?
          <label className="cat_label">Category name can't be empty</label>:""}
        </div>
        
        <label className="label_category" for="categoryID">Category ID  :</label>
        <input className="input_category" type="text" id="CategoryID" name="CategoryID" placeholder="Enter category ID" required
        value ={CategoryID} onChange={(e)=>{

          setCategoryID(e.target.value);
        }}/>
          <div>
            {CategoryID.length<=0?
          <label className="cat_label">Category ID can't be empty</label>:""}
        </div>

          









        <button className="btn_category " type="submit">Submit</button>
         
      </form>
      </div>
      </div>

    )

}