import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

const currentWeather = async (city) => {
  const res = await api.post("/", { city });
  return res.data.data;
};

const weeklyForecast = async (city) => {
  const res = await api.post("/weekly-forecast", { city });
  return res.data.data;
};

const hourlyForecast = async (city) => {
  const res = await api.post("/hourly-forecast", { city });
  return res.data.data;
};

const historyWeather = async (city) => {
  const res = await api.post("/history", { city });
  return res.data.data;
};

const airQuality = async (city) => {
  const res = await api.post("/air-quality", { city });
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
