const { required } = require('joi')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    age:{
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false,
    },
    gender:{
        type: String,
        required: false
    },
    educationqualifications:{
        type: String,
        required: false
    },
    position:{
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: [false, 'Please add a username'],
    },
    Gender : {
        type: String,
        required: [false]
    },
    dob : {
        type: Date,
        required: [false]
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      enum: ['customer', 'driver', 'accountant' , 'humanResourcesManager' , 'salesOfficer' , 'systemAdminstrator' , 'stockController' , 'customerServiceManager' ],
      default: 'customer',
      required: [true, 'Please add a role'],
    },
    image : {
      type : String,
      required: false,
    },
    experience: {
        type : String,
        required: false,
    },
    vehicletype:{
        type : String,
        required: false,
    },
    vehiclenumber:{
        type : String,
        required: false,
    },
    license:{
        type : String,
        required: false,        
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
