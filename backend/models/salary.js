const mongoose = require("mongoose");

const salarySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [false],
    },
    month: {
      type: String,
      required: [false],
    },
    salary: {
        type : Number,
        required : [false]
    },
    othours: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("salary", salarySchema);
