const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Suppliers = require('../models/suppliers')


const viewSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Suppliers.find({})

    suppliers? res.status(201).json(suppliers) : res.status(400).json({message : "Error"})
})

const addSuppliers = asyncHandler(async (req, res) => {
    const { name, email , phone , description } = req.body

    const suppliers = await Suppliers.create({
        name,
        email,
        phone,
        description
    })

    suppliers? res.status(201).json(suppliers) : res.status(400).json({message : "Error"})

})

const updateSuppliers = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { email, name, phone , description} = req.body;
  
    // Wait for the Suppliers model to find the document by ID
    const suppliers = await Suppliers.findOne({ _id: id });
  
    if (suppliers) {
      // Update the suppliers document with new values
      suppliers.email = email || suppliers.email;
      suppliers.name = name || suppliers.name;
      suppliers.phone= phone|| suppliers.reply;
      suppliers.description = description || suppliers.description;
      // Save the updated document and wait for it to complete
      await suppliers.save();
  
      res.status(201).json(suppliers);
    } else {
      res.status(400).json({ message: "Error" });
    }
  });
  


const deleteSuppliers = asyncHandler(async (req, res) => {

    const id = req.params.id
    const suppliers = await Suppliers.findByIdAndDelete(id)

    suppliers? res.status(201).json(suppliers) : res.status(400).json({message : "Error"})
});
  

module.exports = {
  viewSuppliers,
  addSuppliers,
  updateSuppliers,
  deleteSuppliers
}
