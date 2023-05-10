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
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    image: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [ selected , setSelected] = useState({});
  const [ reply , setReply ] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/feedback/")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => alert(err));
  }, []);


  const refreshPage = () => {
    axios.get("http://localhost:8080/api/feedback/").then((res) => {
      setData(res.data);
      setFilteredData(res.data);
    });
  };

  const onEdit = () => {
    const newFormData = { _id:id , reply: reply };

    const res = axios.put(`http://localhost:8080/api/feedback/${id}`, newFormData);
    toast.success("Reply Sent");
    setShowEditModal(false);
    setTimeout(function () {
      refreshPage();
      setReply("");
    }, 2000);
  };

  const onSubmit = () => {
    const { name, email, password, role } = formData;

    if (!name || !email || !password || !role) {
      // If any of the required attributes are missing, show an error message and don't submit
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const newFormData = { ...formData, image: image };
    const res = axios
      .post("http://localhost:8080/api/feedback/", newFormData)
      .then((res) => {
        toast.success("Users added successfully");
      })
      .catch((err) => alert(err));

    setTimeout(function () {
      refreshPage();
    }, 2000);
  };
  const onSearch = (e) => {
    console.log();
    const searchQuery = e.target.value.toLowerCase();
    const filteredResults = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.email.toLowerCase().includes(searchQuery) ||
        item.role.toLowerCase().includes(searchQuery)
    );
    setFilteredData(filteredResults);
    setSearchTerm(searchQuery);
  };

  return (
    <>
      <div className="flex scroll-smooth">
        <SideBar />

        <div className=" flex-[85%]">
          <div style={{}} className="bg-cover bg-center h-screen w-full fixed">
            <div className=" w-full h-full bg-white shadow-lg rounded-xl">
              <PHeader />

              <h1 className="text-[30px] font-semibold ml-[150px] mt-5">
                Feedback Management{" "}
              </h1>
              {/* <button
                onClick={() => setShowCreateModal(true)}
                className="ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl"
              >
                ADD
              </button> */}

              <button
                onClick={() => setShowCreateModal(true)}
                className=" fixed inset-0 z-50 h-[40px] mt-[220px] w-[260px] mt-5 items-center px-5 py-1 mr-5 bg-[#] text-white font-semibold  rounded-xl"
              ></button>
              <div className="h-[500px] overflow-y-scroll">
                {/* <div className="ml-[150px] ">
                  <input
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={onSearch}
                  />
                </div> */}
                <table className=" mx-auto mt-[50px] w-[850px] h-[300px] ml-[150px]  ">
                  <thead className=" bg-[#2E4960] text-white sticky top-0">
                    <tr>
                      <th className="p-3">Customer feedbacks</th>
          
                    </tr>
                  </thead>

                  <tbody className="bg-white text-center border-black ">
                    {filteredData.map((item) => {
                      return (
                        <>
                        <div className="my-4 text-start pl-[20px] pt-[20px] w-auto rounded-[20px] h-[200px] bg-[#3088ec54]">

                          <h1 className="text-[20px]">{item.about}</h1>
                          <p className="text-gray-600">{item.details}</p>
                          <p className="text-gray-900 mt-4">reply :</p>
                          <p className="text-gray-600">{item.reply}</p>
<div className="flex justify-end">
                            <button
                            onFocus={()=>{
                              setId(item._id);
                              setSelected(item)
                            }}
                                    onClick={() => {
                                      setShowEditModal(true);
                                  
                                    }}
                                    className=" items-center px-5 py-1 mr-5 bg-[#2E4960] w-[100px] text-white font-semibold hover:bg-[#1b3348] rounded-xl"
                                  >
                                    <span className="flex">
                                      <img
                                        src={editImg}
                                        alt=""
                                        className="w-4 h-4 mr-2 mt-1"
                                      />
                                      reply
                                    </span>
                                  </button>
</div>
                        </div>
                   
                        </>
                      );
                    })}
                  </tbody>
                  <div className=" h-96"></div>
                </table>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        
      </div>

    

      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 ">Reply to {selected.about}</h2>

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Add Reply
            </label>
            <input
              id="reply"
              name="reply"
              value={reply}
              onChange={ (e) => {
                setReply(e.target.value)
              }}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

          
    
            <div className="flex">
              <button className="" onClick={() => setShowEditModal(false)}>
                Close
              </button>
              <button className="ml-auto" onClick={() => onEdit()}>
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
