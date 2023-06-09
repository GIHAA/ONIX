import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import updateUser from "../../services/api/user";
import { logout, login, reset } from "../../services/auth/authSlice";
import logo from "../../assets/logo.png";
import axios from "axios";

const Profile = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [arrivalTime, setArrivalTime] = useState("");
  const [leaveTime, setLeaveTime] = useState("");
  const [image, setImage] = useState("");

  const [arrivalTimeblock, setArrivalTimeblock] = useState(false);
  const [leaveTimeblock, setLeaveTimeblock] = useState(false);

  if (!user) {
    const user = {};
  }

  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    confirmpassword: "",
    token: user.token,
    _id: user._id,
    phone: "",
    image: "",
    dob: "",
    gender: "",
  });

  const {
    name,
    email,
    password,
    password2,
    address,
    phone,
    dob,
    gender,
    confirmpassword,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    const isNumberAndTenDigit = (str) => {
      return /^\d{10}$/.test(str);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email){
      if (!emailRegex.test(email)) {
        toast.error("The email address is invalid.");
        return
      }
    }

    if(phone){
      if (!isNumberAndTenDigit(phone)) {
        toast.error("The phone number is invalid.");
        return
      }
    }



    if (password !== password2) {
      toast.error("Passwords do not match");
    } else if (formData.confirmpassword === "") {
      toast.error("Please enter your password to confirm changes");
    } else {
      const formDataID = { ...formData, _id: user._id , image: image  };
      const response = updateUser(formDataID)
        .then(() => {
          toast.success("Profile updated successfully");

          //login logic
          let email = formData.email ? formData.email : user.email;
          let password = formData.password
            ? formData.password
            : confirmpassword;

          dispatch(login({ email, password }));

          //dispatch(reset());
          navigate("/");
        })
        .catch((err) => {
          toast.error("An error occurred while updating profile");
          console.log(err);
        });

      console.log(response.data);
    }
  };

  const arrival = () => {
    const formData = { role: user.role, date: new Date(), type: "arrival" };

    setArrivalTime(new Date().toLocaleTimeString());

    axios
      .post("http://localhost:8080/api/attendance/", formData)
      .then((res) => {
        toast.success("Attendance added successfully");
      })
      .catch((err) => alert(err));
  };

  const leave = () => {
    const formData = { role: user.role, date: new Date(), type: "leave" };

    setLeaveTime(new Date().toLocaleTimeString());

    axios
      .post("http://localhost:8080/api/attendance/", formData)
      .then((res) => {
        toast.success("Attendance added successfully");
      })
      .catch((err) => alert(err));
  };

  const onDelete = () => {
    const formData = { ...user, _id: user._id, token: user.token };
    axios
      .post("http://localhost:8080/api/users/delete", formData)
      .then((res) => {
        toast.success("Account deleted successfully");
        dispatch(logout());
        navigate("/");
      })
      .catch((err) => alert(err));
  };

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

  return (
    <>
      <div className="w-full pr-[200px] bg-bgsec">
        <div className=" mx-auto rounded-[20px] bg-[#E7E9FB] p-8 mt-[10px] flex h-[590px]  w-[900px]">
          <div className="w-1/3  h-full">
            <div className="w-full flex justify-center">
              <img
                src={user.image}
                className="rounded-[50%] w-[170px] h-[170px] border-bg border-[5px]"
              />
            </div>

            <h1 className="text-[20px] flex justify-center">{user.name}</h1>
          </div>
          <div className="w-2/3  h-64">
            {/* <div>
                <pre>User ID      - {user._id}</pre>{" "}
              </div>
              <div>
                <pre>Member Since - {user.createdAt.substring(0,10) + " " + user.createdAt.substring(11,16) + " UTC"}</pre>{" "}
              </div>
              <div>
                <pre>Last Attendanceed  - {user.updatedAt.substring(0,10) + " " + user.updatedAt.substring(11,16) + " UTC"}</pre>{" "}
              </div>
              <h3 className="text-center mb-5 mt-5 text-[22px] font-bold">
                Update profile
              </h3> */}
            <label className=" w-[150px] font-semibold text-[20px] text-gray-600  ">
              Account Type : {user.role}{" "}
              {user.role != "customer" ? (
                <>
                  {" "}
                  <button
                    className="transition w-[25%] rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block ml-[20px]"
                    onClick={() => setShowAttendanceModal(true)}
                  >
                    {" "}
                    attendance
                  </button>
                </>
              ) : (
                <></>
              )}
            </label>

            <div className="flex mt-3">
              <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
                Name :
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                placeholder={user.name}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
            </div>
            <div className="flex">
              <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
                Email :
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder={user.email}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
            </div>
            <div className="flex">
              <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
                Adderess :
              </label>
              <input
                id="address"
                name="address"
                value={address}
                onChange={onChange}
                placeholder={user.address}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
            </div>

            <div className="flex">
              <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
                Phone number :
              </label>
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                placeholder={user.phone}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
            </div>

            {/* <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                placeholder={user.phone}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              /> */}
            <div className="flex ">
              <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
                New password :
              </label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
            </div>

            <div className="flex">
              <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
                Repeat Password :
              </label>
              <input
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
              />
            </div>

            <div className="flex">
              <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
                Old Password :
              </label>
              <input
                id="confirmpassword"
                name="confirmpassword"
                value={confirmpassword}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                required
              />
            </div>
            
  <div className="flex">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add image :</label>
                <input
                  className="w-full h-full py-2 file:rounded-full file:h-[45px] file:w-[130px] file:bg-secondary file:text-white "
                  accept="image/*"
                  type="file"
                  onChange={convertToBase64}
                />
  </div>

            <div className="flex justify-end mt-7">
              {/* <button
                  onClick={onSubmit}
                  type="button"
                  className="transition mr-auto w-[25%] rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Delete</span>
                </button> */}

              {user.role == "customer" ? (
                <button
                  onClick={onDelete}
                  type="button"
                  className="transition mr-auto w-[25%] rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Delete profile</span>
                </button>
              ) : (
                <></>
              )}

              <button
                onClick={onSubmit}
                type="button"
                className="transition w-[25%] rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Update profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100px] bg-bgsec"></div>

      {showAttendanceModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <div className="flex">
              <p>Arrival Time</p>
              <input
                id="email"
                name="email"
                value={arrivalTime}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                onClick={arrival}
                className="transition rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block h-[50px] w-[150px] mx-3 "
              >
                submit
              </button>
            </div>
            <div className="flex">
              <p>Leave Time</p>
              <input
                id="email"
                name="email"
                value={leaveTime}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                onClick={leave}
                className="transition rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block h-[50px] w-[150px] mx-3 "
              >
                submit
              </button>
            </div>

            <button className="" onClick={() => setShowAttendanceModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
