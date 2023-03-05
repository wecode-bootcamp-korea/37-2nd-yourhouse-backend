import express from "express";
import { pingRouter } from "./pingRouter";
import { userRouter } from "./userRouter";

const router = express.Router();

router.use("/ping", pingRouter);
router.use("/user", userRouter);

export { router };
