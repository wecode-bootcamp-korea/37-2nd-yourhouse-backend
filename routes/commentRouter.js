const router = require("express").Router();

const { commentController } = require("../controllers");
const { loginRequired, getuserId } = require("../middleware/auth");


router.get("", getuserId, commentController.getComment);
router.post("", loginRequired, commentController.postComment);
router.delete("", loginRequired, commentController.deleteComment);


module.exports = router;