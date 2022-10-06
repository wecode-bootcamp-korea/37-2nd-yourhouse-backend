const router = require("express").Router();

const { postController } = require("../controllers");
const { getuserId } = require("../middleware/auth")
const { loginRequired } = require("../middleware/auth")

router.get("", getuserId, postController.posts);
router.get("follow", loginRequired, postController.follows );
router.delete("follow", loginRequired, postController.deleteFollow);
router.post("follow", loginRequired, postController.addFollow);

module.exports = router;