const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Stock  = require('../models/stock')


const viewStock  = asyncHandler(async (req, res) => {
    const stock  = await Stock .find({})

    stock ? res.status(201).json(stock ) : res.status(400).json({message : "Error"})
})

const addStock  = asyncHandler(async (req, res) => {
    const { stockid, name , quantity , date , status } = req.body
    console.log(quantity)
    const stock  = await Stock.create({
        stockid,
        name,
        quantity,
        date,
        status
    })

    stock ? res.status(201).json(stock ) : res.status(400).json({message : "Error"})

})

const updateStock  = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, stockid, quantity , date} = req.body;
  
    // Wait for the Stock  model to find the document by ID
    const stock  = await Stock .findOne({ _id: id });
  
    if (stock ) {
      // Update the stock  document with new values
      stock.name = name || stock.name;
      stock.stockid = stockid || stock.stockid;
      stock.quantity= quantity|| stock.reply;
      stock.date = date || stock.date;
      stock.status = status || stock.status;
      // Save the updated document and wait for it to complete
      await stock .save();
  
      res.status(201).json(stock );
    } else {
      res.status(400).json({ message: "Error" });
    }
  });
  


const deleteStock  = asyncHandler(async (req, res) => {

    const id = req.params.id
    const stock  = await Stock .findByIdAndDelete(id)

    stock ? res.status(201).json(stock ) : res.status(400).json({message : "Error"})
});
  

module.exports = {
  addStock ,
  viewStock ,
  updateStock ,
  deleteStock 
}
