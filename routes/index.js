const router = require("express").Router();

const pingRouter = require("./pingRouter");
const profileRouter = require("./profileRouter");
const userRouter = require("./userRouter");
const searchRouter = require("./searchRouter");
const postRouter =require("./postRouter");
const commentRouter = require("./commentRouter")

router.use("/ping", pingRouter);
router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/search", searchRouter);
router.use("/post",postRouter);
router.use("/comment", commentRouter);

module.exports = router;