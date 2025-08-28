import { useQuery } from "@tanstack/react-query";
import { currentWeather } from "../api/weatherApi";

function useCurrentWeather(city) {
  return useQuery(
    { queryKey: ["currentWeather", city], queryFn: () => currentWeather(city) }
  );
}

export default useCurrentWeather;

