const router  = require("express").Router();
const upload = require("../util/multer")
const { postingController } = require("../controllers");
const { loginRequired } = require("../middleware/auth");

router.post("", upload.single("img"), loginRequired, postingController.createPost);

module.exports = router
