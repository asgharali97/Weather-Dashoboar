import { useQuery } from "@tanstack/react-query";
import {
  airQuality,
  historyWeather,
  hourlyForecast,
  weeklyForecast,
} from "../api/weatherApi";

const useWeeklyForecast = (city) => {
  return useQuery({
    queryKey: ["weeklyForecast", city],
    queryFn: () => weeklyForecast(city),
  });
};

const useHourlyForecast = (city) => {
  return useQuery({
    queryKey: ["hourlyForecast", city],
    queryFn: () => hourlyForecast(city),
  });
};

const useHistoryWeather = (city) => {
  return useQuery({
    queryKey: ["historyWeather", city],
    queryFn: () => historyWeather(city),
  });
};

const useAirQuality = (city) => {
  return useQuery({
    queryKey: ["airQuality", city],
    queryFn: () => airQuality(city),
  });
};

export {
  useWeeklyForecast,
  useHourlyForecast,
  useHistoryWeather,
  useAirQuality,
};
