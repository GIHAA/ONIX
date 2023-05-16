import React from "react";
import { useSelector } from "react-redux";
import CustomerPortal from "./customer/CustomerPortal";
import Home from "./Home";
import HumanResourcesManagerPortal from "./humanResource/HumanResourcePortal";
import StockControllerPortal from "./stockController/StockControllerPortal";
import SalesOfficerPortal from "./salesOfficer/SalesOfficerPortal";
import AccountantPortal from "./accountant/AccountantPortal";
import CustomerServiceManagerPortal from "./customerServiceManager/CustomerServiceManagerPortal"
import DriverPortal from "./driver/DriverPortal"

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
          return <DriverPortal />;

        case "customerServiceManager": // p5
          return <CustomerServiceManagerPortal />;

      default:
        return <CustomerPortal />;
    }
  };

  return <>{user ? renderPortals(user.role) : <Home />}</>;
}

export default PortalHandler;

// done p1 4 hours

// (asanka issue) p2.1  home page // shopping cart -> order , item display (without image) --> db ,  4 hours
// (asanka issue) p2.2  3 hours 

// done p4  new side // order CRUD --> db ,  4 - 5 hours

// done p5  HumanResourcesManagerPortal ( CRUD revist ) -> 3 - 4 hours

// done p5.1 customerServiceManager --> customer CRUD
// done p5.2 customerServiceManager --> customer feedback reply

// done  |||| in(add sort) p7 main --> attendance ( like profile ) create read on HR --> db ,  4 hours

// done p8.1 user attibutes change -- 4 hours

//--- may 12

// done p13 backlog - asanka shopping cart , customer delete button ,  cs add-> register , cs cus coloum -role +address, phone , cs cus no edit ,  

// p8.2 user attibutes change -- 4 hours

// p9 driver portal (add new attributes (whatsappp )) 4 hours
// p9.1 deliveries status change (status drop down) 4 hours
// p11 stockController change delete -> return stock
// stockController change delete -> return stock

// p12 stock controller return function ( should store the returned amount in db(new attibute) ) 4 hours

// p14

// done p15 attendace

//--- may 15.5
//--- validation 0.5
//--- testing 0.5

// non --- edits should fill with old data (back up place holder)


//mid
//p13 stock controller stock order CRUD 

//unclear
//p11 accountant (salary) 4 hours --> attributes whatsappp
//p11.1 accountant (salary) 4 hours


//--- new

// done connect asanka part -- 13
// done driver -- 14
// done stock controller stock order CRUD / supplier orders / same attributes (stock) -- 14 
// done quality should change color , change delete to remove -- 14
// done salary name , month , salary , ot hours -- 14
// done ( asanka issue only add i items to the order with quantity ) shooping cart -- 14 

// validation / finalizing -- 15 ( morning )

// done report - csm customer list -- 16 ( evening )
// done report - hr attendace list 
// done report - accountant salary report -- 16 ( evening )
//  report - cs suppiler list -- 16 ( evening )
// report - cs stock order -- 16 ( evening )
// on report - so orders -- 16 ( evening )
// report - deliveries -- 16 ( evening )