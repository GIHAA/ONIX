import React from "react";
import PHeader from "../common/PHeader";
import SideBar from "./SideBar";

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
              
              <span className=" text-lg font-light ml-[190px]">
                {" "}
                Received Items
              </span>
            
            </div>
          </div>

          <div className=" h-"></div>
        </div>
      </div>
    </>
  );
};

export default CustomerPortal;
