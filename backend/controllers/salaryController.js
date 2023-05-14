const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Salary = require('../models/salary')


const viewSalary = asyncHandler(async (req, res) => {
    const salary = await Salary.find({})

    salary? res.status(201).json(salary) : res.status(400).json({message : "Error"})
})

const addSalary = asyncHandler(async (req, res) => {
    const { name, month , salary , othours } = req.body

    const ssalary = await Salary.create({
        name,
        month,
        salary,
        othours
    })

    ssalary? res.status(201).json(ssalary) : res.status(400).json({message : "Error"})

})

const updateSalary = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { month, name, salary , othours} = req.body;
  
    // Wait for the Salary model to find the document by ID
    const ssalary = await Salary.findOne({ _id: id });
  
    if (ssalary) {
      // Update the salary document with new values
      ssalary.month = month || ssalary.month;
      ssalary.name = name || ssalary.name;
      ssalary.salary= salary|| ssalary.salary;
      ssalary.othours = othours || ssalary.othours;
      // Save the updated document and wait for it to complete
      await ssalary.save();
  
      res.status(201).json(ssalary);
    } else {
      res.status(400).json({ message: "Error" });
    }
  });
  


const deleteSalary = asyncHandler(async (req, res) => {

    const id = req.params.id
    const salary = await Salary.findByIdAndDelete(id)

    salary? res.status(201).json(salary) : res.status(400).json({message : "Error"})
});
  

module.exports = {
  viewSalary,
  addSalary,
  updateSalary,
  deleteSalary
}
