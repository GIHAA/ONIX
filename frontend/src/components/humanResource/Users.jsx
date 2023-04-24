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
        name : "",
        email : "",
        role : "",
    })
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [ id , setId ] = useState("")
    const { about, details } = formData;

    useEffect(()=>{

        axios.get("http://localhost:8080/api/users/")
        .then((res) => {
            setData(res.data)
        })
        .catch(err => alert(err))
    
    }, []) 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const refreshPage = () => {
      axios.get("http://localhost:8080/api/users/")
      .then((res) => {
          setData(res.data)
      })
    }

    const onEdit = (id) => {
        const res = axios.put(`http://localhost:8080/api/users/${id}`, formData)
        toast.success("Users updated successfully")
        setShowEditModal(false)
        setTimeout(function() {
          refreshPage()
          setFormData({})
        }, 2000);
    }

    const onDelete = (id) => {
        const res = axios.delete(`http://localhost:8080/api/users/${id}`)
          toast.success("Users deleted successfully")

        
        setTimeout(function() {
          refreshPage()
        }, 2000);

    }

    const onSubmit = () => {


        const res = axios.post("http://localhost:8080/api/users/", formData).then((res) => {
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


                <h1 className="text-[30px] font-semibold ml-[150px] mt-5">Users </h1>

                <button onClick={() => setShowCreateModal(true)} className="mb-[30px] ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">ADD</button>
<div className="h-[500px] overflow-y-scroll">
                  <table className=" mx-auto mt-[50px] w-[850px] h-[300px] ml-[150px]  ">
  
  <thead className=" bg-[#2E4960] text-white sticky top-0">
      <tr>
      <th className="p-3">Name</th>
      <th className="p-3">Email</th>
      <th className="p-3">Role</th>
      {/* <th className="p-3">category</th>
      <th className="p-3">qty</th> */}
      <th className="p-3">action</th>
      </tr>
  </thead>
  
  <tbody  className="bg-white text-center border-black ">
  {data.map((item) => {
                        return(
  
                          <>
                          <tr className="hover:bg-[#efeeee] border-[2px]">
                            <td className="p-3 w-[350px]">{item.name}</td>
                            <td className="p-3 w-[350px]">{item.email}</td>
                            <td className="p-3 w-[150px]">{item.role}</td>
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
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 ">
              Add New Users
            </h2>
            
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Name</label>
              <input  id="name" name="name" value={about} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Email</label>
              <input  id="email" name="email" value={details} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
             
              
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Password</label>
              <input  id="password" name="password" value={details} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
 

              <select name="role" onChange={onChange}>
  <option value="customer">Customer</option>
  <option value="driver">Driver</option>
  <option value="accountant">Accountant</option>
  <option value="humanResourcesManager">Human Resources Manager</option>
  <option value="salesOfficer">Sales Officer</option>
  <option value="systemAdminstrator">System Administrator</option>
  <option value="stockController">Stock Controller</option>
  <option value="customerServiceManager">Customer Service Manager</option>
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
              Edit Users
            </h2>
            
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Name</label>
              <input  id="name" name="name" value={about} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Email</label>
              <input  id="email" name="email" value={details} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

              <select name="role" onChange={onChange}>
  <option value="customer">Customer</option>
  <option value="driver">Driver</option>
  <option value="accountant">Accountant</option>
  <option value="humanResourcesManager">Human Resources Manager</option>
  <option value="salesOfficer">Sales Officer</option>
  <option value="systemAdminstrator">System Administrator</option>
  <option value="stockController">Stock Controller</option>
  <option value="customerServiceManager">Customer Service Manager</option>
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
