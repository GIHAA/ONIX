import React from "react";
import bg2 from "../assets/bg2.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./common/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../services/auth/authSlice";

function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <>
      <Header />
      <div
        style={{ backgroundImage: `url(${bg2})` }}
        name="home"
        className="snap-start bg-cover bg-center h-screen w-full"
      >
        <div className="max-w-[1200px]  mx-auto px-8 flex flex-col justify-center h-full">
          <p className="text-2xl font-po pl-2 text-secondary"></p>
          <h1 className="text-[50px] font-semibold text-secondary">
            Login in now
          </h1>
          <h2 className="pt-4 pl-2 text-l sm:text-l w-[500px] font-bold text-text">
            Please login to continue using our app
          </h2>
    <div className="w-[600px] mt-[20px]">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            E-mail
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
            Password
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
          <div className="pt-6 flex justify-center mr-[30px]">
            <button onClick={onSubmit} className="rounded-full bg-primary text-white group border-2 bg-[#001233]  px-6 py-3 my-2 flex items-center  hover:border-[#000]">
          
                Login
           
            </button>
          </div>
         <p className="pl-1"> Don't have an account?</p>
          <button className="rounded-full w-[150px] bg-primary text-white group border-2 bg-[#001233]  px-6 py-3 my-2 flex items-center  hover:border-[#000]">
              <Link to='/por' smooth={true} duration={500}>
                Register Now
              </Link>
            </button>
        </div>
      </div>
    </>
  );
}

export default Home;
