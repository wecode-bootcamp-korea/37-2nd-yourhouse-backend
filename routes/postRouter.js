const router = require("express").Router();

const { postController } = require("../controllers");


router.get("", postController.posts);


module.exports = router;