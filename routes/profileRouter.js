const router = require("express").Router();

const { profileController } = require("../controllers");
const loginRequired = require("../middleware/auth");


router.get("", loginRequired, profileController.getProfile);
router.get("/post", loginRequired, profileController.getMyPosts);
router.get("/like", loginRequired, profileController.getLikePosts);


module.exports = router;