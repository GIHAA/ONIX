const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Please add a role"],
    },
    date: {
      type: Date,
      required: [true, "Please add a Date"],
    },
    type: {
      type: String,
      required: [true, "Please add a type"],
      enum : ['arrival' , 'leave'],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("attendance", attendanceSchema);
