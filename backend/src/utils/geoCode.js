import NodeCache from "node-cache";
import axios from "axios";
import ApiError from "./ApiError.js";

const geoCache = new NodeCache({ stdTTL: 60 * 60 }); 

async function getCoords(city) {
  if (geoCache.has(city)) {
    return geoCache.get(city);
  }
  const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OWM_KEY}`);
  if (!data.length) throw new ApiError(404,"City not found");
  
  const coords = { lat: data[0].lat, lon: data[0].lon };
  geoCache.set(city, coords);
  
  return coords;
}

export default getCoords;
