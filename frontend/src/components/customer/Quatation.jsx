import React from "react";
import PHeader from "../common/PHeader";
import SideBar from "./SideBar";
import Profile from "../common/Profile";
import { useState, useEffect } from "react";




const Quatation = () => {


    const [image, setImage] = useState("");
    const [formData, setFormData] = useState({});

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
        setFormData({ image: image });
      };

      const onChange = (e) => {

      }

      const onSubmit = (e) => {
        e.preventDefault();
      }
    

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
              <div className="w-full pr-[200px] bg-bgsec">
          <div className=" mx-auto rounded-[20px] bg-[#E7E9FB] p-8 mt-[50px]  h-[510px]  w-[600px]">
<div>
                <h1 className="text-[20px]">Attach your file :</h1>
              <input
                    className="w-full h-full py-6 pb-[50px] file:bg-[#2E4960] file:rounded-full file:h-[45px] file:w-[130px] file:bg-secondary file:text-white "
                    accept="image/*"
                    type="file"
                    onChange={convertToBase64}
                  />
</div>

<div>
                <h1 className="text-[20px]">Any message :</h1>
                <input
                id="name"
                name="name"
                onChange={onChange}
                type="text"
                className="border h-[200px] rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-[500px]"
              />
</div>
<div className="flex justify-end">
    <button
                      onClick={onSubmit}
                      type="button"
                      className="transition w-[120px] rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                    >
                      <span className="inline-block mr-2">Send</span>
                    </button>
</div>
          </div>
        </div>
            <div>

            </div>
            
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Quatation;
