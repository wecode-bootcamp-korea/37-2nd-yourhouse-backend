import express from "express";
import { pingRouter } from "./pingRouter";

const router = express.Router();

router.use("/ping", pingRouter);

export { router };
