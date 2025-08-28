import { useState } from "react";
import { useWeatherContext } from "../context/WeatherContext.jsx";
import {
  useWeeklyForecast,
  useHourlyForecast,
} from "../hooks/reactQueryHooks.jsx";
import Sun from "../assets/Sun.jsx";
import fog from "../assets/fog.svg";
import snow from "../assets/snow.svg";
import thunderstorm from "../assets/thunderstorm.svg";
import cloudy from "../assets/cloudy.svg";
import RainyCloud from "../assets/RainyCloud.jsx";
import PartlyCloudy from "../assets/PartlyCloudy.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { use } from "react";
const Forecast = () => {
  const [forecast, setForecast] = useState(false);
  const { selectedCity } = useWeatherContext();
  const {
    data: weeklyData,
    isLoading: weeklyLoading,
    isError: weeklyError,
  } = useWeeklyForecast(selectedCity);
  const {
    data: hourlyData,
    isLoading: hourlyLoading,
    isError: hourlyError,
  } = useHourlyForecast(selectedCity);

  const ForecastSkeleton = () => (
    <div className="flex flex-col items-center gap-4">
      <div className="animate-pulse">
        <div className="h-4 w-8 bg-gray-300 rounded-sm"></div>
      </div>
      <div className="animate-pulse">
        <div className="h-4 w-12 bg-gray-300 rounded-sm"></div>
      </div>
      <div className="animate-pulse">
        <div className="h-6 w-16 bg-gray-300 rounded-sm"></div>
      </div>
      <div className="animate-pulse">
        <div className="h-7 w-18 bg-gray-300 rounded-sm"></div>
      </div>
    </div>
  );

  function iconList(icon) {
    if (icon === "clear-sky") {
      return <Sun color="#1E293B" />;
    }
    if (icon === "partly-cloudy") {
      return PartlyCloudy;
    }
    if (icon === "cloudy") {
      return cloudy;
    }
    if (icon === "fog") {
      return fog;
    }
    if (
      icon === "drizzle" ||
      icon === "freezing-drizzle" ||
      icon === "rain" ||
      icon === "rain-showers"
    ) {
      return <RainyCloud color="#1E293B" />;
    }
    if (icon === "snow" || icon === "snow-grains" || icon === "snow-showers") {
      return snow;
    }
    if (icon === "thunderstorm-hail" || icon === "thunderstorm") {
      return thunderstorm;
    }
  }

  return (
    <>
      <div className="w-full py-12 mt-8">
        <div className="w-full bg-white rounded-md shadow-md p-8 ">
          <div className="flex flex-col sm:flex-row justify-between">
            <h4 className="text-xl font-bold sm:font-medium text-center sm:text-start mb-4">
              {forecast ? "7 Hourly forecast" : "7 day forecast"}
            </h4>
            <button
              className="py-2 px-4 rounded-full bg-[#6366F1] text-white text-md font-medium cursor-pointer hover:bg-[#4F46E5] hover:shadow-md"
              onClick={() => setForecast(!forecast)}
            >
              {forecast ? "day forecast" : "Hourly forecast"}
            </button>
          </div>
          <Swiper
            spaceBetween={16}
            slidesPerView={"auto"}
            className="mt-8 "
            style={{ padding: "1rem 0 1rem 1rem" }}
          >
            {weeklyLoading && hourlyLoading
              ? Array.from({ length: 7 }).map((_, index) => (
                  <SwiperSlide key={index} style={{ width: "auto" }}>
                    <div className="w-36 bg-[#E5E5F2] text-[#1E293B] rounded-md py-4 px-2 flex flex-col justify-center items-center gap-2 shadow-md cursor-pointer hover:scale-105 transition-all">
                      <ForecastSkeleton />
                    </div>
                  </SwiperSlide>
                ))
              : forecast
              ? hourlyData.map((item, index) => {
                  const icon = iconList(item.weatherIcon);
                  return (
                    <SwiperSlide key={index} style={{ width: "auto" }}>
                      <div className="w-36 bg-[#E5E5F2] text-[#1E293B] rounded-md py-4 px-2 flex flex-col justify-center items-center gap-2 shadow-md cursor-pointer hover:scale-105 transition-all">
                        <div className="flex justify-center flex-col gap-2">
                          <span className="text-sm md:text-md text-center">
                            {item.time}
                          </span>
                          <h4 className="text-xl sm:text-2xl md:text-3xl text-center font-medium">
                            {Math.floor(item.temp)}°
                          </h4>
                          <span className="text-lg md:text-xl text-center font-light">
                            {item.weatherSummary}
                          </span>
                          <div className="flex justify-center">
                            {typeof icon === "string" ? (
                              <img
                                src={icon}
                                alt={`${item.weather} icon`}
                                className="w-9 h-9"
                              />
                            ) : (
                              icon
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              : weeklyData.map((item, index) => {
                  const icon = iconList(item.weatherIcon);
                  return (
                    <SwiperSlide key={index} style={{ width: "auto" }}>
                      <div className="w-36 bg-[#E5E5F2] text-[#1E293B] rounded-md py-4 px-2 flex flex-col justify-center items-center gap-2 shadow-md cursor-pointer hover:scale-105 transition-all">
                        <span className="text-sm md:text-md text-center">
                          {new Intl.DateTimeFormat("en-US", {
                            weekday: "short",
                          }).format(new Date(item.date))}
                        </span>
                        <h4 className="text-xl sm:text-2xl md:text-3xl text-center font-medium">
                          {Math.floor(item.maxTemp)}°
                        </h4>
                        <span className="text-lg md:text-xl text-center font-light">
                          {item.weatherSummary}
                        </span>
                        {typeof icon === "string" ? (
                          <img
                            src={icon}
                            alt={`${item.weather} icon`}
                            className="w-9 h-9"
                          />
                        ) : (
                          icon
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Forecast;
