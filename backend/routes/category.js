const router = require("express").Router();
const Category_Inventry =require("../controllers/CategoryController");

//for image
const multer = require("multer");
const path = require("path");



router.post("/add",Category_Inventry.createCategory);
router.get("/all_categories",Category_Inventry.getCategory);
router.put("/update/:id",Category_Inventry.updateCategory);
router.delete("/delete/:id",Category_Inventry.deleteCategory);
router.get("/get/:id",Category_Inventry.getOneCategory);
router.get("/searchCategory/:key",Category_Inventry.searchCategory);



module.exports = router;