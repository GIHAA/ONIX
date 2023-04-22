const mongoose = require("mongoose");

const quatationSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    details: {
      type: String,
      required: [true, "Please add a cus_id"],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("quatation", quatationSchema);
