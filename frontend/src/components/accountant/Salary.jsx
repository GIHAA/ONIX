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


const Salary = () => {

    const [ data , setData ] = useState([])
    const [ formData , setFormData ] = useState({
        name : "",
        month : "",
        salary : "",
        othours : "",
        role: "driver"
    })
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [ id , setId ] = useState("")
    const [ filteredData , setFilteredData ] = useState([])
const [ searchTerm , setSearchTerm ] = useState('')
    const { name , month , salary , othours } = formData;


    
const onSearch = (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const filteredResults = data.filter((item) => 
      item.name.toLowerCase().includes(searchQuery) ||
      item.month.toLowerCase().includes(searchQuery) ||
      item.othours.toLowerCase().includes(searchQuery)
  );
  setFilteredData(filteredResults);
  setSearchTerm(searchQuery);
}

    useEffect(()=>{

        axios.get("http://localhost:8080/api/salary/")
        .then((res) => {
            setData(res.data)
            setFilteredData(res.data)
        })
        .catch(err => alert(err))
    
    }, []) 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const refreshPage = () => {
      setFormData({
        name : "",
        month : "",
        salary : "",
        othours : "",
        role: "driver"
      })
      axios.get("http://localhost:8080/api/salary/")
      .then((res) => {
          setData(res.data)
          setFilteredData(res.data)
      })
    }

    const onEdit = (id) => {
        const res = axios.put(`http://localhost:8080/api/salary/${id}`, formData)
        toast.success("Salary updated successfully")
        setShowEditModal(false)
        setTimeout(function() {
          refreshPage()
          setFormData({})
        }, 2000);
    }

    const onDelete = (id) => {
        const res = axios.delete(`http://localhost:8080/api/salary/${id}`)
          toast.success("Salary deleted successfully")

        
        setTimeout(function() {
          refreshPage()
        }, 2000);

    }

    const isNumberAndTenDigit = (str) => {
      return /^\d{10}$/.test(str);
    };

    const onSubmit = () => {

      const { name , month , salary , othours } = formData;

      if (!month || !name || !salary || !othours ) {
        // If any of the required attributes are missing, show an error message and don't submit
        toast.error("Please fill in all required fields.");
        return;
      }

        const res = axios.post("http://localhost:8080/api/salary/", formData).then((res) => {
          toast.success("Salary added successfully")
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


                <h1 className="text-[30px] font-semibold ml-[150px] mt-5">Employee Salary </h1>

                <button onClick={() => setShowCreateModal(true)} className="mb-[30px] ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">ADD</button>
<div className="h-[500px] overflow-y-scroll">

<div className="ml-[150px] ">
                <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]" type="text" placeholder="Search..." value={searchTerm} onChange={onSearch} />
            </div>
                  <table className=" mx-auto  w-[850px] h-[300px] ml-[150px]  ">
  
  <thead className=" bg-[#2E4960] text-white sticky top-0">
      <tr>
      <th className="p-3">Name</th>
      <th className="p-3">Role</th>
      <th className="p-3">Month</th>
      <th className="p-3">Basic Salary</th>
      <th className="p-3">OThours</th>
      <th className="p-3">Total</th>
      {/* <th className="p-3">category</th>
      <th className="p-3">qty</th> */}
      <th className="p-3">action</th>
      </tr>
  </thead>
  
  <tbody  className="bg-white text-center border-black ">
  {filteredData.map((item) => {
                        return(
  
                          <>
                          <tr className="hover:bg-[#efeeee] border-[2px]">
                            <td className="p-3 w-[350px]">{item.name}</td>
                            <td className="p-3 w-[350px]">{item.role}</td>
                            <td className="p-3 w-[350px]">{item.month}</td>
                            <td className="p-3 w-[150px]">{item.salary}</td>
                            <td className="p-3 w-[150px]">{item.othours}</td>
                            <td className="p-3 w-[150px]">{ item.salary/1 + ((item.othours/1) *500) }</td>
                            {/* <td className="p-3 w-[250px]">{item.category}</td>
                            <td className="p-3">{item.qty}</td> */}
                          
                            <td className="p-3">
                            <div className="flex ml-12">
                                <button onClick={() => {setShowEditModal(true); setId(item._id); setFormData(item) }} className=" items-center px-5 py-1 mr-5 bg-[#2E4960] w-[100px] text-white font-semibold hover:bg-[#1b3348] rounded-xl">
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
              Add New Salary 
            </h2>
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Name</label>
<input  id="name" name="name" value={name} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Role</label>
<select name="role" onChange={onChange} defaultValue="driver" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full">
  <option value="driver">Driver</option>
  <option value="accountant">Accountant</option>
  <option value="humanResourcesManager">Human Resources Manager</option>
  <option value="salesOfficer">Sales Officer</option>
  <option value="systemAdminstrator">System Administrator</option>
  <option value="stockController">Stock Controller</option>
  <option value="customerServiceManager">Customer Service Manager</option>
</select>

<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Month</label>
<input  id="month"  min={new Date().toISOString().split('T')[0]} name="month" value={month} onChange={onChange} type="date" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add othours</label>
<input  id="othours" name="othours" value={othours} onChange={onChange} type="number" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

<label className="font-semibold text-sm text-gray-600 pb-1 block">Add salary</label>
<input  id="salary" name="salary" value={salary} onChange={onChange} type="number" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
 

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
              Edit Salary
            </h2>
            
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Name</label>
<input  id="name" name="name" value={name} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Role</label>
<select name="role" onChange={onChange} defaultValue="driver" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full">
  <option value="driver">Driver</option>
  <option value="accountant">Accountant</option>
  <option value="humanResourcesManager">Human Resources Manager</option>
  <option value="salesOfficer">Sales Officer</option>
  <option value="systemAdminstrator">System Administrator</option>
  <option value="stockController">Stock Controller</option>
  <option value="customerServiceManager">Customer Service Manager</option>
</select>


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add Month</label>
<input  id="month"  min={new Date().toISOString().split('T')[0]} name="month" value={month} onChange={onChange} type="date" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<label className="font-semibold text-sm text-gray-600 pb-1 block">Add othours</label>
<input  id="othours" name="othours" value={othours} onChange={onChange} type="number" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

<label className="font-semibold text-sm text-gray-600 pb-1 block">Add salary</label>
<input  id="salary" name="salary" value={salary} onChange={onChange} type="number" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
 

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

export default Salary;
