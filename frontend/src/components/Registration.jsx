import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../services/auth/authSlice";
import bg3 from "../assets/bg3.png";
import { Link } from "react-router-dom";
import Header from "./common/Header";
function Home () {

  const [image, setImage] = useState("");
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    image: "",
    dob: "",
    gender: ""
  });

  const { name, email, password, password2, address, phone , dob , gender } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const isNumberAndTenDigit = (str) => {
    return /^\d{10}$/.test(str);
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(password);

    if (password !== password2) {
    

      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
        address,
        phone,
        image,
        role: "customer",
        dob: "",
        gender: ""
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      console.log(userData)

      if( !name || !email || !password || !password2 || !address || !phone || !dob || !gender  ){
        toast.error("Please fill all the fields.");
        return
      }

      if (emailRegex.test(email)) {
        if (isNumberAndTenDigit(phone)) {
        dispatch(register(userData));
        }else{
          toast.error("The phone number is invalid.");
        }
      } else {
        toast.error("The email address is invalid.");
      }
    }
  };


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);


  return (
    <>
        <Header />
      <div
        style={{ backgroundImage: `url(${bg3})` }}
        name="home"
        className="snap-start bg-cover bg-center h-screen w-full"
      >
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col h-full">
          <p className="text-2xl font-po pl-2 text-secondary">
          </p>
          <h1 className="text-[30px] mt-[20px] font-semibold text-secondary">
          Customer Registration
          </h1>
          <h2 className="pt-4 pl-2 text-l sm:text-l w-[500px] font-bold text-text">
          Become User
If you are new to our store, we glad to have you as member.
          </h2>
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

              
          <div className="pt-6">
            <button onClick={onSubmit} className="rounded-full bg-primary text-white group border-2 bg-[#001233]  px-6 py-3 my-2 flex items-center  hover:border-[#000]">
            
            Register

            </button>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default Home;