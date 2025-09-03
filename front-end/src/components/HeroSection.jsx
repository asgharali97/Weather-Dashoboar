import { useEffect, useState } from "react";
import { useWeatherContext } from "../context/WeatherContext.jsx";
import Cards from "./Cards";
import Wind from '../assets/wind.jsx'
import humadity from '../assets/humadity.svg'
import useCurrentWeather  from "../hooks/useCurrentWeather.jsx";
const TemperatureSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-24 w-48 sm:h-28 sm:w-56 md:h-32 md:w-64 lg:h-36 lg:w-64 bg-gray-300 rounded-lg"></div>
  </div>
);

const MetricsSkeleton = () => (
  <div className="absolute top-2 left-[65%] sm:top-4 sm:left-[61%] md:top-5 md:left-[62%] lg:top-8 lg:left-[60%] space-y-4">
    <div className="animate-pulse flex items-center gap-3">
      <div className="ml-4 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gray-300 rounded"></div>
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
    </div>
    <div className="animate-pulse flex items-center gap-3">
      <div className="ml-4 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gray-300 rounded"></div>
      <div className="h-4 w-12 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const DescriptionSkeleton = () => (
  <div className="animate-pulse flex justify-center items-center flex-col mt-8 space-y-2">
    <div className="h-5 w-48 bg-gray-300 rounded"></div>
    <div className="h-4 w-64 bg-gray-300 rounded"></div>
  </div>
);

const HeroSection = () => {
  const { selectedCity } = useWeatherContext();
  const { data, isLoading, isError } = useCurrentWeather(selectedCity);
  if(!selectedCity){
     console.log('no city selected');
     throw new Error('No city selected');
  }
  if (isError) return <div>Error loading weather</div>;

  const current = data
  return (
    <>
      <div className="w-full">
        <div className="py-14 my-4">                       
          <div className="relative flex justify-center items-center gap-4">
            {isLoading ? (
              <TemperatureSkeleton />
            ) : (
              <h1 className="text-8xl lg:text-9xl font-medium text-center mr-4 xs:mr-0">
                {Math.floor(current?.main.temp)}°
              </h1>
            )}
            
            {isLoading ? (
              <MetricsSkeleton />
            ) : (
              <>
                <div className="absolute top-3 left-[75%] sm:left-[70%] md:top-3 md:left-[72%] lg:top-4 lg:left-[62%] flex items-center gap-4 w-28 lg:w-32">
                  <Wind/>
                  <span className="text-md md:text-lg font-medium text-[#1E293B]">
                    {current?.wind.speed} km/h
                  </span>
                </div>
                <div className="absolute top-12 left-[75%] sm:left-[70%] md:top-14 md:left-[72%] lg:top-17 lg:left-[62%] flex items-center gap-4">
                  <img src={humadity} alt="humidity" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"/>
                  <span className="text-md md:text-lg font-medium text-[#1E293B]">
                    {current?.main.humidity}%
                  </span>
                </div>
              </>
            )}
          </div>
          
          {isLoading ? (
            <DescriptionSkeleton />
          ) : (
            <div className="flex justify-center items-center flex-col mt-8">
              <h4 className="text-xl font-medium">
                Feels Like {Math.floor(current?.main.feels_like)}° | {current?.weather[0].main}
              </h4>
              <h4 className="text-lg font-medium my-1 text-center">
                {current?.weather[0].description}
              </h4>
            </div>
          )}
        </div>
      </div>
      <div className="py-8 mt-14">
        <Cards/>
      </div>
    </>
  );
};

export default HeroSection;