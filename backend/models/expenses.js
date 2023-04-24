const mongoose = require("mongoose");

const ExpensesSchema = mongoose.Schema(
  {
    invoiceno: {
      type: String,
      required: [true,],
    },
    description: {
      type: String,
      required: [true, ],
    },
    date: {
        type : Date,
        required : [true, ]
    },
    Remarks: {
        type: String,
        required: false,
      },
    Amount : {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("expenses ", ExpensesSchema);
