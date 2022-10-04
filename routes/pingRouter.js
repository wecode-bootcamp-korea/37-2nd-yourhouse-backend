const router = require("express").Router();

const { pingController } = require("../controllers");


router.get("", pingController.getPing);


module.exports = router;