const mongoose = require('mongoose');  //connect with mongodb ,(import mongoose package) 

const Schema = mongoose.Schema;

const Inventry_IssueItemsSchema = new Schema({   // create schema

    Inventry_Item_ID : {
        type : String,
        required : true
    },
    Inventry_Item_Name: {
        type : String,
        required : true
    },
    Inventry_Item_DisplayName: {
        type : String,
        required : true
    },
    Inventry_Item_Description: {
        type : String,
        required : true
    },
    //image
    Image :{
        type : String,
        required: true

    },
    Inventry_Item_Category: {
        type : String,
        required : true
    },
    Inventry_Item_IssuedQuantity: {
        type : Number,
        required : true
    },
    Inventry_Item_Price: {
        type : Number,
        required : true
    },
    Inventry_Item_Discount: {
        type : Number,
        required : true
    },
    Inventry_Item_SellPrice: {
        type : Number,
        required : true
    },
    Inventry_Item_Author: {
        type : String,
        required : true
    },
    Inventry_Item_ExDate: {
        type : String,
        required : true
    },
    Inventry_Item_Language: {
        type : String,
        required : true
    }

})

const Inventry_IssuedItems = mongoose.model("Inventry_IssueItems",Inventry_IssueItemsSchema)    // mongoose.model("documentName",schemaName);

module.exports = Inventry_IssuedItems;  // export 'Category' module