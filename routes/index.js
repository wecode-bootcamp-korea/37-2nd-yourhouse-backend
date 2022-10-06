const router = require("express").Router();

const pingRouter = require("./pingRouter");
const postRouter =require("./postRouter");

router.use("/ping", pingRouter);
router.use("/post",postRouter)

module.exports = router;