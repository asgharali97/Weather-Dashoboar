import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const currentWeather = async (city) => {
  const res = await api.post("/api/", { city });
  return res.data.data;
};

const weeklyForecast = async (city) => {
  const res = await api.post("/api/weekly-forecast", { city });
  return res.data.data;
};

const hourlyForecast = async (city) => {
  const res = await api.post("/api/hourly-forecast", { city });
  return res.data.data;
};

const historyWeather = async (city) => {
  const res = await api.post("/api/history", { city });
  return res.data.data;
};

const airQuality = async (city) => {
  const res = await api.post("/api/air-quality", { city });
  return res.data.data;
};

export {
  api,
  currentWeather,
  weeklyForecast,
  hourlyForecast,
  historyWeather,
  airQuality,
};
