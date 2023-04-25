import axios from "axios";
import { useEffect, useState,  } from "react";
import {Link} from 'react-router-dom';

import { useNavigate, useParams } from "react-router-dom";



export default function UpdateCategory(){

    const [CategoryName, setCategoryName] = useState("");
    const [CategoryID, setCategoryID] = useState("");
    //image
    const [Image, setImage] =useState("");



    const navigate = useNavigate();
    
    const params = useParams();

    useEffect(() => {
        


        const getCategoryDetails = async() => {
    
            const result = await axios.get(`http://localhost:8070/category/get/${params.id}`);
    
            const item = result.data
    
            console.log(item);
            
    
            setCategoryName(item.CategoryName);
            setCategoryID(item.CategoryID);

            
        }
    
        getCategoryDetails();
    
        }, [])


        function sendCustomerData(e){
            e.preventDefault();
          
            const newCategory={
               
              CategoryName,
              CategoryID,
              Image
          
          
            }


            axios.put(`http://localhost:8070/category/update/${params.id}`,newCategory).then(()=>{

            setCategoryName("");
            setCategoryID("");

       
            navigate('/all_categories')
               
               
             }, 1000);
           }






           const ItemImageUpload = async (e) => {

            const file = e.target.files[0];
            
            const formData = new FormData();
            formData.append("image", file);
            const result1 = await axios.post(`http://localhost:8070/category/upload`, formData); //path of (function) image upload in the category route file 
          
              setImage(result1.data.path);
              console.log(result1.data.path)
           
            
          
          }





        


           return(

            <div >
          
            <div className="categoryListButton" >
              <li>
              <Link to ="/all_categories" className= "aa">View Category List</Link> 
            </li>
           </div>
           <div className="abc">
            <form className="form_category" onSubmit={sendCustomerData}>
            <h2 >Update Category</h2>
            <br></br>
            <br></br>
            <label className="label_category" for="categoryName">Category Name :</label>
            <input className="input_category" type="text" id="CategoryName" name="CategoryName" placeholder="Enter category name" required
            value={CategoryName} onChange={(e)=>setCategoryName(e.target.value)} />
            
            <label className="label_category" for="categoryID">Category ID  :</label>
            <input className="input_category" type="text" id="CategoryID" name="CategoryID" placeholder="Enter category ID" required
            value={CategoryID} onChange={(e)=>setCategoryID(e.target.value)}/>










    
            <button className="btn_category " type="submit">Submit</button>
             
          </form>
          </div>
          </div>
















            


          
           )
           
}