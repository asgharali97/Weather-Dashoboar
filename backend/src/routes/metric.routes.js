import express from "express";
import { metrics } from "../utils/metrics.js";

const router = express.Router();

router.get("/", (req, res) => {
  const savedCalls = Math.max(0, metrics.totalRequests - metrics.externalApiCalls);
  const cacheHitRatio = metrics.totalRequests ? Math.round((metrics.cacheHits / metrics.totalRequests) * 100) : 0;
  console.log('savedCalls:', savedCalls);
  console.log('cacheHitRatio:', cacheHitRatio);
  res.json({
    totalRequests: metrics.totalRequests,
    externalApiCalls: metrics.externalApiCalls,
    cacheHits: metrics.cacheHits,
    cacheMisses: metrics.cacheMisses,
    savedCalls,
    cacheHitRatio: `${cacheHitRatio}%`
  });
});

export default router;
