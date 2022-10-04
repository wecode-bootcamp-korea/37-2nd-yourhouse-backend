const router = require("express").Router();

const pingRouter = require("./pingRouter");


router.use("/ping", pingRouter);


module.exports = router;