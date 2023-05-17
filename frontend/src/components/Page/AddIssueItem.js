import React,{useState , useEffect}  from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import './AddIssueItem.css';
import './AllIssueItems.css';

import SideBar from "../stockController/SideBar";
import AdminSideMenu from "../Layouts/AdminSideMenu";
import PHeader from "../common/PHeader";
import { toast } from "react-toastify";


//export is also in the same line 

export default function AddIssueItem(){

  const [Inventry_Item_ID, setInventry_Item_ID] = useState("");
  const [Inventry_Item_Name, setInventry_Item_Name] = useState("");
  const [Inventry_Item_DisplayName, setInventry_Item_DisplayName] = useState("");
  const [Inventry_Item_Language, setInventry_Item_Language] = useState("");
  const [Inventry_Item_Description, setInventry_Item_Description] =useState("");
  const [Image, setImage] =useState("");
  const [Inventry_Item_Category, setInventry_Item_Category] =useState("");
  const [Inventry_Item_IssuedQuantity, setInventry_Item_IssuedQuantity] =useState("");
  const [Inventry_Item_Price, setInventry_Item_Price] =useState("");
  const [Inventry_Item_Discount, setInventry_Item_Discount] =useState("");
  const [Inventry_Item_SellPrice, setInventry_Item_SellPrice] =useState("");
  const [Inventry_Item_Author, setInventry_Item_Author] =useState("");
  const [Inventry_Item_ExDate, setInventry_Item_ExDate] =useState("");
  const [selectedCategory, setSelectedCategory] =useState("");
  const [selectItems, setSelectItem] =useState("");


  
  useEffect(() => {
        
    getCategory();
    getItems();
    
   



  }, [])

  const getCategory= async()=>{
    const result =await axios.get(`http://localhost:8080/category/all_categories`);
    setSelectedCategory(result.data);
    console.log(result.data);

  }

  const getItems= async()=>{
    const result =await axios.get(`http://localhost:8080/api/stock/`);
    setSelectItem(result.data);
    console.log(result.data);

  }

  // const currentDate = new Date().toISOString().split("T")[0];
  // if (Inventry_Item_ExDate < currentDate) {
    
  //   console.error();;
  // }
  

  function sendData(e){
    e.preventDefault();
    //alert("Data inserted successfully");

    const newIssueItem ={
        Inventry_Item_ID,
        Inventry_Item_Name,
        Inventry_Item_DisplayName,
        Inventry_Item_Description,
        Inventry_Item_Language,
        Image,
        Inventry_Item_Category,
        Inventry_Item_IssuedQuantity,
        Inventry_Item_Price,
        Inventry_Item_Discount,
        Inventry_Item_SellPrice,
        Inventry_Item_Author,
        Inventry_Item_ExDate
        


    }
    //console.log(newCategory);

    axios.post("http://localhost:8080/Inventry_IssueItems/add_IssueItem",newIssueItem).then(()=>{
        
        setInventry_Item_ID("");
        setInventry_Item_Name("");
        setInventry_Item_DisplayName("");
        setInventry_Item_Language("");
        setInventry_Item_Description("");
        setImage("");
        setInventry_Item_Category("");
        setInventry_Item_IssuedQuantity("");
        setInventry_Item_Price("");
        setInventry_Item_Discount("");
        setInventry_Item_SellPrice("");
        setInventry_Item_Author("");
        setInventry_Item_ExDate("");
        toast("New Item Added Successfully")

    }).catch((err)=>{
      alert(err)
    })
  }


  //get item name part
  






  //image add
  const ItemImageUpload = async (e) => {

    const file = e.target.files[0];
    
    const formData = new FormData();
    formData.append("image", file);
    const result1 = await axios.post(`http://localhost:8080/Inventry_IssueItems/upload`, formData); //path of (function) image upload in the category route file 
  
      setImage(result1.data.path);
      console.log(result1.data.path)
   
    
  
  }







    return(

      <div class="flex scroll-smooth">
        <SideBar />
        <div class="w-full  h-full bg-white shadow-lg rounded-xl ">
           
          <PHeader />
          
          {/* <AdminSideMenu /> */}


<div className="p-8">
  <div>
    <div>
      <div class="IssueListButton">
        <li>
          <Link to="/getAllItems" >  <button className="bg-[#2E4960] p-4 mt-4 mb-4 w-60 rounded-lg text-white hover:bg-[#0012] ml-[880px] font-bold">View Issue Item List  </button></Link>
        </li>
      </div>

      <form class=" bg-gray-300 p-8" onSubmit={sendData}>
        <div class="grid grid-cols-3 gap-4">
          <div class="mb-3">
            <label class="block font-bold">Item ID:</label>
            <input type="text"  class="form-control is-valid w-full rounded-md border-gray-300 h-9 mt-2" placeholder="  Enter Item ID"
              required
              value={Inventry_Item_ID}
              onChange={(e) => { setInventry_Item_ID(e.target.value); }}  />
          </div>

          <div class="mb-3">
            <label class="block font-bold">Item Name:</label>
            <select
              class="form-control w-full rounded-md border-gray-300 mt-2 h-9"
              value={Inventry_Item_Name}
              onChange={(e) => {
                setInventry_Item_Name(e.target.value);
              }}
              placeholder="Enter Item Name"
              required
            >
              <option selected>Choose Item...</option>
              {selectItems.length > 0 && selectItems.map((item) => {
                  return (
                    <option value={item.name}>{item.name}</option>
                  );
                })}
            </select>
          </div>







          <div class="mb-3 ml-4">
            <label class="block font-bold">Category:</label>
            <select
              class="form-control w-full rounded-md border-gray-300 h-9 mt-2"
              value={Inventry_Item_Category}
              onChange={(event) =>
                setInventry_Item_Category(event.target.value)
              }
              id="exampleFormControlSelect1"
              placeholder="Select Product Category"
              required
            >
              <option selected>Choose Category...</option>

              {selectedCategory.length > 0 &&
                selectedCategory.map((item) => {
                  return (
                    <option value={item.CategoryName}> {item.CategoryName}   </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="block font-bold">Item Description:</label>
          <textarea
            class="form-control w-full rounded-md border-gray-300 mt-2"
            rows="3"
            value={Inventry_Item_Description}
            onChange={(e) => {
              setInventry_Item_Description(e.target.value);
            }}
            placeholder="  
            Enter Item Description"
          ></textarea>
        </div>


        <div class="col-md-4 mb-3">
      <label className="block font-bold">Language :</label>
      <input type="text" className="w-[580px] rounded-md h-9 mt-2" placeholder="  Enter Language" required value={Inventry_Item_Language} onChange={(e)=>{setInventry_Item_Language(e.target.value);}}/>

    </div>

    <div class="col-md-4 mb-3">
      <label className="block font-bold">Author :</label>
      <input type="text" className="w-[580px] rounded-md h-9 mt-2" placeholder="  Enter The Author's Name" required value={Inventry_Item_Author} onChange={(e)=>{setInventry_Item_Author(e.target.value);}}/>

    </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="mb-3">
              <label class="block font-bold">Display Name:</label>
              <input
                type="text"
                class="form-control is-valid w-full rounded-md border-gray-300 mt-2 h-9 "
                placeholder="  Enter Display Name"
                required
                value={Inventry_Item_DisplayName}
                onChange={(e) => {
                  setInventry_Item_DisplayName(e.target.value);
                }}
              />
            </div>

            <div>
              <label class="flex mt-6 block font-bold">Upload Image:</label>
              <div class="custom-file">
                <input
                  type="file"
                  class="block w-full text-sm text-slate-500 mt-2
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-50 file:text-gray-700
                  hover:file:bg-gray-500 "
                  id="customFile"
                  onChange={ItemImageUpload}
                />
             
  </div>
 </div>




    <div class="col-sm">
     <div class="form-row mt-4" >
    <div class="form-group col-md-8 flex items-center justify-center" style={{alignItems:"center",justifyContent:"center"}}>   
{
   Image && (<img src={`http://localhost:8080/${Image}`}  class="rounded float-right w-50  " alt="..."/>)}

        </div>
      </div>   
     </div>
   </div>
</div>

  <div class="grid grid-cols-5 gap-4 mt-10">
    <div class="col-md-4 mb-3">
      <label className="flex font-bold ">Price  :</label>
      <div class=" input-group mt-3">
      <span class="input-group-text font-bold" id="validationTooltipUsernamePrepend">Rs. </span>
      <input type="text" class="h-9 rounded-md w-36 text-center" id="validationServer03" placeholder="  Enter Item Price" required value={Inventry_Item_Price} onChange={(e)=>{setInventry_Item_Price(e.target.value);}}/>
      </div >   
    </div>

    <div class="col-md-4 mb-3 ">
      <label className="font-bold">Discount  :</label>
      <div class="input-group mt-3">
      <input type="text" class="h-9 rounded-md text-center w-36" id="validationServer04" placeholder="  Enter Discount" required value={Inventry_Item_Discount} onChange={(e)=>{setInventry_Item_Discount(e.target.value);}}/>
      <span className="font-bold "> %</span>
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label className="font-bold">Sell Price  :</label>

      <div class="input-group mt-3">
      <span class="font-bold" >Rs . </span>
      <input type="text" class="h-9 rounded-md text-center w-36" id="validationServer05" placeholder="  Enter Sell Price" value={Inventry_Item_Price*(100-Inventry_Item_Discount)/100} onChange={(e)=>{setInventry_Item_SellPrice(parseFloat(e.target.value));}}/>
      </div>
 
    </div>
  </div>





  <div class="grid grid-cols-5 gap-4 mt-6">
  <div class="form-row " >
    <div class="col-md-4 mb-3">

      <label className="block font-bold">Issue Quantity :</label>
      <input type="text" className="h-9 mt-2 rounded-md"  placeholder="  Enter Issue Quantity" required value={Inventry_Item_IssuedQuantity} onChange={(e)=>{setInventry_Item_IssuedQuantity(e.target.value);}}/>
      </div>

    </div>

 <div class="col-md-4 mb-3">
          <label className="font-bold">Expire Date:</label>
          <input type="date" class="block h-9 rounded-md w-40 text-center mt-2" required value={Inventry_Item_ExDate} onChange={(e) => {
              const selectedDate = e.target.value;
              const currentDate = new Date().toISOString().split("T")[0];
              if (selectedDate < currentDate) {
                toast("Please select a future date for the expiry date.");
                return;
              }
              setInventry_Item_ExDate(selectedDate);
            }}
          />
</div>
  </div>
  
  <button className="bg-[#2E4960] p-4 mt-5 w-44 rounded-lg text-white hover:bg-[#0012] ml-[880px] font-bold" type="submit">Submit Details</button>
</form>

</div>


      </div>
      </div>
      </div>
      </div>
    )

}