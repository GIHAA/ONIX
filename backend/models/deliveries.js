const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema(
  {
    no: {
      type: String,
      required: [true, "Please add a name"],
    },
    driver: {
      type: String,
      required: [true, "Please add a cus_id"],
    },
    order_date: {
      type: String,
      required: false,
    },
    delivery_date: {
      type: String,
      required: false,
    },
    orderid :{
      type: String,
      required: [true, "Please add a orderid"],
    },
    status : {
      type: String,
      enum: ['ongoing', 'processing', 'completed' , 'canceled' ],
      default: 'ongoing',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deliveries", deliverySchema);
