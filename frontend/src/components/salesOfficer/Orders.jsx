import React from "react";
import PHeader from "../common/PHeader";
import SideBar from "./SideBar";
import Profile from "../common/Profile";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import editImg from "../../assets/edit.png";
import deleteImg from "../../assets/delete.png";


const Users = () => {

    const [ data , setData ] = useState([])
    const [formData, setFormData] = useState({
      name: "",
      date: "",
      phone: "",
      location: "",
      items: "",
      noi: "",
      reason: "",
      status: "",
      type: "physical"
    });
    const [ filteredData , setFilteredData ] = useState([])
    const [ searchTerm , setSearchTerm ] = useState('')

    const isNumberAndTenDigit = (str) => {
      return /^\d{10}$/.test(str);
    };

    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [ id , setId ] = useState("")
    const {name, date , phone , location , items , noi , reason , status , type } = formData;

    const onSearch = (e) => {

      const searchQuery = e.target.value.toLowerCase();
      const filteredResults = data.filter((item) => 
          item.name.toLowerCase().includes(searchQuery) ||
          item.phone.toLowerCase().includes(searchQuery) ||
          item.location.toLowerCase().includes(searchQuery) ||
          item.items.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filteredResults);
      setSearchTerm(searchQuery);
  }

    useEffect(()=>{

        axios.get("http://localhost:8080/api/order/")
        .then((res) => {
            setData(res.data)
            setFilteredData(res.data)
        })
        .catch(err => alert(err))
    
    }, []) 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const refreshPage = () => {
      axios.get("http://localhost:8080/api/order/")
      .then((res) => {
          setData(res.data)
          setFilteredData(res.data)
      })
    }

    const onEdit = (id) => {

      const items = formData.items.split(/[,\s]+/);
      const numItems = items.length;
        
      const newformData = { ...formData , status : "pending" , noi : numItems}
        const res = axios.put(`http://localhost:8080/api/order/${id}`, newformData)

        toast.success("orders updated successfully")
        setShowEditModal(false)
        setTimeout(function() {
          refreshPage()
          setFormData({})
        }, 2000);

        setFormData({})
    }

    const onDelete = (id) => {
        const res = axios.delete(`http://localhost:8080/api/order/${id}`)
          toast.success("orders deleted successfully")

        
        setTimeout(function() {
          refreshPage()
        }, 2000);

    }

    const onSubmit = () => {

      const noitems = formData.items.split(/[,\s]+/);
      const numItems = noitems.length;
        
      const newformData = { ...formData , status : "pending" , noi : numItems}
      
      const { name, date, phone, location, items, noi, reason, status, type } = newformData;

      if (!name || !date || !phone || !location || !items || !noi || !reason || !status || !type) {
        // If any of the required attributes are missing, show an error message and don't submit
        toast.error("Please fill in all required fields.");
        return;
      }

      if(!isNumberAndTenDigit(phone)){
        toast.error("Please enter a valid phone number.");
        return;
      }

        const res = axios.post("http://localhost:8080/api/order/", newformData).then((res) => {
          toast.success("orders added successfully")
        }).catch(err => alert(err))
    
        setTimeout(function() {
          refreshPage()
        }, 2000);
       
    }

  return (
    <>
      <div className="flex scroll-smooth">
        <SideBar />

        <div className=" flex-[85%]">
 
          <div
            style={{ }}
            className="bg-cover bg-center h-screen w-full fixed"
          >
            <div className=" w-full h-full bg-white shadow-lg rounded-xl">
                <PHeader />


                <h1 className="text-[30px] font-semibold ml-[150px] mt-5">Orders </h1>

                <button onClick={() => setShowCreateModal(true)} className="mb-[30px] ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">ADD</button>
<div className="h-[500px] overflow-y-scroll">

<div className="ml-[150px] ">
                <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]" type="text" placeholder="Search..." value={searchTerm} onChange={onSearch} />
            </div>
                  <table className=" mx-auto  w-[850px] h-[300px] ml-[150px]  ">
  
  <thead className=" bg-[#2E4960] text-white sticky top-0">
      <tr>
      <th className="p-3">Customer name</th>
      <th className="p-3">Date</th>
      <th className="p-3">Contact Number</th>
      <th className="p-3">Type </th>
      {/* <th className="p-3">category</th>
      <th className="p-3">qty</th> */}
      <th className="p-3">Delivery Location</th>
      <th className="p-3">Items </th>
      <th className="p-3">Total No of Items</th>
       <th className="p-3">Status</th>
      <th className="p-3">action</th>
      </tr>
  </thead>
  
  <tbody  className="bg-white text-center border-black ">
  {filteredData.map((items) => {
                        return(
  
                          <>
                          <tr className="hover:bg-[#efeeee] border-[2px]">
                            <td className="p-3 w-[350px]">{items.name}</td>
                            <td className="p-3 w-[350px]">{new Date(items.date).toLocaleDateString()}</td>
                            <td className="p-3 w-[150px]">{items.phone}</td>
                            <td className="p-3 w-[150px]">{items.type}</td>
                            <td className="p-3 w-[150px]">{items.location}</td>
                            <td className="p-3 w-[150px] text-left">
                                {items.items.split(", ").map((item) => (
                                  <span key={item}>{item}</span>
                                ))}
                              </td>
                            <td className="p-3 w-[150px]">{items.noi}</td>
                            <td className="p-3 w-[150px]">{items.status}</td>
                            {/* <td className="p-3 w-[250px]">{items.category}</td>
                            <td className="p-3">{items.qty}</td> */}
                          
                            <td className="p-3">
                            <div className="flex ml-12">

                            <button className="flex px-5 py-1 mr-5 bg-[#001233] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
                                onClick={() =>{ setShowOrderModal(true
                                ); setId(items._id);}}>
                                  ID
                                </button>

                                <button onClick={() => {setShowEditModal(true); setId(items._id);}} className=" items-center px-5 py-1 mr-5 bg-[#2E4960] w-[100px] text-white font-semibold hover:bg-[#1b3348] rounded-xl">
                                  <span
                                  className="flex">
                                  <img src={editImg} alt="" className="w-4 h-4 mr-2 mt-1" />
                                    Edit
                                  </span>
                                </button>
                    
                                <button className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
                                onClick={() => onDelete(items._id)}>
                                <img src={deleteImg} alt="" className="w-4 h-4 mr-2 mt-1" />
                                  Delete
                                </button>
                              </div>
                            </td>
                          
                          </tr>
                          </>
  
                        )
                      })}
  
                    
                      </tbody>
                      <div className=" h-96"></div>
  
                      </table>
</div>
            <div>

            </div>
            
            </div>
          </div>

        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50  overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[500px] rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 ">
              Add New Order
            </h2>
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
<input id="name" name="name" value={name} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

<label className="font-semibold text-sm text-gray-600 pb-1 block">Date</label>
<input id="date" name="date" value={date} onChange={onChange} type="date" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

<label className="font-semibold text-sm text-gray-600 pb-1 block">Phone</label>
<input id="phone" name="phone" value={phone} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

<label className="font-semibold text-sm text-gray-600 pb-1 block">Location</label>
<input id="location" name="location" value={location} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

<label className="font-semibold text-sm text-gray-600 pb-1 block">Item <p className="text-[12px]">(enter items with a space or , ex- item1,item2 item3)</p></label>
<input id="items" name="items" value={items} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

{/* <label className="font-semibold text-sm text-gray-600 pb-1 block">NOI</label>
<input id="noi" name="noi" value={noi} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" /> */}

<label className="font-semibold text-sm text-gray-600 pb-1 block">Reason</label>
<input id="reason" name="reason" value={reason} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

{/* <label className="font-semibold text-sm text-gray-600 pb-1 block">Status</label>
<select name="status" onChange={onChange} defaultValue="physical" >
  <option value="ready">Ready</option>
  <option value="pending">Pending</option>
</select> */}

<label className="font-semibold text-sm text-gray-600 pb-1 block">Type</label>
<select name="type" onChange={onChange} defaultValue="physical" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" >
  <option value="online">online</option>
  <option value="physical">physical</option>
</select>


<div className="flex">
                <button className="" onClick={() => setShowCreateModal(false)}>
                  Close
                </button>
                <button className="ml-auto" onClick={() => onSubmit()}>
                  Submit
                </button>
</div>
          </div>
        </div>
      )}

{showEditModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 ">
              Edit Order
            </h2>
            


<label className="font-semibold text-sm text-gray-600 pb-1 block">Item</label>
<input id="items" name="items" value={items} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />



{/* <label className="font-semibold text-sm text-gray-600 pb-1 block">Status</label>
<select name="status" onChange={onChange} defaultValue="physical" >
  <option value="ready">Ready</option>
  <option value="pending">Pending</option>
</select> */}

<label className="font-semibold text-sm text-gray-600 pb-1 block">Type</label>
<select name="type" onChange={onChange} defaultValue="physical" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" >
  <option value="online">online</option>
  <option value="physical">physical</option>
</select>

<div className="flex">
                <button className="" onClick={() => setShowEditModal(false)}>
                  Close
                </button>
                <button className="ml-auto" onClick={() => onEdit(id)}>
                  Submit
                </button>
</div>
          </div>
        </div>
      )}

      {showOrderModal && (
       <><h2 className="text-lg font-bold mb-4">Order details</h2>
       <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
         <div className="bg-white rounded-lg p-8">
           <label htmlFor="order-details" className="block font-medium mb-2">
             Order ID:
           </label>
           <input
             id="order-details"
             type="text"
             value={id}
             className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mb-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             placeholder="Enter order details"
           />

<div className="flex">
  <button className="" onClick={() => setShowOrderModal(false)}>
                    Close
                  </button>
             <button
               type="button"
               className="inline-flex  ml-auto items-center px-4 py-2 border border-transparent rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               onClick={() => {
                 const orderDetails = document.getElementById('order-details');
                 orderDetails.select();
                 document.execCommand('copy');
               }}
             >
               Copy
             </button>
</div>
         </div>
       </div>
       </>
      )}
    </>
  );
};

export default Users;
