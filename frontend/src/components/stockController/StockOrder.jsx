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
        orderid : "",
        name : "",
        quantity : 0,
        date : "",
        status : "outtosale",
        supplier: "",
    })
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [ id , setId ] = useState("")
    const { orderid , name , quantity , date , status , supplier} = formData;
    const [ filteredData , setFilteredData ] = useState([])
    const [ searchTerm , setSearchTerm ] = useState('')
    const [supplierNameOptions, setSupplierNameOptions] = useState([]);




    useEffect(() => {
      axios
        .get("http://localhost:8080/api/suppliers/", {
  
        })
        .then((response) => {
          const supplierNames = response.data.map((supplier) => supplier);
          setSupplierNameOptions(supplierNames);
        })
        .catch((error) => {
          console.error("Error fetching supplier names:", error);
        });
      }, []);

    useEffect(()=>{

        axios.get("http://localhost:8080/api/stockorder/")
        .then((res) => {
            setData(res.data)
            setFilteredData(res.data)
        })
        .catch(err => alert(err))
    
    }, []) 

    const onChange = e => {setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData)
  }

    const refreshPage = () => {
      setFormData({
        orderid : "",
        name : "",
        quantity : 0,
        date : "",
        status : "outtosale",
        supplier: "",
      })
      axios.get("http://localhost:8080/api/stockorder/")
      .then((res) => {
          setData(res.data)
          setFilteredData(res.data)
      })
    }

    const onEdit = (id) => {
        const res = axios.put(`http://localhost:8080/api/stockorder/${id}`, formData)
        toast.success("stockorders updated successfully")
        setShowEditModal(false)
        setTimeout(function() {
          refreshPage()
          setFormData({})
        }, 2000);
    }

    const onDelete = (id) => {
        const res = axios.delete(`http://localhost:8080/api/stockorder/${id}`)
          toast.success("stockorders deleted successfully")

        
        setTimeout(function() {
          refreshPage()
        }, 3000);

    }


    const onSubmit = () => {

      if (!orderid || !name || !quantity || !date || !status) {
        // If any of the required attributes are missing, show an error message and don't submit
        toast.error("Please fill in all required fields.");
        return;
      }
        const res = axios.post("http://localhost:8080/api/stockorder/", formData).then((res) => {
          toast.success("stockorders added successfully")
        }).catch(err => toast.error("Failed to add stockorder"))
      
        

        setTimeout(function() {
          refreshPage()
        }, 2000);
       
    }
    const onSearch = (e) => {
      const searchQuery = e.target.value.toLowerCase();
      const filteredResults = data.filter((item) => 
          item.orderid.toLowerCase().includes(searchQuery) ||
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


                <h1 className="text-[30px] font-semibold ml-[150px] mt-5">Supplier Order Management </h1>

                <button onClick={() => setShowCreateModal(true)} className="mb-[30px] ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">ADD</button>
<div className="h-[500px] overflow-y-scroll">
<div className="ml-[150px] ">
                <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]" type="text" placeholder="Search..." value={searchTerm} onChange={onSearch} />
            </div>
                  <table className=" mx-auto  w-[850px] h-[300px] ml-[150px]  ">
  
  <thead className=" bg-[#2E4960] text-white sticky top-0">
      <tr>
      <th className="p-3">orderid</th>
      <th className="p-3">supplier</th>
      <th className="p-3">Name</th>
      <th className="p-3">Date</th>
      <th className="p-3">Quantity</th>
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
                            <td className="p-3 w-[350px]">{item.orderid}</td>
                            <td className="p-3 w-[350px]">{item.supplier}</td>
                            <td className="p-3 w-[350px]">{item.name}</td>
                            <td className="p-3 w-[150px]">{new Date(item.date).toLocaleDateString()}</td>
                            <td className="p-3 w-[150px]">{item.quantity}</td>
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

                                <button className="flex w-[200px] px-5 py-1 mr-5 bg-[#12a661] text-white font-semibold hover:bg-[#0c7343] rounded-xl "
                                onFocus={()=>setFormData({...formData , supplier:item.supplier })}
                                onClick={() =>  setShowCreateModal(true)}>
                      
                                  Make Supplier order
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
              Add New Supplier orders
            </h2>
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="orderid">stockorder ID</label>
<input type="text" id="orderid" name="orderid" value={orderid} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<select
id="supplier"
name="supplier"
                        value={supplier}
                        onChange={onChange}
                        className="mb-4 block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        required
                      >
                        <option value="">Select Supplier</option>
                        {supplierNameOptions.map((supplier) => (
                          <option key={supplier.name} value={supplier.name}>
                            {supplier.name} {supplier.type}
                          </option>
                        ))}
                      </select>


<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="name">Name</label>
<input type="text" id="name" name="name" value={name} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="quantity">Quantity</label>
<input type="number" id="quantity" name="quantity" value={quantity} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="date">Date</label>
<input type="date"   min={new Date().toISOString().split('T')[0]} id="date" name="date" value={date} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>

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
              Edit Supplier Order
            </h2>
            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="orderid">stockorder ID</label>
<input type="text" id="orderid" name="orderid" value={orderid} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="name">Name</label>
<input type="text" id="name" name="name" value={name} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="quantity">Quantity</label>
<input type="number" id="quantity" name="quantity" value={quantity} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>

<label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="date">Date</label>
<input type="date"  min={new Date().toISOString().split('T')[0]} id="date" name="date" value={date} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>

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
