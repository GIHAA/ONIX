const mongoose = require("mongoose");

const SuppliersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a cus_id"],
    },
    phone: {
        type : Number,
        required : [true, "Please add a phone number"]
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("suppliers", SuppliersSchema);
