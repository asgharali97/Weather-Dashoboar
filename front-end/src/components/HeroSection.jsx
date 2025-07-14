import Cards from "./Cards";
import Wind from '../assets/wind.jsx'
import humadity from '../assets/humadity.svg'

const HeroSection = () => {
  return (
    <>
      <div className="w-full">
        <div className="py-14 my-4">                       
        <div className="relative flex justify-center items-center gap-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-center">33°</h1>
          <div className="absolute top-2 left-[65%] sm:top-4 sm:left-[61%] md:top-5 md:left-[62%] lg:top-8 lg:left-[60%] flex items-center gap-6">
            <Wind/>
            <span className="text-md md:text-lg font-medium text-[#1E293B]">
              7.2 km/h
              
            </span>
          </div>
          <div className="absolute top-8 left-[65%] sm:top-12 sm:left-[61%] md:top-16 md:left-[62%] lg:top-22 lg:left-[60%] flex items-center gap-6">
            <img src={humadity} alt="wind" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"/>
            <span className="text-md md:text-lg font-medium text-[#1E293B]">
              75%
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-8">
            <h3 className="text-md sm:text-lg md:text-xl font-medium">
                Feels Like 34°  |  Cloudy
            </h3>
            <h4 className="text-sm md:text-lg font-medium my-1 text-center">Light rain showers expected in the afternoon</h4>
        </div>
        </div>
      </div>
      <div className="py-8 mt-14">
        <Cards/>
      </div>
    </>
  );
};

export default HeroSection;
