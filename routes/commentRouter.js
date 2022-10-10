const router = require("express").Router();

const { commentController } = require("../controllers");


router.post("", commentController.postComment);
router.get("",commentController.getComment);
router.delete("",commentController.deleteComment)

module.exports = router;