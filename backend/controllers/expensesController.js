const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Expenses  = require('../models/expenses')


const viewExpenses  = asyncHandler(async (req, res) => {
    const expenses  = await Expenses .find({})

    expenses ? res.status(201).json(expenses ) : res.status(400).json({message : "Error"})
})

const addExpenses  = asyncHandler(async (req, res) => {
  const { invoiceno, description, date, Remarks, Amount } = req.body;
  const userExists = await Expenses.findOne({ invoiceno })

  if (userExists) {
    res.status(400)
    throw new Error('error already exists')
  }

  const expenses = await Expenses.create({
    invoiceno: invoiceno,
    description: description,
    date: date,
    Remarks: Remarks,
    Amount: Amount
  });
  
    expenses ? res.status(201).json(expenses ) : res.status(400).json({message : "Error"})

})

const updateExpenses  = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { invoiceno, description, date, Remarks, Amount } = req.body;

    const userExists = await Expenses.findOne({ invoiceno })

    if (userExists) {
      res.status(400)
      throw new Error('error already exists')
    }
  
  
    // Wait for the Expenses  model to find the document by ID
    const expenses  = await Expenses .findOne({ _id: id });
  
    if (expenses ) {
      // Update the expenses  document with new values
      expenses .invoiceno = invoiceno || expenses .invoiceno;
      expenses .description = description || expenses .description;
      expenses .date= date|| expenses .date;
      expenses .Remarks = Remarks || expenses .Remarks;
      expenses .Amount = Amount || expenses .Amount;
      // Save the updated document and wait for it to complete
      await expenses .save();
  
      res.status(201).json(expenses );
    } else {
      res.status(400).json({ message: "Error" });
    }
  });
  


const deleteExpenses  = asyncHandler(async (req, res) => {

    const id = req.params.id
    const expenses  = await Expenses .findByIdAndDelete(id)

    expenses ? res.status(201).json(expenses ) : res.status(400).json({message : "Error"})
});
  

module.exports = {
  viewExpenses ,
  addExpenses ,
  updateExpenses ,
  deleteExpenses 
}
