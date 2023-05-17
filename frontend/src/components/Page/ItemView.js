import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PHeader from "../common/PHeader";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ItemView() {
  const { user } = useSelector((state) => state.auth);

  const [item, setItem] = useState({});
  const [type, settype] = useState("");
  const [showOnline, setshowOnline] = useState(false);
  const params = useParams();
  let [quantity, setNumber] = useState(1);
  let [discounts, setDiscount] = useState();
  let [prices, setPrices] = useState();

  const [formData, setFormData] = useState({
    name: user.name,
    date: new Date(),
    phone: user.phone,
    location: user.address,
    items: "",
    noi: "",
    reason: "",
    status: "pending",
    type: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios.get(
        `http://localhost:8080/Inventry_IssueItems/get_OneIssueItem/${params.id}`
      );
      setItem(response.data);

      if (response.data.Inventry_Item_Discount > 0) {
        setDiscount(
          "Discount  :  " + response.data.Inventry_Item_Discount + " %"
        );
        setPrices("Rs. " + response.data.Inventry_Item_Price);
      }
    };

    if (params.id) {
      fetchItem();
    }
  }, [params.id]);

  function increment() {
    setNumber(++quantity);
  }

  function uincrement() {
    if (quantity > 1) {
      setNumber(--quantity);
    }
  }

  const onSubmit = () => {
    if (!type) {
      toast.error("please select a payment type");
      return;
    }

    if (type === "online") {
      const newformData = {
        ...formData,
        items: item.Inventry_Item_DisplayName,
        type: type,
        status: "pending",
        noi: quantity,
      };
      setshowOnline(true);


      const res = axios
        .post("http://localhost:8080/api/order/", newformData)
        .then((res) => {})
        .catch((err) => alert(err));
        setFormData({
          name: user.name,
    date: new Date(),
    phone: user.phone,
    location: user.address,
    items: "",
    noi: "",
    reason: "",
    status: "pending",
    type: "",
        })

      return;
    }
    const newformData = {
      ...formData,
      items: item.Inventry_Item_DisplayName,
      type: type,
      status: "pending",
      noi: quantity,
    };


    const res = axios
      .post("http://localhost:8080/api/order/", newformData)
      .then((res) => {
        toast.success("orders added successfully");
      })
      .catch((err) => alert(err));
      setFormData({
        name: user.name,
  date: new Date(),
  phone: user.phone,
  location: user.address,
  items: "",
  noi: "",
  reason: "",
  status: "pending",
  type: "",
      })
  };

  return (
    <div>
      <div className="w-full  h-full bg-white shadow-lg rounded-xl ">
        <PHeader />

        <div className="flex flex-wrap ml-28 mt-16 p-10">
          <div className="bg-gray-300 border-8 border-blue-900 rounded-xl p-7 mr-32 mt-1 text-center text-2xl font-bold">
            <label>
              <img
                src={`http://localhost:8080${item.Image}`}
                className="w-60 h-90"
              />
            </label>
          </div>

          <div
            className="flex flex-wrap  bg-gray-300 border-1  border-blue-900 rounded-xl p-8 mr-32 mt-1   font-bold"
            style={{ width: "700px", height: "" }}
          >
            <div>
              <div>
                <label className="block mb-4 text-5xl">
                  {item.Inventry_Item_DisplayName}
                </label>
              </div>

              <div ><input className="bg-gray-300 w-28 text-2xl line-through" value={prices}/>
         <input className="bg-gray-300  text-md mt-1" value={discounts}/></div>
              <div className="mt-4 ">
                Description
                <label className="block mb-4 text-2xl mt-3">
                  {item.Inventry_Item_Description}
                </label>
              </div>
              <div>
                <label className="block mb-6 mt-4 text-2xl">
                  Rs.{" "}
                  {(item.Inventry_Item_Price * (100 - item.Inventry_Item_Discount)) /   100}
                </label>
              </div>

              <div className="d-flex mb-4">
                <button
                  className="btn btn-primary px-1 me-2 mr-3 mb-4 bg-[#2E4960] text-white w-8 h-8"
                  onClick={(e) => uincrement()}
                >
                  -
                </button>

                <input
                  value={quantity}
                  className="bg-gray-100 text-center w-10 h-8"
                />

                <button
                  onClick={(e) => increment()}
                  className="btn btn-primary px-3 ms-2 ml-3 mb-4 bg-[#2E4960] text-white w-8 h-8"
                >
                  +
                </button>
              </div>

              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => {
                  settype(e.target.value);
                }}
                className="mb-4 block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                required
              >
                <option value="">Select payment type</option>

                <option value="physical">physical</option>
                <option value="online">online</option>
              </select>

              <button
                onClick={onSubmit}
                className="bg-[#2E4960] p-3 w-[150px] text-white hover:bg-[#0012] text-sm rounded-md"
              >
               Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {showOnline && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[500px] rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 ">Payment portal</h2>
            <form action="/checkout" method="post">
              <div className="mb-4">
                <label
                  for="card-number"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Card number
                </label>
                <input
                  id="card-number"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  name="card-number"
                  type="text"
                  className="w-full px-4 py-2 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  for="card-expiration"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Expiration date
                </label>
                <input
                  id="card-expiration"
                  placeholder="xx-xx"
                  name="card-expiration"
                  type="text"
                  className="w-full px-4 py-2 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  for="card-cvc"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  CVC
                </label>
                <input
                  id="card-cvc"
                  placeholder="xxx"
                  name="card-cvc"
                  type="text"
                  className="w-full px-4 py-2 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  for="card-name"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Cardholder name
                </label>
                <input
                  id="card-name"
                  name="card-name"
                  type="text"
                  className="w-full px-4 py-2 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </form>

            <div className="flex">
              <button className="" onClick={() => setshowOnline(false)}>
                Close
              </button>
              <button
                className="ml-auto"
                onClick={() => {
                  setshowOnline(false);
                  toast.success("Order added sucessfully");
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
