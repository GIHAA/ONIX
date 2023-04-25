const mongoose = require('mongoose');  //connect with mongodb ,(import mongoose package) 

const Schema = mongoose.Schema;

const categorySchema = new Schema({   // create schema

    CategoryName : {
        type : String,
        required : true
    },
    CategoryID : {
        type : String,
        required : true
    }
 


    
    

})

const Category = mongoose.model("category",categorySchema)    // mongoose.model("documentName",schemaName);

module.exports = Category;  // export 'Category' module