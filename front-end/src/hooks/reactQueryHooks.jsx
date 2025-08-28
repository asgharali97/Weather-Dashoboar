import { useQuery } from "@tanstack/react-query";
import {
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

export { useWeeklyForecast, useHourlyForecast, useHistoryWeather };
