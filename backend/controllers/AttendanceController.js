const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Attendance = require('../models/attendance')


const viewAttendance = asyncHandler(async (req, res) => {
    const attendance = await Attendance.find({})

    attendance? res.status(201).json(attendance) : res.status(400).json({message : "Error"})
})

const addAttendance = asyncHandler(async (req, res) => {
    const { role, date ,type } = req.body

    const attendance = await Attendance.create({
        role,
        date,
        type,
    })

    attendance? res.status(201).json(attendance) : res.status(400).json({message : "Error"})

})

const updateAttendance = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { date, role, type } = req.body;
  
    // Wait for the Attendance model to find the document by ID
    const attendance = await Attendance.findOne({ _id: id });
  
    if (attendance) {
      // Update the attendance document with new values
      attendance.date = date || attendance.date;
      attendance.role = role || attendance.role;
      attendance.type = type || attendance.type;
  
      // Save the updated document and wait for it to complete
      await attendance.save();
  
      res.status(201).json(attendance);
    } else {
      res.status(400).json({ message: "Error" });
    }
  });
  


const deleteAttendance = asyncHandler(async (req, res) => {

    const id = req.params.id
    const attendance = await Attendance.findByIdAndDelete(id)

    attendance? res.status(201).json(attendance) : res.status(400).json({message : "Error"})
});
  

module.exports = {
  addAttendance,
  viewAttendance,
  updateAttendance,
  deleteAttendance
}
