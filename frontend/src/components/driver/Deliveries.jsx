import React from "react";
import PHeader from "../common/PHeader";
import SideBar from "./SideBar";
import Profile from "../common/Profile";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import editImg from "../../assets/edit.png";
import deleteImg from "../../assets/delete.png";
import { logout, reset  } from "../../services/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";


const Users = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate()
    const [ data , setData ] = useState([])
    const [ formData , setFormData ] = useState({
        no : "",
        driver : "",
        order_date : "",
        delivery_date : "",
        location: "",
        status : "",
    })
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [ id , setId ] = useState("")
    const { no , driver , order_date , delivery_date , orderid, location } = formData;
    const [ filteredData , setFilteredData ] = useState([])
    const [ searchTerm , setSearchTerm ] = useState('')

    useEffect(()=>{
        axios.get("http://localhost:8080/api/deliveries/")
        .then((res) => {
            setData(res.data)
            setFilteredData(res.data)
        })
        .catch(err => alert(err))
    
    }, []) 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const refreshPage = () => {
      axios.get("http://localhost:8080/api/deliveries/")
      .then((res) => {
          setData(res.data)
          setFilteredData(res.data)
      })
    }

    const onEdit = (id) => {
        const res = axios.put(`http://localhost:8080/api/deliveries/${id}`, formData).then((res) => {
          toast.success("Updated successfully")
          setTimeout(function() {
            refreshPage()
            setFormData({})
          }, 2000);
        }).catch(err => toast.error("failed to update"))
   
     

        setShowEditModal(false)

    }

    const onDelete = (id) => {
        const res = axios.delete(`http://localhost:8080/api/deliveries/${id}`)
          toast.success("deliveries deleted successfully")

        
        setTimeout(function() {
          refreshPage()
        }, 2000);

    }

    const onSubmit = () => {
      if (!no || !driver  || !delivery_date || !orderid) {
        // If any of the required attributes are missing, show an error message and don't submit
        toast.error("Please fill in all required fields.");
        return;
      }

        const res = axios.post("http://localhost:8080/api/deliveries/", formData).then((res) => {
          toast.success("deliveries added successfully")
        }).catch(err => toast.error("failed to add deliveries"))
      
        
        setTimeout(function() {
          refreshPage()
          setFormData({})
        }, 2000);
       
    }

    const onSearch = (e) => {
      const searchQuery = e.target.value.toLowerCase();
      const filteredResults = data.filter((item) => 
          item.no.toLowerCase().includes(searchQuery) ||
          item.driver.toLowerCase().includes(searchQuery) ||
          item.status.toLowerCase().includes(searchQuery) ||
          item.orderid.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filteredResults);
      setSearchTerm(searchQuery);
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


                <h1 className="text-[30px] font-semibold ml-[150px] mt-5">Deliveries </h1>

                {/* <button onClick={() => setShowCreateModal(true)} className="mb-[30px] ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">ADD</button> */}
<div className="h-[500px] overflow-y-scroll">
<div className="ml-[150px] ">
                <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]" type="text" placeholder="Search..." value={searchTerm} onChange={onSearch} />
            </div>
                  <table className=" mx-auto  w-[850px] h-[300px] ml-[150px]  ">
  
  <thead className=" bg-[#2E4960] text-white sticky top-0">
      <tr>
      <th className="p-3">No</th>
      <th className="p-3">Driver</th>

      <th className="p-3">Delivery date</th>
      {/* <th className="p-3">category</th>
      <th className="p-3">qty</th> */}
          <th className="p-3">Location</th>
       <th className="p-3">Status</th>
       <th className="p-3">Order ID</th>
      <th className="p-3">action</th>
      </tr>
  </thead>
  
  <tbody  className="bg-white text-center border-black ">
  {filteredData.map((item) => {
                        return(
  
                          <>
                          <tr className="hover:bg-[#efeeee] border-[2px]">
                            <td className="p-3 w-[350px]">{item.no}</td>
                            <td className="p-3 w-[350px]">{item.driver}</td>
    
                            <td className="p-3 w-[150px]">{item.delivery_date}</td>
                            <td className="p-3 w-[150px]">{item.location}</td>
                            <td className="p-3 w-[150px]">{item.status}</td>
                            {/* <td className="p-3 w-[250px]">{item.category}</td>
                            <td className="p-3">{item.qty}</td> */}
                          <td className="p-3 w-[150px]">{item.orderid}</td>
                            <td className="p-3">
                            <div className="flex ml-12">
                                <button onClick={() => {setShowEditModal(true); setId(item._id);}} className=" items-center px-5 py-1 mr-5 bg-[#2E4960] w-[100px] text-white font-semibold hover:bg-[#1b3348] rounded-xl">
                                  <span
                                  className="flex">
                                  <img src={editImg} alt="" className="w-4 h-4 mr-2 mt-1" />
                                    Edit
                                  </span>
                                </button>
                    
                                <button className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
                                onClick={() => onDelete(item._id)}>
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
              Add New Deliveries
            </h2>
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add No</label>
<input  id="no" name="no" value={no} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Driver</label>
<input  id="driver"  name="driver" value={driver} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />



<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Delivery Date</label>
<input  id="delivery_date" min={new Date().toISOString().split('T')[0]}  name="delivery_date" value={delivery_date} onChange={onChange} type="date" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
 
<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Order ID</label>
<input  id="orderid" name="orderid" value={orderid} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
 
 


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
              Edit Deliveries
            </h2>
            

<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Location</label>
<input  id="location" name="location" value={location} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
 


               <select name="status" onChange={onChange} defaultValue="ongoing" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full">
  <option value="ongoing">ongoing</option>
  <option value="completed">completed</option>
  <option value="canceled">canceled</option>
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
    </>
  );
};

export default Users;
