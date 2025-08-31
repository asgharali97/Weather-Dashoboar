import express from 'express'
import { getCurrentWeather, getWeeklyForecast, getHourlyForecast, getHistoryWeather, getAirQuality } from '../controllers/weatherController.js'
import {externalApiLimiter} from '../middleware/rateLimiter.Middleware.js'
const router = express.Router();

router.route('/').post(externalApiLimiter,getCurrentWeather)
router.route('/weekly-forecast').post(externalApiLimiter,getWeeklyForecast);
router.route('/hourly-forecast').post(externalApiLimiter,getHourlyForecast);
router.route('/history').post(externalApiLimiter,getHistoryWeather);
router.route('/air-quality').post(externalApiLimiter,getAirQuality);

export default router