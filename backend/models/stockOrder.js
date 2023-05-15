const mongoose = require("mongoose");

const StockSchema = mongoose.Schema(
  {
    orderid: {
      type: String,
      required: [true],
    },
    supplier: {},
    name: {
      type: String,
      required: [true],
    },
    supplier: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: [true],
    },
    date: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ["outtosale", "onhold", "returned"],
      default: "onhold",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("stockorder", StockSchema);
