const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Deliveries = require('../models/deliveries')


const viewDeliveries = asyncHandler(async (req, res) => {
    const deliveries = await Deliveries.find({})

    deliveries? res.status(201).json(deliveries) : res.status(400).json({message : "Error"})
})

const addDeliveries = asyncHandler(async (req, res) => {
    const { driver, no , order_date , delivery_date , orderid } = req.body

    const exdeliveries = await Deliveries.findOne({ no })

    if (exdeliveries) {
      res.status(400)
      throw new Error('no already exists')
    }
  

    const deliveries = await Deliveries.create({
        no,
        driver,
        order_date,
        delivery_date,
        status : 'ongoing',
        orderid

    })

    deliveries? res.status(201).json(deliveries) : res.status(400).json({message : "Error"})

})

const updateDeliveries = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { no, driver, order_date , delivery_date , status , orderid} = req.body;

    const exdeliveries = await Deliveries.findOne({ no })

    if (exdeliveries) {
      res.status(400)
      throw new Error('no already exists')
    }
  
    // Wait for the Deliveries model to find the document by ID
    const deliveries = await Deliveries.findOne({ _id: id });
  
    if (deliveries) {
      // Update the deliveries document with new values
      deliveries.no = no || deliveries.no;
      deliveries.driver = driver || deliveries.driver;
      deliveries.order_date= order_date|| deliveries.reply;
      deliveries.delivery_date = delivery_date || deliveries.delivery_date;
      deliveries.status = status || deliveries.status;
      deliveries.orderid = orderid || deliveries.orderid;
      // Save the updated document and wait for it to complete
      await deliveries.save();
  
      res.status(201).json(deliveries);
    } else {
      res.status(400).json({ message: "Error" });
    }
  });
  


const deleteDeliveries = asyncHandler(async (req, res) => {

    const id = req.params.id
    const deliveries = await Deliveries.findByIdAndDelete(id)

    deliveries? res.status(201).json(deliveries) : res.status(400).json({message : "Error"})
});
  

module.exports = {
  viewDeliveries,
  addDeliveries,
  updateDeliveries,
  deleteDeliveries
}
