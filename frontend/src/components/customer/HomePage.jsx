import React from "react";
import PHeader from "../common/PHeader";
import SideBar from "./SideBar";
import Profile from "../common/Profile";
import { useState, useEffect } from "react";

const Quatation = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
      fetch("/api/items")
        .then((response) => response.json())
        .then((data) => setItems(data));
    }, []);

    
  return (
    <>
      <div className="flex scroll-smooth">
        <SideBar />

        <div className=" flex-[85%]">
          <div style={{}} className="bg-cover bg-center h-screen w-full fixed">
            <div className=" w-full h-full bg-white shadow-lg rounded-xl">
              <PHeader />
              <div className="w-full pr-[200px] bg-bgsec">
                <div className=" mx-auto rounded-[20px] bg-[#E7E9FB] p-8 mt-[50px]  h-[510px]  w-[600px]">


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quatation;
