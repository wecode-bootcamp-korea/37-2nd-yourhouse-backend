const router = require("express").Router();

const { searchController } = require("../controllers");
const { getUserId } = require("../middleware/auth");


router.get("", searchController.getPostsByNav);
router.get("/product", searchController.getProducts);
router.get("/list", getUserId ,searchController.getPostLists);


module.exports = router;