const router = require("express").Router();

const { commentController } = require("../controllers");
const { getuserId, loginRequired } = require("../middleware/auth");


router.post("", loginRequired, commentController.postComment);
router.get("", getuserId ,commentController.getComment);
router.delete("",loginRequired,commentController.deleteComment)

module.exports = router;