const router = require("express").Router();

const { commentController } = require("../controllers");
const { loginRequired, getUserId } = require("../middleware/auth");


router.get("", getUserId, commentController.getComments);
router.post("", loginRequired, commentController.postComment);
router.delete("", loginRequired, commentController.deleteComment);


module.exports = router;