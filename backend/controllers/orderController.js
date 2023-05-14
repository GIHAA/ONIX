const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Order = require('../models/order')


const viewOrder = asyncHandler(async (req, res) => {
    const order = await Order.find({})

    order? res.status(201).json(order) : res.status(400).json({message : "Error"})
})

const addOrder = asyncHandler(async (req, res) => {
    const { name, date , phone , location , items , noi , reason , status , type , price} = req.body
    

    const order = await Order.create({
        name,
        date,
        phone,
        location,
        items,
        noi,
        reason,
        status,
        type,
        price
    })

    order? res.status(201).json(order) : res.status(400).json({message : "Error"})

})

const updateOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, date , phone , location , items , noi , reason , status , type} = req.body
  
    // Wait for the Order model to find the document by ID
    const order = await Order.findOne({ _id: id });
  
    if (order) {
      // Update the order document with new values
      order.date = date || order.date;
      order.name = name || order.name;
      order.phone = phone || order.phone;
      order.location = location || order.location;
      order.items = items || order.items;
      order.noi = noi || order.noi;
      order.reason = reason || order.reason;
      order.status = status || order.status;
      order.type = type || order.type;      
      order.price = price || order.price; 
      // Save the updated document and wait for it to complete
      await order.save();
  
      res.status(201).json(order);
    } else {
      res.status(400).json({ message: "Error" });
    }
  });
  


const deleteOrder = asyncHandler(async (req, res) => {

    const id = req.params.id
    const order = await Order.findByIdAndDelete(id)

    order? res.status(201).json(order) : res.status(400).json({message : "Error"})
});
  

module.exports = {
  addOrder,
  viewOrder,
  updateOrder,
  deleteOrder
}
