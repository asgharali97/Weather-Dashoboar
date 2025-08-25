import NodeCache from "node-cache";
import axios from "axios";
import ApiError from "./ApiError.js";
import {  metrics, makeCacheKey } from "./metrics.js";
const geoCache = new NodeCache({ stdTTL: 60 * 60 }); 


async function getCoords(city) {
  metrics.totalRequests++;
  const key = makeCacheKey("geo", city);
  const cached = geoCache.get(key);
  if (cached) {
    metrics.cacheHits++;
    return cached;
  }
  metrics.cacheMisses++;
  const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OWM_KEY}`);
  metrics.externalApiCalls++;
  if (!data.length) throw new ApiError(404,"City not found");
  
  const coords = { lat: data[0].lat, lon: data[0].lon };
  geoCache.set(city, coords);
  
  return coords;
}

export default getCoords;
