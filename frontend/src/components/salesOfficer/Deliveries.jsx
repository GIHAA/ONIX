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
    const [ formData , setFormData ] = useState({
        no : "",
        driver : "",
        order_date : "",
        delivery_date : "",
        status : "",
    })
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [ id , setId ] = useState("")
    const { no , driver , order_date , delivery_date } = formData;

    useEffect(()=>{

        axios.get("http://localhost:8080/api/deliveries/")
        .then((res) => {
            setData(res.data)
        })
        .catch(err => alert(err))
    
    }, []) 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const refreshPage = () => {
      axios.get("http://localhost:8080/api/deliveries/")
      .then((res) => {
          setData(res.data)
      })
    }

    const onEdit = (id) => {
        const res = axios.put(`http://localhost:8080/api/deliveries/${id}`, formData)

        alert(JSON.stringify(formData))
        toast.success("Users updated successfully")
        setShowEditModal(false)
        setTimeout(function() {
          refreshPage()
          setFormData({})
        }, 2000);
    }

    const onDelete = (id) => {
        const res = axios.delete(`http://localhost:8080/api/deliveries/${id}`)
          toast.success("Users deleted successfully")

        
        setTimeout(function() {
          refreshPage()
        }, 2000);

    }

    const onSubmit = () => {


        const res = axios.post("http://localhost:8080/api/deliveries/", formData).then((res) => {
          toast.success("Users added successfully")
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


                <h1 className="text-[30px] font-semibold ml-[150px] mt-5">Deliveries </h1>

                <button onClick={() => setShowCreateModal(true)} className="mb-[30px] ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">ADD</button>
<div className="h-[500px] overflow-y-scroll">
                  <table className=" mx-auto  w-[850px] h-[300px] ml-[150px]  ">
  
  <thead className=" bg-[#2E4960] text-white sticky top-0">
      <tr>
      <th className="p-3">No</th>
      <th className="p-3">Driver</th>
      <th className="p-3">Order date</th>
      <th className="p-3">Delivery date</th>
      {/* <th className="p-3">category</th>
      <th className="p-3">qty</th> */}
       <th className="p-3">Status</th>
      <th className="p-3">action</th>
      </tr>
  </thead>
  
  <tbody  className="bg-white text-center border-black ">
  {data.map((item) => {
                        return(
  
                          <>
                          <tr className="hover:bg-[#efeeee] border-[2px]">
                            <td className="p-3 w-[350px]">{item.no}</td>
                            <td className="p-3 w-[350px]">{item.driver}</td>
                            <td className="p-3 w-[150px]">{item.order_date}</td>
                            <td className="p-3 w-[150px]">{item.delivery_date}</td>
                            <td className="p-3 w-[150px]">{item.status}</td>
                            {/* <td className="p-3 w-[250px]">{item.category}</td>
                            <td className="p-3">{item.qty}</td> */}
                          
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
              Add New Users
            </h2>
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add No</label>
<input  id="no" name="no" value={no} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Driver</label>
<input  id="driver" name="driver" value={driver} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Order Date</label>
<input  id="order_date" name="order_date" value={order_date} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Delivery Date</label>
<input  id="delivery_date" name="delivery_date" value={delivery_date} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
 



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
              Edit Users
            </h2>
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add No</label>
<input  id="no" name="no" value={no} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Driver</label>
<input  id="driver" name="driver" value={driver} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Order Date</label>
<input  id="order_date" name="order_date" value={order_date} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Delivery Date</label>
<input  id="delivery_date" name="delivery_date" value={delivery_date} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

               <select name="status" onChange={onChange} defaultValue="ongoing" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full">
  <option value="ongoing">ongoing</option>
  <option value="processing">processing</option>
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
