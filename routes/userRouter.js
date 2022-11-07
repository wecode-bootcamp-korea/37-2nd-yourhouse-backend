const router = require("express").Router();

const { userController } = require("../controllers");


router.get("/auth", userController.authUser);
router.post("/follow", loginRequired, postController.addFollow);
router.delete("/follow", loginRequired, userController.deleteFollow);
router.post("/like", loginRequired, userController.addLike);
router.delete("/like", loginRequired, userController.deleteLike);


module.exports = router;