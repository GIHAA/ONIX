import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './DashboardInventry.css';
import SideBar from '../stockController/SideBar';
import PHeader from '../common/PHeader';
import AdminSidebar from '../Layouts/AdminSideMenu';

const DashboardInventry =() => {



    const [categories, setCategories]= useState([]);
    const [issueItems, setItems]= useState([]);
    const [count,setCount] = useState("");
    const [count1,setCount1] = useState("");
    const [exdate,setExdate] = useState("");
    const [selectItems, setSelectItem] =useState("");

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
    const getItems= async()=>{
      const result =await axios.get(`http://localhost:8080/api/stock/`);
      setSelectItem(result.data);
      console.log(result.data);
  
    }

    const getoutofstock = () => {
        const zeroStockItems = issueItems.filter(item => item.Inventry_Item_IssuedQuantity === 0);
        const zeroStockItemsWithInfo = zeroStockItems.map(item => ({
          id: item.Inventry_Item_ID,
          name: item.Inventry_Item_Name
        }));
        setCount(zeroStockItemsWithInfo);
      }


      const getlowstock = () => {
        const lowStockItems = issueItems.filter(item => item.Inventry_Item_IssuedQuantity < 10);
        const lowStockItemsWithInfo = lowStockItems.map(item => ({
          id: item.Inventry_Item_ID,
          name: item.Inventry_Item_Name
        }));
        setCount1(lowStockItemsWithInfo);
      }


    // const getlowstock=()=>{
    //     const countLowStock = issueItems.filter(item => item.Inventry_Item_IssuedQuantity <10).length;
    //     setCount1(countLowStock)
    // }
    const getExDate = () => {
        let currentDate = new Date();                        // Get the current date
      
        let expiredItems = issueItems.filter(item => {       //get the ex date
          let expiryDate = new Date(item.Inventry_Item_ExDate);
          return expiryDate < currentDate;                   //check and return it

        });
      
        setExdate(expiredItems);
      };
      



    getIssueItems();
    getCategories();
    getoutofstock();
    getlowstock();
    getExDate();
    getItems();

     }, [issueItems])



    return(
    <div class="flex scroll-smooth">
    <SideBar />
    <div class="w-full h-full bg-white shadow-lg rounded-xl">
        <PHeader />
        {/* <AdminSidebar/> */}
        <div className="ml-10">
          


        <div class='flex flex-wrap'>
        <div class='bg-gray-300 h-45 w-96 border-4 border-blue-900 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Total Issue Items</label>
                    <label class='text-5xl'>{issueItems.length}</label><br/>
                    <Link to="/getAllItems" > <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label></Link>
                </div>
                <div class='bg-gray-300 h-45 w-96 border-4 border-blue-900 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Total Categories</label>
                    <label class='text-5xl'>{categories.length}</label>
                    <br/>
                    <Link to ="/all_categories"  > <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label></Link>
                </div>
                <div class='bg-gray-300 h-45 w-96 border-4 border-blue-900 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Total Stock Items</label>
                    <label class='text-5xl'>{selectItems.length}</label>
                    <br/>
                    <Link to ="/stock"  > <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label></Link>
                </div>

                </div>
            <div class='flex flex-wrap'>
             
                <div class='bg-gray-300 h-45 w-96 border-4 border-red-700 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Expired Items</label>
                    <label class='text-5xl'>{exdate.length}</label>
                     <br/>  
                     <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label>


                </div>
                <div class='bg-gray-300 h-45 w-96 border-4 border-red-700 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Out of Stock(Issued)</label>
                    <label class='text-5xl'>{issueItems.filter(item => item.Inventry_Item_IssuedQuantity === 0).length}</label>
                    <br/>  
                    <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label>

                </div>
                <div class='bg-gray-300 h-45 w-96 border-4 border-red-700 rounded-xl p-3 mr-8 mt-8 text-center text-3xl font-bold'>
                    <label class='block mb-4'>Low Stock(Issued)</label>
                    <label class='text-5xl'>{issueItems.filter(item => item.Inventry_Item_IssuedQuantity <10).length}</label>
                    <br/>  
                    <label ><button className="bg-[#2E4960]  p-1 text-white hover:bg-[#0012] text-sm rounded-md">View Details</button></label>

                </div>
            </div>



    {/* <div>  
        <table>
              <tbody>
            <tr>
                <th>Out of stock(Issued)</th>
                <th>Low Stock(Issued)</th>
                <th>Expired Items(Issued)</th>
            </tr>


            </tbody>


        </table>
    </div>       */}
    {/* <hr className='border-4 mt-10 border-black-700'></hr> */}

<div class="bg-gray-100 grid grid-cols-3 gap-4 mt-10 mb-24 mr-8">
                <div class=' h-45 w-96 border-6  rounded-xl p-3 mr-8 mt-8 text-center text-[18px] '>
                <label className='flex mb-6 font-bold ml-24 text-red-700'>Expired Item List</label>
                {exdate.length > 0 && (
          <div className='pl-8'>
           
            <table >
              <thead className='bg-gray-400'>
                <tr>
                  <th className='p-3 border-2'>Item ID</th>
                  <th className='p-3 border-2'>Name</th>
                  <th className='p-3 border-2'>Expiry Date</th>
                </tr>
              </thead>
              <tbody className='bg-gray-300'>
                {exdate.map(item => (
                  <tr key={item.id}>
                    <td className='border-2'>{item.Inventry_Item_ID}</td>
                    <td className='border-2'>{item.Inventry_Item_Name}</td>
                    <td className='border-2'>{item.Inventry_Item_ExDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
   </div>
      


     <div class=' h-45 w-96 border-6  rounded-xl p-3 mr-8 mt-8 text-center text-[18px]   '>
     <label className='flex mb-6 font-bold ml-28 text-red-700'>Out of Stock List</label>
         {count.length > 0 && (
          <div className='pl-20 '>
           
            <table >
              <thead className='bg-gray-400' >
                <tr>
                  <th className='p-3 border-2'>Item ID</th>
                  <th className='p-3 border-2'>Item Name</th>
                </tr>
              </thead>
              <tbody className='bg-gray-300'>
                {count.map(item => (
                  <tr key={item.id}>
                    <td className='border-2'>{item.id}</td>
                    <td className='border-2'>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
     </div>


     <div class=' h-45 w-96 border-6  rounded-xl p-3 mr-8 mt-8 text-center text-[18px]  '>
     <label className='flex mb-6 font-bold ml-28 text-red-700'>Low Stock List</label>  
     {count1.length > 0 && (
          <div className='pl-20 '>
           
            <table className=''>
              <thead className='bg-gray-400'>
                <tr>
                  <th className='p-3 border-2'>Item ID</th>
                  <th className='p-3 border-2'>Item Name</th>
                </tr>
              </thead>
              <tbody className='bg-gray-300'>
                {count1.map(item => (
                  <tr key={item.id}>
                    <td className='border-2'>{item.id}</td>
                    <td className='border-2'>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
     </div>
    </div>
        
    </div>
    </div>
    </div>

    )


}

export default DashboardInventry;