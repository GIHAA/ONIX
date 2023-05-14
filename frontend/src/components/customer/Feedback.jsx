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
import { useSelector } from "react-redux";


const Feedback = () => {
  const { user } = useSelector((state) => state.auth);

    const [ data , setData ] = useState([])
    const [ formData , setFormData ] = useState({
        about : user.name,
        details : "",
    })
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [ id , setId ] = useState("")
    const { about, details } = formData;


    useEffect(()=>{

        axios.get("http://localhost:8080/api/feedback/")
        .then((res) => {
            setData(res.data)     
        })
        .catch(err => alert(err))
    
    }, []) 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const refreshPage = () => {
      axios.get("http://localhost:8080/api/feedback/")
      .then((res) => {
          setData(res.data)
      })
    }

    const onEdit = (id) => {
        const res = axios.put(`http://localhost:8080/api/feedback/${id}`, formData)
        toast.success("Feedback updated successfully")
        
        setTimeout(function() {
          refreshPage()
          setFormData({})
        }, 2000);
    }

    const onDelete = (id) => {
        const res = axios.delete(`http://localhost:8080/api/feedback/${id}`)
          toast.success("Feedback deleted successfully")

        
        setTimeout(function() {
          refreshPage()
        }, 2000);

    }

    const onSubmit = () => {
        const res = axios.post("http://localhost:8080/api/feedback/", formData).then((res) => {
          toast.success("Feedback added successfully")
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


                <h1 className="text-[30px] font-semibold ml-[150px] mt-5">Feedback </h1>

                <button onClick={() => setShowCreateModal(true)} className="ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">ADD</button>
                <table className=" mx-auto mt-[50px] w-[850px] h-[300px] ml-[150px]  ">

<thead className=" bg-[#2E4960] text-white sticky top-0">
    <tr>
    <th className="p-3">name</th>
    <th className="p-3">Description</th>
    <th className="p-3">Reply</th>
    <th className="p-3">Date</th>
    {/* <th className="p-3">category</th>
    <th className="p-3">qty</th> */}
    <th className="p-3">action</th>
    </tr>
</thead>

<tbody  className="bg-white text-center border-black ">
{data.filter(item => item.about === user.name).map((item) => {
                      return(

                        <>
               
                        { item.about == user.name ?(
                        <tr className="hover:bg-[#efeeee] border-[2px]">
                          <td className="p-3">{item.about}</td>
                          <td className="p-3 w-[350px]">{item.details}</td>
                          <td className="p-3 w-[150px]">{item.reply}</td>
                          <td className="p-3 w-[150px]">{new Date(item.createdAt).toLocaleDateString()}</td>
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
                        
                        </tr>): <></>
}
                        </>

                      )
                    })}

                  
                    </tbody>
                    <div className=" h-96"></div>

                    </table>
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
              Add New Feedback
            </h2>
            
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Name</label>
              <input  id="about" name="about" value={about} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Desciption</label>
              <input  id="details" name="details" value={details} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


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
              Edit Feedback
            </h2>
            
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Name</label>
              <input  id="about" name="about" value={about} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Desciption</label>
              <input  id="details" name="details" value={details} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


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

export default Feedback;
