import express from "express";
import * as monitorController from "../controllers/monitor-controller.js";

const router = express.Router();

router.route("/").get(monitorController.healthMonitor).head(monitorController.healthMonitor);

export default router;