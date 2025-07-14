import Sun from '../assets/Sun.jsx'
import cloud from '../assets/cloud.svg'
import RainyCloud from '../assets/RainyCloud.jsx'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';

const Forecast = () => {
  const [forecast,setForecast] =useState(false)
  const dayForecast = [
    {
      day: "Today",
      temp: 33,
      weather: "Cloudy",
      icon: cloud
    },
    {
      day: "Mon",
      temp: 32,
      weather: "Cloudy",
      icon: cloud
    },
    {
      day: "Tue",
      temp: 34,
      weather: "Hot",
      icon: <Sun color='#1E293B'/>
    },
    {
      day: "Wed",
      temp: 36,
      weather: "Hot",
      icon: <Sun color="#1E293B"/>
    },
    {
      day: "Thu",
      temp: 31,
      weather: "Rainy",
      icon: <RainyCloud color="#1E293B"/>
    },
    {
      day: "Fri",
      temp: 28,
      weather: "Rainy",
      icon: <RainyCloud color="#1E293B"/>
    },
    {
      day: "Sat",
      temp: 29,
      weather: "Cloudy",
      icon: cloud
    },
  ]
  
  const hourForecast = [
    {
      day: "Now",
      temp: 33,
      weather: "Cloudy",
      icon: cloud
    },
    {
      day: "1:00 PM",
      temp: 34,
      weather: "Noraml",
      icon: <Sun color='#1E293B'/>
    },
    {
      day: "2:00 PM",
      temp: 34,
      weather: "Normal",
      icon: <Sun color='#1E293B'/>
    },
    {
      day: "3:00 PM",
      temp: 33,
      weather: "Normal",
      icon: cloud
    },
    {
      day: "4:00 PM",
      temp: 32,
      weather: "Normal",
      icon: cloud
    },
    {
      day: "5:00 PM",
      temp: 31,
      weather: "Cloudy",
      icon: cloud
    },
    {
      day: "6:00 PM",
      temp: 30,
      weather: "Cloudy",
      icon: cloud
    },
  ]

  return (
    <>
      <div className="w-full py-12 px-8 mt-8">
         <div className="w-full bg-white rounded-md shadow-md p-8 ">
            <div className="flex flex-col sm:flex-row justify-between">
              <h4 className="text-xl font-bold sm:font-medium text-center sm:text-start mb-4">{forecast ? "7 Hourly forecast" : "7 day forecast"}</h4>
              <button className="py-2 px-4 rounded-full bg-[#6366F1] text-white cursor-pointer hover:bg-[#4F46E5] hover:shadow-md" onClick={() => setForecast(!forecast)}>{forecast ? "day forecast" : "Hourly forecast"}</button>
            </div>
            <Swiper spaceBetween={16} slidesPerView={'auto'} className='mt-8' style={{padding:"1rem 0"}}>
              {
              forecast ? hourForecast.map((item, index) => (
                <SwiperSlide key={index} style={{ width: 'auto' }}>
                  <div className="w-36 bg-[#E5E5F2] text-[#1E293B] rounded-md py-4 px-2 flex flex-col justify-center items-center gap-2 shadow-md cursor-pointer hover:scale-105 transition-all">
                    <span className="text-sm md:text-md text-center">{item.day}</span>
                    <h4 className="text-xl sm:text-2xl md:text-3xl text-center font-medium">{item.temp}°</h4>
                    <span className="text-lg md:text-xl text-center font-light">{item.weather}</span>
                    {typeof item.icon === 'string' ? <img src={item.icon} alt={`${item.weather} icon`} className='w-9 h-9'/> : item.icon}
                  </div>
                </SwiperSlide>
              )) : dayForecast.map((item, index) => (
                <SwiperSlide key={index} style={{ width: 'auto' }}>
                  <div className="w-36 bg-[#E5E5F2] text-[#1E293B] rounded-md py-4 px-2 flex flex-col justify-center items-center gap-2 shadow-md cursor-pointer hover:scale-105 transition-all">
                    <span className="text-sm md:text-md text-center">{item.day}</span>
                    <h4 className="text-xl sm:text-2xl md:text-3xl text-center font-medium">{item.temp}°</h4>
                    <span className="text-lg md:text-xl text-center font-light">{item.weather}</span>
                    {typeof item.icon === 'string' ? <img src={item.icon} alt={`${item.weather} icon`} className='w-9 h-9'/> : item.icon}
                  </div>
                </SwiperSlide>
              ))
            }
            </Swiper>
         </div>
      </div>
    </>
  )
}

export default Forecast

