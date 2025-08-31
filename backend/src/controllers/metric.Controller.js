import { metrics } from "../utils/metrics.js";

const getMetric = (req, res) => {
  const savedCalls = metrics.cacheHits; 
  const cacheHitRatio = metrics.totalRequests ? Math.round((metrics.cacheHits / metrics.totalRequests) * 100) : 0;

  res.json({
    totalRequests: metrics.totalRequests,
    externalApiCalls: metrics.externalApiCalls,
    cacheHits: metrics.cacheHits,
    cacheMisses: metrics.cacheMisses,
    savedCalls,
    cacheHitRatio: `${cacheHitRatio}%`,
    remainingApiCalls: Math.max(0, 31 - metrics.externalApiCalls),
    dailyLimit: 31
  });
};

export { getMetric };