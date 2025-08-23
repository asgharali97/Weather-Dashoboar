import asyncHandler from "../utils/asynHanlder.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { currentWeather } from "../services/owmService.js";
import { weeklyForecast } from "../services/omService.js";
import { Forecast } from "../utils/omApi.js";

const getCurrentWeather = asyncHandler(async (req, res) => {
  const { city } = req.body;
  if (!city) throw new ApiError(400, "City name is required");

  const getWeather = await currentWeather(city);
  if (!getWeather) {
    throw new ApiError(404, "Weather data not found for the given city");
  }

  res.status(200)
    .json(
      new ApiResponse(200, "Weather fetched successfully", getWeather)
    );
});

const getWeeklyForecast = asyncHandler(async (req, res) => {
  const { city } = req.body;
  console.log(city);
  if (!city) {
    throw new ApiError(400, "City is required");
  }

  const getForecast = await weeklyForecast(city);
  if (!getForecast) {
    throw new ApiError(404, "Forecast not found for the given city");
  }
  const data = await getForecast;


  res
    .status(200)
     .json(
      new ApiResponse(200, "Weather fetched successfully", data)
    );
});

export { getCurrentWeather, getWeeklyForecast };
