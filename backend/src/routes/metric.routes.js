import express from "express";
import { getMetric } from "../controllers/metric.Controller.js";

const router = express.Router();

router.get("/", getMetric);

export default router;
