import ApiError from "../utils/ApiError.js";
import getCoords from "../utils/geoCode.js";
import NodeCache from "node-cache";

const forecastCache = new NodeCache({ stdTTL: 60 * 60 });
// function for the creating unique cache key

function makeCacheKey(type, city) {
  return `${type}:${city.toLowerCase()}`;
}

const WEATHER_CODE_MAP = {
  0: { summary: "Clear sky", icon: "clear-day" },
  1: { summary: "Mainly clear", icon: "partly-cloudy" },
  2: { summary: "Partly cloudy", icon: "partly-cloudy" },
  3: { summary: "Overcast", icon: "cloudy" },
  45: { summary: "Fog", icon: "fog" },
  51: { summary: "Drizzle: Light intensity", icon: "drizzle" },
  53: { summary: "Drizzle: Moderate intensity", icon: "drizzle" },
  55: { summary: "Drizzle: Dense intensity", icon: "drizzle" },
  56: { summary: "Freezing Drizzle: Light intensity", icon: "freezing-drizzle" },
  57: { summary: "Freezing Drizzle: Dense intensity", icon: "freezing-drizzle" },
  61: { summary: "Rain: Slight intensity", icon: "rain" },
  63: { summary: "Rain: Moderate intensity", icon: "rain" },
  65: { summary: "Rain: Heavy intensity", icon: "rain" },
  66: { summary: "Freezing Rain: Light intensity", icon: "freezing-rain" },
  67: { summary: "Freezing Rain: Heavy intensity", icon: "freezing-rain" },
  71: { summary: "Snow fall: Slight intensity", icon: "snow" },
  73: { summary: "Snow fall: Moderate intensity", icon: "snow" },
  75: { summary: "Snow fall: Heavy intensity", icon: "snow" },
  77: { summary: "Snow grains", icon: "snow-grains" },
  80: { summary: "Rain showers: Slight intensity", icon: "rain-showers" },
  81: { summary: "Rain showers: Moderate intensity", icon: "rain-showers" },
  82: { summary: "Rain showers: Violent intensity", icon: "rain-showers" },
  85: { summary: "Snow showers: Slight intensity", icon: "snow-showers" },
  86: { summary: "Snow showers: Heavy intensity", icon: "snow-showers" },
  95: { summary: "Thunderstorm: Slight or moderate", icon: "thunderstorm" },
  96: { summary: "Thunderstorm: with slight hail", icon: "thunderstorm-hail" },
  99: { summary: "Thunderstorm: with heavy hail", icon: "thunderstorm-hail" },
};


function getMode(arr) {
  const counts = {};
  let maxCount = -1;
  let mode = null;
  for (const v of arr) {
    counts[v] = (counts[v] || 0) + 1;
    if (counts[v] > maxCount) {
      maxCount = counts[v];
      mode = Number(v);
    }
  }
  return mode;
}

function transformForecast(data) {
  if (!data?.hourly) {
    throw new ApiError(500, "Invalid forecast data structure");
  }
  
  const { hourly } = data;
  if (!hourly.time || !hourly.temperature_2m || 
      !hourly.wind_speed_10m || !hourly.relative_humidity_2m || !hourly.weathercode) {
    throw new ApiError(500, "Missing required forecast data");
  }

  const dailyData = {};
  
  hourly.time.forEach((time, i) => {
    const date = time.split('T')[0]; 
    
    if (!dailyData[date]) {
      dailyData[date] = {
        temps: [],
        winds: [],
        humidity: [],
        weatherCodes: []
      };
    }
    
    dailyData[date].temps.push(hourly.temperature_2m[i]);
    dailyData[date].winds.push(hourly.wind_speed_10m[i]);
    dailyData[date].humidity.push(hourly.relative_humidity_2m[i]);
    dailyData[date].weatherCodes.push(hourly.weathercode[i]);
  });
  const transformedData = Object.entries(dailyData).map(([date, values]) => {
 
    const repCode = getMode(values.weatherCodes);
    const meta = (typeof WEATHER_CODE_MAP !== 'undefined' && WEATHER_CODE_MAP[repCode]) 
      ? WEATHER_CODE_MAP[repCode]
      : { summary: "Mixed/Unknown", icon: "na" };

    return {
      date,
      maxTemp: Math.max(...values.temps),
      minTemp: Math.min(...values.temps),
      maxWind: Math.max(...values.winds),
      minWind: Math.min(...values.winds),
      maxHumidity: Math.max(...values.humidity),
      minHumidity: Math.min(...values.humidity),
      weatherCode: repCode,
      weatherSummary: meta.summary,
      weatherIcon: meta.icon
    };
  });

  return transformedData;
}



const weeklyForecast = async (city) => {
  const key = makeCacheKey("weekly", city);
  if (forecastCache.has(key)) return forecastCache.get(key)

  const { lat, lon } = await getCoords(city);

 
  const res  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode&forecast_days=7&timezone=auto`);

  if (!res) {
    throw new ApiError(404, "forecast not get for the given city");
  }
  const data = await res.json();
  const transformedData = transformForecast(data);
  forecastCache.set(key, transformedData);
  return transformedData
};

export { weeklyForecast };
