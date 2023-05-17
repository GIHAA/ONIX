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


const User = () => {

    const [ data , setData ] = useState([])
    const [ formData , setFormData ] = useState({
        stockid : "",
        name : "",
        quantity : 0,
        date : "",
        status : "outtosale",
    })
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [ id , setId ] = useState("")
    const { stockid , name , quantity , date , status } = formData;
    const [ filteredData , setFilteredData ] = useState([])
    const [ searchTerm , setSearchTerm ] = useState('')

    useEffect(()=>{

        axios.get("http://localhost:8080/api/stock/")
        .then((res) => {
            setData(res.data)
            setFilteredData(res.data)
        })
        .catch(err => alert(err))
    
    }, []) 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const refreshPage = () => {
      axios.get("http://localhost:8080/api/stock/")
      .then((res) => {
          setData(res.data)
          setFilteredData(res.data)
      })
    }

    const onEdit = (id) => {
        const res = axios.put(`http://localhost:8080/api/stock/${id}`, formData)
        toast.success("stocks updated successfully")
        setShowEditModal(false)
        setTimeout(function() {
          refreshPage()
          setFormData({})
        }, 2000);
    }

    const onDelete = (id) => {
        const res = axios.delete(`http://localhost:8080/api/stock/${id}`)
          toast.success("stocks deleted successfully")

        
        setTimeout(function() {
          refreshPage()
        }, 3000);

    }


    const onSubmit = () => {

      if (!stockid || !name || !quantity || !date || !status) {
        // If any of the required attributes are missing, show an error message and don't submit
        toast.error("Please fill in all required fields.");
        return;
      }
        const res = axios.post("http://localhost:8080/api/stock/", formData).then((res) => {
          toast.success("stocks added successfully")
        }).catch(err => toast.error("Failed to add stock"))
      
        

        setTimeout(function() {
          refreshPage()
        }, 2000);
       
    }
    const onSearch = (e) => {
      const searchQuery = e.target.value.toLowerCase();
      const filteredResults = data.filter((item) => 
          item.stockid.toLowerCase().includes(searchQuery) ||
          item.name.toLowerCase().includes(searchQuery) ||
          item.status.toLowerCase().includes(searchQuery) 
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


                <h1 className="text-[30px] font-semibold ml-[150px] mt-5">Stock management </h1>

                <button onClick={() => setShowCreateModal(true)} className="mb-[30px] ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">ADD</button>
<div className="h-[500px] overflow-y-scroll">
<div className="ml-[150px] ">
                <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]" type="text" placeholder="Search..." value={searchTerm} onChange={onSearch} />
            </div>
                  <table className=" mx-auto  w-[850px] h-[300px] ml-[150px]  ">
  
  <thead className=" bg-[#2E4960] text-white sticky top-0">
      <tr>
      <th className="p-3">StockID</th>
      <th className="p-3">Name</th>
      <th className="p-3">Date</th>
      <th className="p-3">Quantity</th>
      {/* <th className="p-3">category</th>
      <th className="p-3">qty</th> */}
            <th className="p-3">Status</th>
      <th className="p-3">action</th>
      </tr>
  </thead>
  
  <tbody  className="bg-white text-center border-black ">
  {filteredData.map((item) => {
                        return(
  
                          <>
                          <tr className="hover:bg-[#efeeee] border-[2px]">
                            <td className="p-3 w-[350px]">{item.stockid}</td>
                            <td className="p-3 w-[350px]">{item.name}</td>
                            <td className="p-3 w-[150px]">{new Date(item.date).toLocaleDateString()}</td>
                            { item.quantity < 50 ? <td className=" w-[150px] rounded-[20px] bg-red-600  text-white">{item.quantity}</td> : <td className="p-3 w-[150px]">{item.quantity}</td>
  }
                            {/* <td className="p-3 w-[250px]">{item.category}</td>
                            <td className="p-3">{item.qty}</td> */}
                          <td className="p-3 w-[150px]">{item.status}</td>
                            <td className="p-3">
                            <div className="flex ml-12">
                                <button onClick={() => {setFormData({...item ,stockid: "" }); setShowEditModal(true); setId(item._id);}} className=" items-center px-5 py-1 mr-5 bg-[#2E4960] w-[100px] text-white font-semibold hover:bg-[#1b3348] rounded-xl">
                                  <span
                                  className="flex">
                                  <img src={editImg} alt="" className="w-4 h-4 mr-2 mt-1" />
                                    Edit
                                  </span>
                                </button>
                    
                                <button className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
                                onClick={() => onDelete(item._id)}>
                                <img src={deleteImg} alt="" className="w-4 h-4 mr-2 mt-1" />
                                  Remove
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
              Add New stocks
            </h2>
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="stockid">Stock ID</label>
<input type="text" id="stockid" name="stockid" value={stockid} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="name">Name</label>
<input type="text" id="name" name="name" value={name} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="quantity">Quantity</label>
<input type="number" id="quantity" name="quantity" value={quantity} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="date">Date</label>
<input type="date" id="date" name="date" value={date} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="status">Status</label>
<select defaultValue="outtosale" id="status" name="status" value={status} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full">
  <option value="outtosale">Out to Sale</option>
  <option value="onhold">In Stores</option>
  <option value="returned">Returned</option>
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
              Edit stocks
            </h2>
            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="stockid">Stock ID</label>
<input type="text" id="stockid" name="stockid" value={stockid} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="name">Name</label>
<input type="text" id="name" name="name" value={name} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="quantity">Quantity</label>
<input type="number" id="quantity" name="quantity" value={quantity} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="date">Date</label>
<input type="date"   min={new Date().toISOString().split('T')[0]} id="date" name="date" value={date} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="status">Status</label>
<select defaultValue="outtosale" id="status" name="status" value={status} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full">
  <option value="outtosale">Out to Sale</option>
  <option value="onhold">On Hold</option>
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

export default User;
