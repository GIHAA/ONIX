const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: [false, 'Please add a name'],
    },
    date: {
        type: Date,
        required: false,
    },
    phone: {
        type: String,
        required: [false, 'Please add an price'],
    },
    location: {
        type: String,
        required: [false, 'Please add a details'],
    },
    items : {
        type: String,
        required: [false, 'Please add a items'],
    },
    noi : {
        type : Number,
        required : [false, 'Please add a totalunit'],
    },
    reason : {
        type : String,
        required : [false, 'Please add a reason'],
    },
    status: {
      type: String,
      enum: ['ready' , 'pending' , 'out-to-deliver' ],
    },
    price:{
      type: String,
      required: false,
    },
    type: {
        type: String,
        enum: ['online', 'physical' ],
        default: 'physical',
    },
  },
  {
    timestamps: false,
  }
)

module.exports = mongoose.model('Order', OrderSchema)

