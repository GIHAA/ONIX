import PHeader from "../common/PHeader";
import SideBar from "./SideBar";
import Profile from "../common/Profile";
import axios from "axios";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import logo from "../../assets/logo.png";

import "jspdf-autotable";
import { toast } from "react-toastify";

const Report = () => {
  const [ShowReport, setShowReport] = useState(true);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/suppliers")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err));

    axios
      .get("http://localhost:8080/api/stockorder")
      .then((res) => {
        setData2(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const genaratePDF = () => {
    const name = "Suppliers List Report";
    const pdf_title = "Suppliers List Report";
    const pdf_address = "info@ONEXbookshop.com";
    const pdf_phone = "+94 11 234 5678";
    const pdf_email = "Address: No 221/B, Peradeniya Road, Kandy";

    const doc = new jsPDF("landscape", "px", "a4", false);
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const title = `${pdf_title}`;
    doc.setFont("helvetica");
    doc.setTextColor("#000000");

    // Add title and date
    doc.setFontSize(24);
    doc.text(title, 20, 30);
    doc.setFontSize(12);
    doc.setTextColor("#999999");
    doc.text(`Generated on ${date}`, 20, 40);
    doc.addImage(logo, "JPG", 20, 60, 70, 40);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#000000");
    doc.text("ONEX BookShop", 100, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#999999");
    doc.text(`Tel: ${pdf_phone}}`, 100, 80);
    doc.text(`Email: ${pdf_email}`, 100, 90);
    doc.text(`Address: ${pdf_address}`, 100, 100);
    doc.line(20, 110, 600, 110);

    // Add table with data
    doc.setTextColor("#999999");
    doc.setFontSize(12);
    doc.setTextColor("#000000");

    doc.autoTable({
      startY: 130,
      head: [
        [
          "Date of Entry",
          "Id",
          "Name",
          "Email",
          "Phone",
          "Description",
        ],
      ],
      body: data.map((request) => [
        request.createdAt
          .toLocaleString("en-US", { timeZone: "Asia/Colombo" })
          .substring(0, 10),
        request._id,
        request.name,
        request.email,
        request.phone,
        request.description,

      ]),
      theme: "grid",
    });

    doc.save(`${name}.pdf`);
  };

  const genaratePDF2 = () => {
    const name = "Stockorder List report";
    const pdf_title = "Stockorder List report";
    const pdf_address = "info@ONEXbookshop.com";
    const pdf_phone = "+94 11 234 5678";
    const pdf_email = "Address: No 221/B, Peradeniya Road, Kandy";

    const doc = new jsPDF("landscape", "px", "a4", false);
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const title = `${pdf_title}`;
    doc.setFont("helvetica");
    doc.setTextColor("#000000");

    // Add title and date
    doc.setFontSize(24);
    doc.text(title, 20, 30);
    doc.setFontSize(12);
    doc.setTextColor("#999999");
    doc.text(`Generated on ${date}`, 20, 40);
    doc.addImage(logo, "JPG", 20, 60, 70, 40);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#000000");
    doc.text("ONEX BookShop", 100, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#999999");
    doc.text(`Tel: ${pdf_phone}}`, 100, 80);
    doc.text(`Email: ${pdf_email}`, 100, 90);
    doc.text(`Address: ${pdf_address}`, 100, 100);
    doc.line(20, 110, 600, 110);

    // Add table with data
    doc.setTextColor("#999999");
    doc.setFontSize(12);
    doc.setTextColor("#000000");

    doc.autoTable({
      startY: 130,
      head: [
        [
          "Date of Order",
          "Orderid",
          "Name",
          "Supplier",
          "Quantity",
          "Status",
        ],
      ],
      body: data2.map((request) => [
        request.createdAt
          .toLocaleString("en-US", { timeZone: "Asia/Colombo" })
          .substring(0, 10),
        request.orderid,
        request.name,
        request.supplier,
        request.quantity,
        request.status,
      ]),
      theme: "grid",
    });

    doc.save(`${name}.pdf`);
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
                Stock Controller Reports
              </h1>

              <div className="col grid-cols-1">
                <div>
                  <button
                    onClick={() => genaratePDF()}
                    className="w-[300px] text-start h-[100px] mb-[30px] ml-[150px] text-[20px]  mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl"
                  >
                    Genarate Suppiler List Report
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => genaratePDF2()}
                    className="w-[300px] h-[100px] text-start  mb-[30px] ml-[150px] text-[20px]  mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl"
                  >
                    Genarate Stock Order Report
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
