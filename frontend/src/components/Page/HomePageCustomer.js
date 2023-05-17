import React, {useState,useEffect} from 'react';
import axios from "axios";
import PHeader from '../common/PHeader';
import {Link} from 'react-router-dom';
import { motion } from "framer-motion"

import image1 from '../Layouts/Images/i1.jpg'
import image2 from '../Layouts/Images/i2.jpg'
import image3 from '../Layouts/Images/i3.jpg'


const images = [image1, image2, image3];

export default function HomePageCustomer(){

    const [issuedItems, setIssuedItems]= useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] =useState("");

    useEffect(() => {


   getCategory();

    getAllItems();

    },[])

    const getAllItems= async()=>{
        const result =await axios.get(`http://localhost:8080/Inventry_IssueItems/getAllItems/`);
        setIssuedItems(result.data);
        console.log(result.data);

    }

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((currentIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);


     
      }, [currentIndex]);

      const getCategory= async()=>{
        const result =await axios.get(`http://localhost:8080/category/all_categories`);
        setSelectedCategory(result.data);
        console.log(result.data);
    
      }


    //search method

    const searchItemHandle = async (e)=>{
      let key = e.target.value;
      if(key){
          let result = await fetch(`http://localhost:8080/Inventry_IssueItems/search_IssueItem/${key}`)
          result = await result.json()
          if(result){
            setIssuedItems(result)
          }
      }else{
        getAllItems();
      }
  }



return(
    <div class="w-full  h-full bg-white shadow-lg rounded-xl ">
           
    <PHeader />



    <div className="relative w-full h-96 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slider ${index}`}
          className={`absolute top-0 left-0 w-full h-96 object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>




<div className='flex flex-wrap  mt-10 p-2 bg-gray-200'>

<div className="mb-3 ml-32 mt-6">
  <label className="font-bold text-2xl">Select Category</label>
  <motion.select whileHover={{ scale: 1.3}}
    className="block w-[120px] rounded-md border-gray-300 bg-gray-200 h-9" onChange={searchItemHandle}>
    <option value="">All Items</option> {/* Set value as empty string */}
            {selectedCategory.length > 0 &&
              selectedCategory.map((item) => (
                <option key={item.CategoryName} value={item.CategoryName}>
                  {item.CategoryName}
                </option>
              ))}
  </motion.select>
</div>





    <form class="flex justify-center mt-8 ml-48">
              <input class="form-input w-80 h-10 border-4 border-gray-300 ml-16 rounded-md" type="search" placeholder="  Search Items..." aria-label="Search" onChange={searchItemHandle}/>
    </form>
    
  
</div>


    <motion.div class='flex flex-wrap ml-32 mt-10 p-2' 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay: 0.5, duration: 2}}
    
    >
    {issuedItems.length>0 ?  issuedItems.map((item) =>
    <motion.div whileHover={{scale:1.2, boxShadow: "8px 8px 8px rgb(100,100,100)",}} key={getAllItems._id} class='bg-gray-300   border-4 border-blue-900 rounded-xl p-3 mr-28 mt-8 text-center text-2xl font-bold'>
       
        
        <label class='block mb-4 text-xl'> {item.Inventry_Item_DisplayName}</label>
       <Link to={"/ItemView/"+item._id}><label><motion.img whileHover={{scale:1.1, textShadow: ""}} src={`http://localhost:8080${item.Image}`} class="w-28 h-30 " /></label><br/></Link> 
        <label class='block mb-6'> Rs. {item.Inventry_Item_Price*(100-item.Inventry_Item_Discount)/100}</label>
      
        <Link to={"/ItemView/"+item._id}>     <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Item</button></label></Link> 
    </motion.div>
   
    
        ):<label className="text-2xl w-56 font-bold tb-[500xzpx]">No Result Found...</label>  }
         </motion.div>
    </div>

    

    )





}