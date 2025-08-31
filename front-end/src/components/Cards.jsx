import { useEffect, useState, useMemo } from "react";
import ProgressBar from "./ProgressBar";
import Sun from "../assets/Sun.jsx";
import precipitation from "../assets/precipitation.svg";
import RainyCloud from "../assets/RainyCloud.jsx";
import Wind from "../assets/wind.jsx";
import temp from "../assets/temp.svg";
import speed from "../assets/speed.svg";
import airQuality from "../assets/airQuality.svg";
import Compass from "../assets/compass.jsx";
import { useWeatherContext } from "../context/WeatherContext.jsx";
import useCurrentWeather from "../hooks/useCurrentWeather.jsx";
import { useAirQuality } from "../hooks/reactQueryHooks.jsx";
const Cards = () => {
  const { selectedCity } = useWeatherContext();
  const { data, isLoading, isError } = useCurrentWeather(selectedCity);
  const {
    data: aqiData,
    isLoading: aqiLoading,
    isError: aqiError,
  } = useAirQuality(selectedCity);
  const cards = useMemo(() => {
    if (isLoading || !data || aqiLoading || !aqiData) {
      return [
        {
          Title: "Wind deg",
          svg: <Wind color="#6366F1" />,
          value: "",
          subDetail: "",
        },
        {
          Title: "Temp min/max",
          svg: temp,
          value: "",
          subDetail: "",
        },
        {
          Title: "Pressure",
          svg: speed,
          value: "",
          subDetail: "",
        },
        {
          Title: "Air quality",
          svg: airQuality,
          value: "",
          subDetail: "",
        },
      ];
    }
    return [
      {
        Title: "Wind deg",
        svg: <Wind color="#6366F1" />,
        value: `${data?.wind.deg}°`,
        subDetail: <Compass direction={data?.wind.deg} />,
      },
      {
        Title: "Temp min/max",
        svg: temp,
        value: `${Math.floor(data?.main.temp_min)}°  ${Math.floor(
          data?.main.temp_max
        )}°`,
        subDetail: "Normal",
      },
      {
        Title: "Pressure",
        svg: speed,
        value: `${data?.main.pressure} hPa`,
        subDetail: (
          <ProgressBar
            progress={data?.main.pressure}
            max={1100}
            getAlertText={(value) => `${Math.round((value / 1100) * 100)}%`}
          />
        ),
      },
      {
        Title: "Air quality",
        svg: airQuality,
        value: Math.floor(aqiData?.avgAQI),
        subDetail: aqiData?.summary,
      },
    ];
  }, [data, isLoading]);

  return (
    <div className="con w-full flex gap-8 flex-wrap justify-center">
      {cards.map((item, index) => (
        <div
          className="w-[22rem] py-4 px-6 my-2 mx-2 bg-white rounded-md shadow-lg"
          key={index}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-md md:text-lg font-medium">{item.Title}</h4>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E5E5F2] flex items-center justify-center">
              {typeof item.svg === "string" ? (
                <img
                  src={item.svg}
                  alt={`${item.Title} icon`}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              ) : (
                item.svg
              )}
            </div>
          </div>
          {isLoading ? (
            <div className="flex flex-col justify-center gap-4">
              <div className="animate-pulse flex justify-center">
                <div className="h-8 w-16 bg-gray-300 rounded-sm"></div>
              </div>
              <div className="animate-pulse flex justify-center">
                <div className="h-4 w-22 bg-gray-300 rounded-sm"></div>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="text-2xl md:text-3xl font-semibold text-center my-4">
                {item.value}
              </h4>

              <div className="flex justify-center items-center">
                {typeof item.subDetail === "string" ? (
                  <span className="text-md md:text-lg text-center">
                    {item.subDetail}
                  </span>
                ) : (
                  item.subDetail
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cards;
