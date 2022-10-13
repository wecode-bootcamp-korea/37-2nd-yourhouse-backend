const router  = require("express").Router();
const upload = require("../util/multer")
const { postingController } = require("../controllers");

router.post("", upload.single("img"), postingController.createPost);

module.exports = router
