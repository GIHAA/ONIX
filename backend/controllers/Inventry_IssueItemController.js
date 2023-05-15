  //the router function of the express apckage is imported
  let IssueItems = require("../models/Inventry_IssuedItems"); //import the category module

  //create method
  // http://localhost:8070/Inventry_IssueItems/add
  
  const createIssueItems = async(req,res) =>{
      //request body
      
      const Inventry_Item_ID = req.body.Inventry_Item_ID;
      const Inventry_Item_Name = req.body.Inventry_Item_Name;
      const Inventry_Item_DisplayName= req.body.Inventry_Item_DisplayName;
      const Inventry_Item_Description = req.body.Inventry_Item_Description;
      const Image = req.body.Image;
      const Inventry_Item_Category = req.body.Inventry_Item_Category;
      const Inventry_Item_IssuedQuantity = Number(req.body.Inventry_Item_IssuedQuantity);
      const Inventry_Item_Price = Number(req.body.Inventry_Item_Price);
      const Inventry_Item_Discount = Number(req.body.Inventry_Item_Discount);
      const Inventry_Item_SellPrice = Number(req.body.Inventry_Item_SellPrice);
      const Inventry_Item_Author = req.body.Inventry_Item_Author; 
      const Inventry_Item_Language = req.body.Inventry_Item_Language; 
      const Inventry_Item_ExDate = req.body.Inventry_Item_ExDate;
   
      
  
      const newIssueItem = new IssueItems({
          Inventry_Item_ID,
          Inventry_Item_Name,
          Inventry_Item_DisplayName,
          Inventry_Item_Description,
          Image,
          Inventry_Item_Category,
          Inventry_Item_IssuedQuantity,
          Inventry_Item_Price,
          Inventry_Item_Discount,
          Inventry_Item_SellPrice,
          Inventry_Item_Author,
          Inventry_Item_Language,
          Inventry_Item_ExDate
      })
  
  
      await newIssueItem.save().then(() => {
          
          res.json("Issue Item Added")   //request body
      }).catch((err)=>{
          console.log("added")
          console.log(err.message);
      })
  
  }
  
  //get method
  //http://localhost:8070/Inventry_IssueItems/
  
  const getIssueItems = async(req,res)=>{
  
      await IssueItems.find().then((issueItems)=>{
          res.json(issueItems)           //request body
      }).catch((err)=>{
          console.log(err)
      })
  }
  
  
  //update method
  //http://localhost:8070/Inventry_IssueItems/update/g76f6fgyg
  const updateIssueItems =  async (req, res)=>{     //also can use post method  //we can use async function for get response from update request.it helpful for eliminate the crash
      let issueItemID = req.params.id;   // catch the id value in the URL as a parameter
      const {Inventry_Item_ID,Inventry_Item_Name,Inventry_Item_DisplayName,Inventry_Item_Description,Image,Inventry_Item_Category,Inventry_Item_IssuedQuantity,Inventry_Item_Price,Inventry_Item_Discount,Inventry_Item_SellPrice,Inventry_Item_Author,Inventry_Item_ExDate,Inventry_Item_Language} = req.body;      // use destructure method //write one line for get body request
  
      const updateIssueItems ={
        Inventry_Item_ID,
        Inventry_Item_Name,
        Inventry_Item_DisplayName,
        Inventry_Item_Description,
        Image,
        Inventry_Item_Category,
        Inventry_Item_IssuedQuantity,
        Inventry_Item_Price,
        Inventry_Item_Discount,
        Inventry_Item_SellPrice,
        Inventry_Item_Author,
        Inventry_Item_Language,
        Inventry_Item_ExDate
  
      }
  
      const update = await IssueItems.findByIdAndUpdate(issueItemID, updateIssueItems).then(() => {
          res.status(200).send({status: "Item Updated"})
      }).catch((err) => {
          console.log(err)
          res.status(500).send({status: "Error with updating data", error: err.message});
      })
  }  
        
  
  //delete method
  //http://localhost:8070/Inventry_IssueItems/delete/g76f6fgyg
  
  const deleteIssueItem = async (req,res) => {
      let issueItemID = req.params.id;
  
      await IssueItems.findByIdAndDelete(issueItemID)
      .then(() => {
          res.status(200).send({status: "Item Deleted!!!"});
      }).catch((err) => {
          console.log(err.message);
          res.status(500).send({status: "Error with delete item",error: err.message})
      })
  }
  
      
  
  
  //get method for one ID
  
  const getOneItem = async (req, res) => {
      let issueItemID = req.params.id;
      const cat = await IssueItems.findById(issueItemID).then((IssueItems) => {
          res.json(IssueItems)           //request body
  
      }).catch(() => {
          console.log(err.message);
          res.status(500).send({status: "Error with get item", error: err.message});
      })
  }
  
  
  const searchIssueItem = async (req, res) =>{
      const result = await IssueItems.find({
          "$or": [
              {
                Inventry_Item_ID: { $regex: req.params.key}
              },
              {
                Inventry_Item_Name: { $regex: req.params.key}
              },
              {
                Inventry_Item_DisplayName: { $regex: req.params.key}
              },
              {
                Inventry_Item_Category: { $regex: req.params.key}
              },
              {
                Inventry_Item_Author: { $regex: req.params.key}
              },
              {
                Inventry_Item_ExDate: { $regex: req.params.key}
              }
          ]
      });
      res.send(result);
  
  }
  
  module.exports = {createIssueItems,getIssueItems,updateIssueItems,deleteIssueItem,getOneItem,searchIssueItem};
  
  
