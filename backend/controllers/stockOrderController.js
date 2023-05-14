const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Stockorder  = require('../models/stockOrder')


const viewStock  = asyncHandler(async (req, res) => {
    const stockorder  = await Stockorder .find({})

    stockorder ? res.status(201).json(stockorder ) : res.status(400).json({message : "Error"})
})

const addStock  = asyncHandler(async (req, res) => {
    const { orderid, name , quantity , date , status , supplier} = req.body


    const copy = await Stockorder.findOne({ orderid : orderid })

    if(copy){
        res.status(400)
        throw new Error('Stockorder already exists')
    }
    
    const stockorder  = await Stockorder.create({
        orderid,
        name,
        quantity,
        date,
        status,
        supplier
    })

    stockorder ? res.status(201).json(stockorder ) : res.status(400).json({message : "Error"})

})

const updateStock  = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, orderid, quantity , date , status , supplier} = req.body;
  
    // Wait for the Stockorder  model to find the document by ID
    const stockorder  = await Stockorder .findOne({ _id: id });
  
    if (stockorder ) {
      // Update the stockorder  document with new values
      stockorder.name = name || stockorder.name;
      stockorder.orderid = orderid || stockorder.orderid;
      stockorder.quantity= quantity|| stockorder.quantity;
      stockorder.date = date || stockorder.date;
      stockorder.status = status || stockorder.status;
      stockorder.supplier = supplier || stockorder.supplier
      // Save the updated document and wait for it to complete

     
      await stockorder .save();
  
      res.status(201).json(stockorder );
    } else {
      res.status(400).json({ message: "Error" });
    }
  });
  


const deleteStock  = asyncHandler(async (req, res) => {

    const id = req.params.id
    const stockorder  = await Stockorder .findByIdAndDelete(id)

    stockorder ? res.status(201).json(stockorder ) : res.status(400).json({message : "Error"})
});
  

module.exports = {
  addStock ,
  viewStock ,
  updateStock ,
  deleteStock 
}
