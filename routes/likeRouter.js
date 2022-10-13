const router = require("express").Router();

const { likeController } = require("../controllers");
const { loginRequired } = require("../middleware/auth")

router.post("", loginRequired, likeController.addLike);
router.delete("", loginRequired, likeController.deleteLike);


module.exports = router;