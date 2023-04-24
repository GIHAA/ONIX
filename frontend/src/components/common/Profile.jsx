import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import updateUser from "../../services/api/user";
import { logout, login,  reset } from "../../services/auth/authSlice";
import logo from "../../assets/logo.png";


const Profile = (props) => {
    const { user } = useSelector((state) => state.auth);
  
    if (!user){
      const user = {};
    };
    
  
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      password2: "",
      confirmpassword: "",
      token: user.token,
      _id: user._id,
    });
  
    const { name, email, address, phone, password, password2, confirmpassword,} =
      formData;
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
      e.preventDefault();
      
      if (password !== password2) {
        toast.error("Passwords do not match");
      } 
      else if(formData.confirmpassword === ""){
        toast.error("Please enter your password to confirm changes");
      }
      else{
        
        const formDataID = { ...formData, _id: user._id} 
        const response = updateUser(formDataID)
          .then(() => {
            toast.success("Profile updated successfully");
  
            //login logic
            let email = formData.email ? formData.email : user.email;
            let password = formData.password ? formData.password : confirmpassword;
            
            dispatch(login({ email , password }));
  
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
  
   
  
    return (
      <>
        <div className="w-full pr-[200px] bg-bgsec">
          <div className=" mx-auto rounded-[20px] bg-[#E7E9FB] p-8 mt-[50px] flex h-[510px]  w-[900px]">
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
                <pre>Last Edited  - {user.updatedAt.substring(0,10) + " " + user.updatedAt.substring(11,16) + " UTC"}</pre>{" "}
              </div>
              <h3 className="text-center mb-5 mt-5 text-[22px] font-bold">
                Update profile
              </h3> */}
               <label className=" w-[150px] font-semibold text-sm text-gray-600 pb-5 ">
                    Account Type  : {user.role}
                  </label>
                 
    <div className="flex mt-6">
      
                  <label className="w-[150px] font-semibold text-sm text-gray-600 pb-1 block">
                    Name  :
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder={user.name}
                    type="text"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
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
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
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
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
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
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
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
  
              <div className="flex justify-end mt-7">
              {/* <button
                  onClick={onSubmit}
                  type="button"
                  className="transition mr-auto w-[25%] rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Delete</span>
                </button> */}

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
      </>
    );
  };
  
  export default Profile;
  