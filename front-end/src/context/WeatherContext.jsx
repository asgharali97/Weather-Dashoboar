import { useState, useContext, createContext } from "react";

const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(
    () => localStorage.getItem("city") || "Karachi"
  );

  return (
    <WeatherContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useWeatherContext = () => useContext(WeatherContext);

export { WeatherContextProvider, useWeatherContext };
