const router = require("express").Router();

const { searchController } = require("../controllers");
const { getuserId } = require("../middleware/auth");


router.get("", searchController.getPostsByNav);
router.get("/product", searchController.getProducts);
router.get("/list", getuserId ,searchController.getPostLists);


module.exports = router;