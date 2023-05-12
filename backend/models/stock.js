const mongoose = require("mongoose");

const StockSchema = mongoose.Schema(
  {
    stockid: {
      type: String,
      required: [true,],
    },
    name: {
      type: String,
      required: [true, ],
    },
    quantity : {
        type : Number,
        required : [true, ]
    },
    date : {
        type: Date,
        required: false,
      },
    status: {
        type: String,
        enum: ['outtosale', 'onhold' , 'returned' ],
        default: 'onhold',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("stock", StockSchema);
