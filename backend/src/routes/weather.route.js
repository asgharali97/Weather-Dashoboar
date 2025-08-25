import express from 'express'
import { getCurrentWeather, getWeeklyForecast, getHourlyForecast, getHistoryWeather } from '../controllers/weatherController.js'

const router = express.Router();

router.route('/').post(getCurrentWeather)
router.route('/weekly-forecast').post(getWeeklyForecast);
router.route('/hourly-forecast').post(getHourlyForecast);
router.route('/history').post(getHistoryWeather);

export default router