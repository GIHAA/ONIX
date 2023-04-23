import React from "react";
import { useSelector } from "react-redux";
import CustomerPortal from "./customer/CustomerPortal";
import Home from "./Home";
import HumanResourcesManagerPortal from "./humanResource/HumanResourcePortal";

function PortalHandler() {
  const { user } = useSelector((state) => state.auth);

  const renderPortals = (role) => {
    switch (role) {
      case "customer":
        return <CustomerPortal />;
      // case "driver":
      //   return <DriverPortal />;
      // case "accountant":
      //   return <AccountantPortal />;
      case "humanResourcesManager":
        return <HumanResourcesManagerPortal />;
      // case "salesOfficer":
      //   return <SalesOfficerPortal />;
      // case "systemAdminstrator":
      //   return <SystemAdministratorPortal />;
      // case "stockController":
      //   return <StockControllerPortal />;
      // case "customerServiceManager":
      //   return <CustomerServiceManagerPortal />;
      default:
        return <CustomerPortal />;
    }
  };

  return <>{user ? renderPortals(user.role) : <Home />}</>;
}

export default PortalHandler;
