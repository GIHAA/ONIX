const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    username: {
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
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", feedbackSchema);
