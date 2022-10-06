const router = require("express").Router();

const { userController } = require("../controllers");


router.get("/auth", userController.authUser);


module.exports = router;