import React from "react";
import { useSelector } from "react-redux";
import CustomerPortal from "./customer/CustomerPortal";
import Home from "./Home";
import HumanResourcesManagerPortal from "./humanResource/HumanResourcePortal";
import StockControllerPortal from "./stockController/StockControllerPortal";
import SalesOfficerPortal from "./salesOfficer/SalesOfficerPortal";
import AccountantPortal from "./accountant/AccountantPortal";

function PortalHandler() {
  const { user } = useSelector((state) => state.auth);

  const renderPortals = (role) => {
    switch (role) {
      case "customer":
        return <CustomerPortal />;  // p3
      case "accountant":
        return <AccountantPortal />; // 
      case "humanResourcesManager":
        return <HumanResourcesManagerPortal />; // 
      case "salesOfficer":
        return <SalesOfficerPortal />; // 
      case "stockController":
        return <StockControllerPortal />;

        case "driver": // p1
          return <StockControllerPortal />;

        case "customerServiceManager": // p5
          return <StockControllerPortal />;

      default:
        return <CustomerPortal />;
    }
  };

  return <>{user ? renderPortals(user.role) : <Home />}</>;
}

export default PortalHandler;


//p1 4 hours

//p2.1  home page // shopping cart -> order , item display (without image) --> db ,  4 hours
//p2.2   3 hours 

//p4  new side // order CRUD --> db ,  4 - 5 hours

//p5  HumanResourcesManagerPortal ( CRUD revist ) -> 3 - 4 hours

//p5.1 customerServiceManager --> customer CRUD
//p5.2 customerServiceManager --> customer feedback reply

//p7 main --> attendance ( like profile ) create read on HR --> db ,  4 hours

//p8.1 user attibutes change -- 4 hours
//p8.2 user attibutes change -- 4 hours

//p9 driver portal (add new attributes) 4 hours
//p9.1 deliveries status change (status drop down) 4 hours




