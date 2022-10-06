const router = require("express").Router();

const pingRouter = require("./pingRouter");
const userRouter = require("./userRouter");


router.use("/ping", pingRouter);
router.use("/user", userRouter);


module.exports = router;