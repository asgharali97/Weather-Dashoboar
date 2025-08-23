import axios from "axios";
import ApiError from "./ApiError.js";
import  getCoords  from "./geoCode.js";

const omApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1/",
});

const Forecast = async (city) => {
  try {
    const { lat, lon } = await getCoords(city);
     console.log(lat,lon)
    const response = await omApi.get("/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        daily:
          "current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&forecast_days=7",
        timezone: "auto",
      },
    });
    return response.data;
  } catch (error) {
    throw new ApiError("Failed to fetch weekly forecast", error);
  }
};



export { Forecast };
