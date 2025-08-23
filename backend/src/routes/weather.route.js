import express from 'express'
import { getCurrentWeather, getWeeklyForecast } from '../controllers/weatherController.js'

const router = express.Router();

router.route('/').post(getCurrentWeather)
router.route('/weekly-forecast').post(getWeeklyForecast);

export default router