import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import PHeader from '../common/PHeader';

export default function ItemView() {
  const [item, setItem] = useState({});
  const params = useParams();
  let [quantity,setNumber] = useState(1);
  let [discounts,setDiscount] = useState();
  let [prices,setPrices] = useState();

  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios.get(`http://localhost:8080/Inventry_IssueItems/get_OneIssueItem/${params.id}`);
      setItem(response.data);

      if (response.data.Inventry_Item_Discount > 0) {
        setDiscount("Discount  :  "+response.data.Inventry_Item_Discount+" %");
        setPrices("Rs. "+response.data.Inventry_Item_Price)
      }

    };

    if (params.id) {
      fetchItem();
    }
  }, [params.id]);


  function increment(){
    setNumber(++quantity)
}


function uincrement(){
    if(quantity>1){
    setNumber(--quantity)}
}


  return (
    <div>
             <div class="w-full  h-full bg-white shadow-lg rounded-xl ">
           
           <PHeader />

      <div className="flex flex-wrap ml-28 mt-16 p-10">
        <div className="bg-gray-300 border-8 border-blue-900 rounded-xl p-7 mr-32 mt-1 text-center text-2xl font-bold">  
         <label>
              <img src={`http://localhost:8080${item.Image}`} className="w-60 h-90" />
        </label>
        </div>


        <div className="flex flex-wrap  bg-gray-300 border-1  border-blue-900 rounded-xl p-8 mr-32 mt-1   font-bold"style={{ width: '700px', height:'' }}>
          
        <div>
         <div><label className="block mb-4 text-5xl">{item.Inventry_Item_DisplayName}</label></div>

         <div ><input className="bg-gray-300 w-28 text-2xl line-through" value={prices}/>
         <input className="bg-gray-300  text-1xl mt-1" value={discounts}/></div>
       
         <div><label className="block mb-6 mt-4 text-2xl">Rs. {item.Inventry_Item_Price * (100 - item.Inventry_Item_Discount) / 100}</label></div>
        
      
        
            <div class="d-flex mb-4">
                <button  class="btn btn-primary px-1 me-2 mr-3 mb-4 bg-[#2E4960] text-white w-8 h-8" onClick={e =>uincrement()} >
                    -
                </button>  

                    <input value={quantity} className='bg-gray-100 text-center w-10 h-8'  />           
                
                <button onClick={e =>increment()}class="btn btn-primary px-3 ms-2 ml-3 mb-4 bg-[#2E4960] text-white w-8 h-8" >
                    +
                </button>              
            </div>
        
   
        
         <button className="bg-[#2E4960] p-3 w-28 text-white hover:bg-[#0012] text-sm rounded-md">Add to cart</button>
         

         <div className='mt-4 '>Discription<label className="block mb-4 text-2xl mt-3">{item.Inventry_Item_Description}</label></div>









         
        </div>







         </div>
     </div>
    </div>
    </div>


  );
}
