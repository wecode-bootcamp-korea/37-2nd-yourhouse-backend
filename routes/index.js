const router = require("express").Router();

const pingRouter = require("./pingRouter");
const profileRouter = require("./profileRouter");
const userRouter = require("./userRouter");


router.use("/ping", pingRouter);
router.use("/user", userRouter);
router.use("/profile", profileRouter);


module.exports = router;