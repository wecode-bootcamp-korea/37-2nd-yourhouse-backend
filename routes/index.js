const router = require("express").Router();

const pingRouter = require("./pingRouter");
const profileRouter = require("./profileRouter");
const userRouter = require("./userRouter");
const searchRouter = require("./searchRouter");


router.use("/ping", pingRouter);
router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/search", searchRouter);


module.exports = router;