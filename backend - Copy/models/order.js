const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    cus_id: {
        type: String,
        required: [true, 'Please add a cus_id'],
    },
    price: {
        type: String,
        required: [true, 'Please add an price'],
        unique: true,
    },
    details: {
        type: String,
        required: [true, 'Please add a details'],
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed' , 'canceled' ],
        default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', OrderSchema)

