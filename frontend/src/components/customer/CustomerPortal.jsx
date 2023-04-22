import React from "react";
import PHeader from "../common/PHeader";
import SideBar from "./SideBar";
import Profile from "../common/Profile";
import Quatation from "./Quatation";
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";



const CustomerPortal = () => {

  const [choice, setchoice] = useState("profile");

  const setProfile = () => {
    setchoice("profile");
  };
  const setBooking = () => {
    setchoice("quotation");
  };
  const setEventPage = () => {
    setchoice("event");
  };
  const setPetPage = () => {
    setchoice("pet");
  };


  return (
    <>
      {/* <Header /> */}

      <div className="flex scroll-smooth">
      <div className=" bg-[#001233] h-[100vh] flex-[15%] sticky top-0">
      
      
      <div className='mt-4'>
      <img src={logo} alt="logo" className=" w- h-[100px] mx-auto object-contain"></img>
        <h3 className=" text-[#2E4960] font-bold text-l text-center w-[150px] leading-5 my-2 tracking-wide mx-auto">
  
        </h3>
      </div>
  
      
      <div className="my-6 ">
  
      <NavLink
    onClick={setProfile("profile")}
    activeClassName="active"
    className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
  >
      <img src="https://img.icons8.com/ios-glyphs/30/null/user-male-circle.png" className="w-6 h-6 mr-2"/>
    Profile
  </NavLink>
  
  <NavLink
    to="/quotation"
    activeClassName="active"
    className="link bg-[#2E4960] flex justify-start pl-6 font-semibold text-white text-[19px] h-[50px] block text-center mb-7 mx-auto  items-center"
  >
      <img src="https://img.icons8.com/ios-glyphs/30/null/user-male-circle.png" className="w-6 h-6 mr-2"/>
    Profile
  </NavLink>
  
  
        
  
      </div>
  
      <div>
  
  
      </div>
    
  </div>

        <div className=" flex-[85%]">
 
          <div
            style={{ }}
            className="bg-cover bg-center h-screen w-full fixed"
          >
            <div className=" w-full h-full bg-white shadow-lg rounded-xl">
              <PHeader />
            

              {choice === "profile" ? (
        <Profile />
      ) : choice === "quotation" ? (
        <Quatation />
      ) : choice === "pet" ? (
        <Pets />
      ) : (
        <Events />
      )}
            <div>

            </div>
            
            </div>
          </div>

          <div className=" h-"></div>
        </div>
      </div>
    </>
  );
};

export default CustomerPortal;
