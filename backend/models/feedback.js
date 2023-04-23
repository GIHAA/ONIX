const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    about: {
      type: String,
      required: [true, "Please add a name"],
    },
    details: {
      type: String,
      required: [true, "Please add a cus_id"],
    },
    reply: {
      type: String,
      required: [false],
      default : "no reply"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", feedbackSchema);
