import axios from "axios";
import ApiError from "../utils/ApiError.js";
import getCoords from "../utils/geoCode.js";
import NodeCache from "node-cache";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: process.env.OWM_KEY,
    units: "metric",
  },
});


const weatherCache = new NodeCache({ stdTTL: 60 * 60 });
// function for the creating unique cache key

function makeCacheKey(type, city) {
  return `${type}:${city.toLowerCase()}`;
}

const currentWeather = async (city) => {
  const key = makeCacheKey("current", city);
  if (weatherCache.has(key)) return weatherCache.get(key)
  
  const { lat, lon } = await getCoords(city);
  const { data } = await api.get(`/weather?lat=${lat}&lon=${lon}`);

  if (!data) {
    throw new ApiError(404, "Weather data not found for the given city");
  }

  weatherCache.set(key, data);

  return data;
};

export { currentWeather };
