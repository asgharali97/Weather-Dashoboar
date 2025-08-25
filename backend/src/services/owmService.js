import axios from "axios";
import ApiError from "../utils/ApiError.js";
import getCoords from "../utils/geoCode.js";
import NodeCache from "node-cache";
import { metrics } from "../utils/metrics.js";
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
  metrics.totalRequests++;
  const key = makeCacheKey("current", city);
  if (weatherCache.has(key)){
    metrics.cacheHits++;
    return weatherCache.get(key);
    }

  metrics.cacheMisses++;
  
  const { lat, lon } = await getCoords(city);
  const { data } = await api.get(`/weather?lat=${lat}&lon=${lon}`);
  metrics.externalApiCalls++;
  if (!data) {
    throw new ApiError(404, "Weather data not found for the given city");
  }

  weatherCache.set(key, data);

  return data;
};

export { currentWeather };
