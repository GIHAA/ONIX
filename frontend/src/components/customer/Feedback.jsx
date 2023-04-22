import React from "react";
import PHeader from "../common/PHeader";
import SideBar from "./SideBar";
import Profile from "../common/Profile";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Feedback = () => {

    const [ data , setData ] = useState({})
    const [ formData , setFormData ] = useState({
        about : "",
        details : "",
    })
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { about, details } = formData;

    const test = [  {  "about" : "Saman" , "details" : "Good"  } , { "about" : "saman2" , "details" : "bad"} ]

    // useEffect(()=>{

    //     axios.get("http://localhost:8080/api/feedback/")
    //     .then((res) => {
    //         setData(res.data)
    //     })
    //     .catch(err => alert(err))
    
    // }, []) 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onDelete = (id) => {

    }

    const onCreate = () => {
        const res = axios.post("http://localhost:8080/api/feedback/", formData)
        console.log(res)
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

                <button onClick={() => setShowCreateModal(true)} className=" items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">ADD</button>
                <table className=" mx-auto mt-[50px] w-[850px] ml-[150px] border- border-[2px]">

<thead className=" bg-[#2E4960] text-white sticky top-0">
    <tr>
    <th className="p-3">name</th>
    <th className="p-3">Description</th>
    {/* <th className="p-3">item_brand</th>
    <th className="p-3">category</th>
    <th className="p-3">qty</th> */}
    <th className="p-3">action</th>
    </tr>
</thead>

<tbody  className="bg-white text-center border-black ">
{test.map((item) => {
                      return(

                        <>
                        <tr className="hover:bg-[#efeeee]">
                          <td className="p-3">{item.about}</td>
                          <td className="p-3 w-[350px]">{item.details}</td>
                          {/* <td className="p-3 w-[150px]">{item.item_brand}</td>
                          <td className="p-3 w-[250px]">{item.category}</td>
                          <td className="p-3">{item.qty}</td> */}
                        
                          <td className="p-3">
                          <div className="flex ml-12">
                              <button className=" items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">
                                <Link to={`/updateitem/${item._id}`}
                                className="flex">
                                <img  alt="" className="w-4 h-4 mr-2 mt-1" />
                                  Edit
                                </Link>
                              </button>
                  
                              <button className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
                              onClick={() => onDelete(item._id)}>
                              <img  alt="" className="w-4 h-4 mr-2 mt-1" />
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
            
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add about</label>
              <input  id="about" name="about" value={about} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Desciption</label>
              <input  id="details" name="details" value={details} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


<div className="flex">
                <button className="" onClick={() => setShowCreateModal(false)}>
                  Close
                </button>
                <button className="ml-auto" onClick={() => setShowCreateModal(false)}>
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
