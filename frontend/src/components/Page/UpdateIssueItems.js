import axios from "axios";
import { useEffect, useState,  } from "react";
import {Link} from 'react-router-dom';

import { useNavigate, useParams } from "react-router-dom";



export default function UpdateIssueItems(){

    const [Inventry_Item_ID, setInventry_Item_ID] = useState("");
  const [Inventry_Item_Name, setInventry_Item_Name] = useState("");
  const [Inventry_Item_DisplayName, setInventry_Item_DisplayName] = useState("");
  const [Inventry_Item_Description, setInventry_Item_Description] =useState("");
  const [Image, setImage] =useState("");
  const [Inventry_Item_Category, setInventry_Item_Category] =useState("");
  const [Inventry_Item_IssuedQuantity, setInventry_Item_IssuedQuantity] =useState("");
  const [Inventry_Item_Price, setInventry_Item_Price] =useState("");
  const [Inventry_Item_Discount, setInventry_Item_Discount] =useState("");
  const [Inventry_Item_SellPrice, setInventry_Item_SellPrice] =useState("");
  const [Inventry_Item_Weight, setInventry_Item_Weight] =useState("");
  const [Inventry_Item_ExDate, setInventry_Item_ExDate] =useState("");
  const [selectedCategory, setSelectedCategory] =useState("");




    const navigate = useNavigate();
    
    const params = useParams();

    console.log(params.id)

    useEffect(() => {
        
        const getCategory= async()=>{
            const result =await axios.get(`http://localhost:8080/category/all_categories`);
            setSelectedCategory(result.data);
            console.log(result.data);
        
          }
          getCategory();




        const getItemDetails = async() => {
    
            const result = await axios.get(`http://localhost:8080/Inventry_IssueItems/get_OneIssueItem/${params.id}`);
    
            const item = result.data

            // console.log(item1)

            // const item=item1[0]
    
            //console.log(item)
            
    
            setInventry_Item_ID(item.Inventry_Item_ID);
            setInventry_Item_Name(item.Inventry_Item_Name);
            setInventry_Item_DisplayName(item.Inventry_Item_DisplayName);
            setInventry_Item_Description(item.Inventry_Item_Description);
           
            setInventry_Item_Category(item.Inventry_Item_Category);
            setInventry_Item_IssuedQuantity(item.Inventry_Item_IssuedQuantity);
            setInventry_Item_Price(item.Inventry_Item_Price);
            setInventry_Item_Discount(item.Inventry_Item_Discount);
            setInventry_Item_SellPrice(item.Inventry_Item_SellPrice);
            setInventry_Item_Weight(item.Inventry_Item_Weight);
            setInventry_Item_ExDate(item.Inventry_Item_ExDate);
            
        }

        if(params.id){

        getItemDetails();}
    
        }, [params.id])


        function sendItemData(e){
            e.preventDefault();
          
            const newItem={
               
                Inventry_Item_ID,
                Inventry_Item_Name,
                Inventry_Item_DisplayName,
                Inventry_Item_Description,
                Image,
                Inventry_Item_Category,
                Inventry_Item_IssuedQuantity,
                Inventry_Item_Price,
                Inventry_Item_Discount,
                Inventry_Item_SellPrice,
                Inventry_Item_Weight,
                Inventry_Item_ExDate
          
            }


            axios.put(`http://localhost:8080/Inventry_IssueItems/update_IssueItem/${params.id}`,newItem).then(()=>{

          
            setInventry_Item_ID("");
            setInventry_Item_Name("");
            Inventry_Item_DisplayName("");
            setInventry_Item_Description("");
            setImage("");
            setInventry_Item_Category("");
            setInventry_Item_IssuedQuantity("");
            setInventry_Item_Price("");
            setInventry_Item_Discount("");
            setInventry_Item_SellPrice("");
            setInventry_Item_Weight("");
            setInventry_Item_ExDate("");

       
            navigate('/')
               
               
             }, 1000);
           }






           const ItemImageUpload = async (e) => {

            const file = e.target.files[0];
            
            const formData = new FormData();
            formData.append("image", file);
            const result1 = await axios.post(`http://localhost:8080/Inventry_IssueItems/upload`, formData); //path of (function) image upload in the category route file 
          
              setImage(result1.data.path);
              console.log(result1.data.path)
           
            
          
          }





        


           return(
            <div >
            <div >
           <div >
             <div className="IssueListButton">
               <li>
               <Link to ="/getAllItems" className= "aa" >View Issue Item List</Link> 
             </li>
            </div>
         
      <form className="form_category1" onSubmit={sendItemData} >
     
       <div class="form-row">
         <div class="col-md-3 mb-3">
           <label >Item ID  :</label>
           <input  type="text" class="form-control is-valid" placeholder="Enter Item ID"  required
           value={Inventry_Item_ID} onChange={(e)=>{setInventry_Item_ID(e.target.value);}}/>
         </div>
     
         <div class="form-group col-md-5">
           <label for="inputState">Item Name  :</label>
           <input value={Inventry_Item_Name} onChange={(e)=>{setInventry_Item_Name(e.target.value);}}   id="inputState" class="form-control" placeholder="Enter Item Name"  required />
         </div>
         <div class="form-group col-md-3" style={{marginLeft:"50px"}}>
           <label for="inputState">Category  :</label>
            
     
           <select class="form-control" value={Inventry_Item_Category} onChange={(event)=>setInventry_Item_Category(event.target.value)}  id="exampleFormControlSelect1" placeholder="Select Product Category"> 
         <option selected>Choose Category...</option>
     
           {selectedCategory.length>0 && selectedCategory.map((item) =>{
                 return(
                 <option value={item.CategoryName}>{item.CategoryName}</option>)
                 })
           }
         </select>
         </div>
      
       </div>
       <div class="form-group">
         <label for="exampleFormControlTextarea1">Item Description  :</label>
         <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={Inventry_Item_Description} onChange={(e)=>{setInventry_Item_Description(e.target.value);}} placeholder="Enter Item Description"></textarea>
       </div>
     
     
     
     
     
     
       <div class="container">
       <div class="row">
         <div class="col-sm-4">
           <br></br>  
           <div class="col-md-15 mb-3">
           <label for="validationServer04">Dispay Name  :</label>
           <input  type="text" class="form-control is-valid" placeholder="Enter Dispaly Name"  required
           value={Inventry_Item_DisplayName} onChange={(e)=>{setInventry_Item_DisplayName(e.target.value);}}/>
         </div>
           
     
           <br></br>
     
           <label>Upload Image  :</label>
       <div class="custom-file">
     
       <input  type="file" class="custom-file-input" id="customFile" onChange ={ItemImageUpload}/>
       <label class="custom-file-label" for="customFile">Enter Item Image  :</label>
       </div>
      </div>
     
     
     
     
         <div class="col-sm">
          <div class="form-row mt-4" >
         <div class="form-group col-md-8" style={{alignItems:"center",justifyContent:"center"}}>   
     {
        Image && (<img src={`http://localhost:8080/${Image}`}  class="rounded float-right w-50  " alt="..."/>)}
     
             </div>
           </div>   
          </div>
        </div>
     </div>
     
       <div class="form-row"style={{marginTop:"25px"}}>
         <div class="col-md-4 mb-3">
         
           <label for="validationServer03">Price  :</label>
           <div class="input-group">
           <span class="input-group-text" id="validationTooltipUsernamePrepend">Rs</span>
           <input type="text" class="form-control is-valid" id="validationServer03" placeholder="Enter Item Price" required value={Inventry_Item_Price} onChange={(e)=>{setInventry_Item_Price(e.target.value);}}/>
           </div >
           
         </div>
         <div class="col-md-4 mb-3">
           <label for="validationServer04">Discount  :</label>
           <div class="input-group">
           <input type="text" class="form-control is-valid" id="validationServer04" placeholder="Enter Discount" required value={Inventry_Item_Discount} onChange={(e)=>{setInventry_Item_Discount(e.target.value);}}/>
           <span class="input-group-text" id="validationTooltipUsernamePrepend">%</span>
           </div>
         </div>
         <div class="col-md-4 mb-3">
           <label for="validationServer05">Sell Price  :</label>
     
           <div class="input-group">
           <span class="input-group-text" id="validationTooltipUsernamePrepend">Rs</span>
           <input type="text" class="form-control is-valid" id="validationServer05" placeholder="Enter Sell Price" required value={Inventry_Item_SellPrice} onChange={(e)=>{setInventry_Item_SellPrice(e.target.value);}}/>
           </div>
      
         </div>
       </div>
       <div class="form-row" style={{marginTop:"18px"}} >
         <div class="col-md-4 mb-3">
           <label for="validationServer03">Issue Quantity :</label>
           <input type="text" class="form-control is-valid"  placeholder="Enter Issue Quantity" required value={Inventry_Item_IssuedQuantity} onChange={(e)=>{setInventry_Item_IssuedQuantity(e.target.value);}}/>
        
         </div>
         <div class="col-md-4 mb-3">
           <label for="validationServer04">Weight :</label>
           <input type="text" class="form-control is-valid" id="validationServer04" placeholder="Enter Item Weight" required value={Inventry_Item_Weight} onChange={(e)=>{setInventry_Item_Weight(e.target.value);}}/>
     
         </div>
         <div class="col-md-4 mb-3">
           <label for="validationServer05">Expire Date  :</label>
           <input type="date"  min={new Date().toISOString().split('T')[0]}  class="form-control is-valid" id="validationServer05"  required value={Inventry_Item_ExDate} onChange={(e)=>{setInventry_Item_ExDate(e.target.value);}}/>
       
         </div>
       </div>
     
       
       <button className="btn_category_add " type="submit">Submit Details</button>
     </form>
     
     </div>
     
     
           </div>
           </div>
           )
           
}