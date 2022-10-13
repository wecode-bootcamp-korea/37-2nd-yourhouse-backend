const router = require("express").Router();

const pingRouter = require("./pingRouter");
const profileRouter = require("./profileRouter");
const userRouter = require("./userRouter");
const searchRouter = require("./searchRouter");
const postRouter =require("./postRouter");
const commentRouter = require("./commentRouter");
const likeRouter = require("./likeRouter");
const postingRouter= require("./postingRouter")

router.use("/ping", pingRouter);
router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/search", searchRouter);
router.use("/post",postRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/post",postRouter)
router.use("/posting", postingRouter);

module.exports = router;