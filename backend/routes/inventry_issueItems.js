const router = require("express").Router();
const InventryIssuedItems =require("../controllers/Inventry_IssueItemController");

//for image
const multer = require("multer");
const path = require("path");



router.post("/add_IssueItem",InventryIssuedItems.createIssueItems);
router.get("/getAllItems",InventryIssuedItems.getIssueItems);
router.put("/update_IssueItem/:id",InventryIssuedItems.updateIssueItems);
router.delete("/delete_IssueItem/:id",InventryIssuedItems.deleteIssueItem);
router.get("/get_OneIssueItem/:id",InventryIssuedItems.getOneItem);
router.get("/search_IssueItem/:key",InventryIssuedItems.searchIssueItem);


//for image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/uploadImage/"));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  router.post("/upload", upload.single("image"), (req, res, next) => {
    return res.json({
      path: `/uploadImage/${req.file.filename}`
    });
  });









module.exports = router;