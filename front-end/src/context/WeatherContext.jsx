import { useState, useContext, createContext } from "react";

const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(
    () => localStorage.getItem("city") || "Karachi"
  );

  const [currentWeather, setCurrentWeather] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [historyWeather, setHistoryWeather] = useState([]);
  return (
    <WeatherContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        currentWeather,
        setCurrentWeather,
        weeklyForecast,
        setWeeklyForecast,
        hourlyForecast,
        setHourlyForecast,
        historyWeather,
        setHistoryWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useWeatherContext = () => useContext(WeatherContext);

export { WeatherContextProvider, useWeatherContext };
