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
    password2: "",
    role: "customer",
    phone: "",
    image: "",
    dob: "",
    gender: "",
    address: ""
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [id, setId] = useState("");
  const { name, email, password , password2 , phone , dob , gender , address } = formData;

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
      .get("http://localhost:8080/api/users/")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const refreshPage = () => {
    axios.get("http://localhost:8080/api/users/").then((res) => {
      setData(res.data);
      setFilteredData(res.data);
    });
  };

  const onEdit = (id) => {
    const newFormData = { ...formData, image: image };

    const res = axios.put(`http://localhost:8080/api/users/${id}`, newFormData);
    toast.success("Users updated successfully");
    setShowEditModal(false);
    setTimeout(function () {
      refreshPage();
      setFormData({});
    }, 2000);
  };

  const onDelete = (id) => {
    const res = axios
      .delete(`http://localhost:8080/api/users/${id}`)
      .then((res) => {
        toast.success("Users deleted successfully");
      })
      .catch((err) => toast.error("deletion failed."));

    setTimeout(function () {
      refreshPage();
      setFormData({});
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
      .post("http://localhost:8080/api/users/", newFormData)
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
                Users Management{" "}
              </h1>
              <button
                onClick={() => setShowCreateModal(true)}
                className="ml-[150px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl"
              >
                ADD
              </button>

              <button
                onClick={() => setShowCreateModal(true)}
                className=" fixed inset-0 z-50 h-[40px] mt-[220px] w-[260px] mt-5 items-center px-5 py-1 mr-5 bg-[#] text-white font-semibold  rounded-xl"
              ></button>
              <div className="h-[500px] overflow-y-scroll">
                <div className="ml-[150px] ">
                  <input
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={onSearch}
                  />
                </div>
                <table className=" mx-auto mt-[50px] w-[850px] h-[300px] ml-[150px]  ">
                  <thead className=" bg-[#2E4960] text-white sticky top-0">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email </th>
                      <th className="p-3">Phone Number</th>
                      <th className="p-3">Address</th>
                      {/* <th className="p-3">category</th>
      <th className="p-3">qty</th> */}
                      <th className="p-3">action</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white text-center border-black ">
                    {filteredData.filter((item) => item.role === "customer").map((item) => {
                      return (
                        <>
                          <tr className="hover:bg-[#efeeee] border-[2px]">
                            <td className="p-3 w-[350px]">{item.name}</td>
                            <td className="p-3 w-[350px]">{item.email}</td>
                            <td className="p-3 w-[350px]">{item.phone}</td>
                            <td className="p-3 w-[150px]">{item.address}</td>
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

      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
          <label className="mt-4 font-semibold text-sm text-gray-600 pb-1 block">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1  mb-5 text-sm w-[500px]"
              />

<label className="font-semibold text-sm text-gray-600 pb-1 block">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                value={dob}
                onChange={onChange}
                type="date"
                className="border rounded-lg px-3 py-2 mt-1  mb-5 text-sm w-[500px]"
              />

<label className="font-semibold text-sm text-gray-600 pb-1 block">
                Address
              </label>
              <input
                id="address"
                name="address"
                value={address}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1  mb-5 text-sm w-[500px]"
              />
             
             
             <label className="font-semibold text-sm text-gray-600 pb-1 block">
             Gender
              </label>
              <input
                id="gender"
                name="gender"
                value={gender}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1  mb-5 text-sm w-[500px]"
              />

<label className="font-semibold text-sm text-gray-600 pb-1 block">
             Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1  mb-5 text-sm w-[500px]"
              />
             
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Confirm Password
              </label>
              <input
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]"
              />
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Add a Profile Picture
              </label>
              <input
                className="w-full h-full py-2 pb-[50px] file:rounded-full file:h-[45px] file:w-[130px] file:bg-secondary file:text-white "
                accept="image/*"
                type="file"
                onChange={convertToBase64}
              />

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
            <h2 className="text-lg font-bold mb-4 ">Edit Users</h2>

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Add Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Add Email
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Add image
            </label>
            <input
              className="w-full h-full py-2 pb-[50px] file:rounded-full file:h-[45px] file:w-[130px] file:bg-secondary file:text-white "
              accept="image/*"
              type="file"
              onChange={convertToBase64}
            />

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
