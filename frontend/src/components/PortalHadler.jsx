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
        return <CustomerPortal />;
      // case "driver":
      //   return <DriverPortal />; // optional
      case "accountant":
        return <AccountantPortal />;
      case "humanResourcesManager":
        return <HumanResourcesManagerPortal />;
      case "salesOfficer":
        return <SalesOfficerPortal />;
      case "stockController":
        return <StockControllerPortal />;
        
      // case "customerServiceManager":
      //   return <CustomerServiceManagerPortal />; // optional
      default:
        return <CustomerPortal />;
    }
  };

  return <>{user ? renderPortals(user.role) : <Home />}</>;
}

export default PortalHandler;
