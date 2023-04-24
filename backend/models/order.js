const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    date: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: [true, 'Please add an price'],
        unique: true,
    },
    location: {
        type: String,
        required: [true, 'Please add a details'],
    },
    items : {
        type: String,
        required: [true, 'Please add a items'],
    },
    noi : {
        type : Number,
        required : [true, 'Please add a totalunit'],
    },
    reason : {
        type : String,
        required : [true, 'Please add a reason'],
    },
    status: {
      type: String,
      enum: ['ready' , 'pending' ],
    },
    type: {
        type: String,
        enum: ['online', 'physical' ],
        default: 'physical',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', OrderSchema)

