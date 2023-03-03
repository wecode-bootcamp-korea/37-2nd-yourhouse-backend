import express from "express";
import { PingController } from "../controllers/PingController";

const pingRouter = express.Router();
const pingController = new PingController();

pingRouter.get("/", pingController.pingTest.bind(pingController));

export { pingRouter };
