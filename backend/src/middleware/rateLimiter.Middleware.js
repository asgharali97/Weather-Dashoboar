import rateLimit from "express-rate-limit";
import { metrics } from "../utils/metrics.js";

const apiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const externalApiLimiter = (req, res, next) => {
  if (metrics.externalApiCalls >= 31) {
    return res.status(429).json({
      success: false,
      message: "Daily external API limit exceeded. Try again tomorrow.",
      metrics: {
        externalApiCalls: metrics.externalApiCalls,
        limit: 31
      }
    });
  }
  next();
};

export { apiLimiter, externalApiLimiter };