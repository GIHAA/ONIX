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
import moment from "moment";

const Attendance = () => {
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
  const { name, email, password } = formData;

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const imgElement = document.createElement("img");
      imgElement.src = reader.result;
      imgElement.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 630;
        const MAX_HEIGHT = 630;
        let width = imgElement.width;
        let height = imgElement.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imgElement, 0, 0, width, height);
        const dataURL = canvas.toDataURL(e.target.files[0].type, 0.5);
        setImage(dataURL);
      };
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
    setFormData({ ...formData, image: image });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/attendance/")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const refreshPage = () => {
    axios.get("http://localhost:8080/api/attendance/").then((res) => {
      setData(res.data);
      setFilteredData(res.data);
    });
  };

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/attendance/${id}`)
      .then((res) => {
        toast.success("attendance deleted successfully");
      })
      .catch((err) => toast.error("deletion failed."));

    setTimeout(function () {
      refreshPage();
    }, 2000);
  };

  const onSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredResults = data
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery) ||
          item.email.toLowerCase().includes(searchQuery) ||
          item.role.toLowerCase().includes(searchQuery)
      )
      .sort((a, b) => a.role.localeCompare(b.role));
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
                Attendance{" "}
              </h1>

              <button
                onClick={() => setShowCreateModal(true)}
                className=" fixed inset-0 z-50 h-[40px] mt-[220px] w-[260px] mt-5 items-center px-5 py-1 mr-5 bg-[#] text-white font-semibold  rounded-xl"
              ></button>
              <div className="h-[500px] overflow-y-scroll">
                {/* 
<div className="ml-[150px] ">
                <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]" type="text" placeholder="Search..." value={searchTerm} onChange={onSearch} />
            </div> */}
                <table className=" mx-auto mt-[50px] w-[850px] h-[300px] ml-[150px]  ">
                  <thead className=" bg-[#2E4960] text-white sticky top-0">
                    <tr>
                      <th className="p-3">type</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Name</th>
                      {/* <th className="p-3">category</th>
      <th className="p-3">qty</th> */}
                      <th className="p-3">action</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white text-center border-black ">
                    {filteredData.map((item) => {
                      return (
                        <>
                          <tr className="hover:bg-[#efeeee] border-[2px]">
                            <td className="p-3 w-[350px]">{item.type}</td>
                            <td className="p-3 w-[350px]">
                              {moment(item.date).format("MMMM Do, YYYY h:mm a")}
                            </td>
                            <td className="p-3 w-[150px]">{item.role}</td>
                            {/* <td className="p-3 w-[250px]">{item.category}</td>
                            <td className="p-3">{item.qty}</td> */}

                            <td className="p-3">
                              <div className="flex ml-12">
                                <button
                                  className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
                                  onClick={() => onDelete(item._id)}
                                >
                                  <img
                                    src={deleteImg}
                                    alt=""
                                    className="w-4 h-4 mr-2 mt-1"
                                  />
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
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
    </>
  );
};

export default Attendance;
