import React from "react";
import PHeader from "../common/PHeader";
import SideBar from "./SideBar";
import Profile from "../common/Profile";

const CustomerPortal = () => {
  return (
    <>
      {/* <Header /> */}

      <div className="flex scroll-smooth">
        <SideBar />

        <div className=" flex-[85%]">
 
          <div
            style={{ }}
            className="bg-cover bg-center h-screen w-full fixed"
          >
            <div className=" w-full h-full bg-white shadow-lg rounded-xl">
              <PHeader />
              <Profile />
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
