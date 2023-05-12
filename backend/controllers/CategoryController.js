  //the router function of the express apckage is imported
let Category = require("../models/Category"); //import the category module

//create method
// http://localhost:8070/category/add

const createCategory = async(req,res) =>{
    //request body
    
    const CategoryName = req.body.CategoryName;
    const CategoryID = req.body.CategoryID;
    //image
    const Image = req.body.Image;
    

    const newCategory = new Category({
        CategoryName,
        CategoryID,
        Image
    })


    await newCategory.save().then(() => {
        
        res.json("Category Added")   //request body
    }).catch((err)=>{
        console.log("hello")
        console.log(err.message);
    })

}

//get method
//http://localhost:8070/category/

const getCategory = async(req,res)=>{

    await Category.find().then((category)=>{
        res.json(category)           //request body
    }).catch((err)=>{
        console.log(err)
    })
}


//update method
//http://localhost:8070/category/update/g76f6fgyg
const updateCategory =  async (req, res)=>{     //also can use post method  //we can use async function for get response from update request.it helpful for eliminate the crash
    let categoryID = req.params.id;   // catch the id value in the URL as a parameter
    const {CategoryName,CategoryID,Image} = req.body;                                 // use destructure method //write one line for get body request

    const updateCategory ={
        CategoryName,
        CategoryID,
        Image

    }

    const update = await Category.findByIdAndUpdate(categoryID, updateCategory).then(() => {
        res.status(200).send({status: "Category Updated"})
    }).catch((err) => {
        console.log(err)
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
}  
      

//delete method
//http://localhost:8070/category/delete/g76f6fgyg

const deleteCategory = async (req,res) => {
    let categoryID = req.params.id;

    await Category.findByIdAndDelete(categoryID)
    .then(() => {
        res.status(200).send({status: "Category Deleted!!!"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete category",error: err.message})
    })
}

    


//get method for one ID

const getOneCategory = async (req, res) => {
    let categoryID = req.params.id;
    const cat = await Category.findById(categoryID).then((Category) => {
        res.json(Category)           //request body

    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get category", error: err.message});
    })
}


const searchCategory = async (req, res) =>{
    const result = await Category.find({
        "$or": [
            {
                CategoryName: { $regex: req.params.key}
            },
            {
                CategoryID: { $regex: req.params.key}
            }

        ]
    });
    res.send(result);

}

module.exports = {createCategory,getCategory,updateCategory,deleteCategory,getOneCategory,searchCategory};


