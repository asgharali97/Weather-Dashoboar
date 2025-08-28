import { useEffect, useState } from "react";
import loaction from "../assets/location.svg";
import { Forward } from "lucide-react";
import Button from "./Button";
import ShareModal from "./ShareModal";
import { currentWeather } from "../api/weatherApi.js";
import { useWeatherContext } from "../context/WeatherContext.jsx";
const Navbar = () => {
  const { setCurrentWeather, selectedCity, setSelectedCity } = useWeatherContext();
  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("city", selectedCity);
  }, [selectedCity]);

  const handleBtn = () => {
    setShowModal(!showModal);
  };

  const handleKey = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setSelectedCity (selectedCity);
      setIsEditable(false);
      const data = await currentWeather(selectedCity);
      console.log(data.data);
      setCurrentWeather(data.data.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await currentWeather(selectedCity);
      console.log(data);
      if (data.data) {
        setCurrentWeather(data.data.data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full py-3 px-6 shadow-sm ">
        <div className="relative flex items-center justify-between">
          <div className="text-2xl font-bold w-0">
            <svg className="w-20 h-12">
              <defs>
                <linearGradient id="SvgjsLinearGradient1130">
                  <stop
                    id="SvgjsStop1131"
                    stopColor="#2d388a"
                    offset="0"
                  ></stop>
                  <stop
                    id="SvgjsStop1132"
                    stopColor="#00aeef"
                    offset="1"
                  ></stop>
                </linearGradient>
              </defs>
              <g
                id="SvgjsG1126"
                transform="matrix(0.8231506675314602,0,0,0.8231506675314602,-3.112554554465162,-12.729530341793456)"
                fill="url(#SvgjsLinearGradient1130)"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M84.339,42.163c-2.081-0.54-4.184-0.642-6.27-0.357c-2.042-8.993-9.974-15.408-19.321-15.408  c-7.359,0-14.151,4.15-17.56,10.634c-0.354-0.029-0.709-0.047-1.061-0.047c-6.815,0-12.404,5.301-12.893,11.993  c-3.359,0.849-7.259,0.228-11.046-0.394C13.778,48.19,11.288,47.781,9,47.781c-1.588,0-2.723,0.433-3.819,0.85l-0.597,0.224  c-0.633,0.23-0.959,0.929-0.729,1.562c0.23,0.632,0.927,0.96,1.562,0.729c0.216-0.079,0.425-0.158,0.632-0.237  C7.061,50.522,7.86,50.219,9,50.219c2.09,0,4.374,0.374,6.793,0.771c2.589,0.425,5.229,0.858,7.804,0.858  c1.252,0,2.485-0.111,3.691-0.367c0.139,1.153,0.428,2.26,0.851,3.3H11c-0.673,0-1.219,0.546-1.219,1.219s0.546,1.219,1.219,1.219  h18.444c0.654,0.955,1.435,1.815,2.314,2.563H16c-0.673,0-1.219,0.546-1.219,1.219s0.546,1.219,1.219,1.219h20  c0.023,0,0.041-0.012,0.064-0.013c1.28,0.425,2.643,0.663,4.063,0.663c0.673,0,1.219-0.546,1.219-1.219s-0.546-1.219-1.219-1.219  c-5.792,0-10.504-4.712-10.504-10.504c0-5.793,4.712-10.505,10.504-10.505c0.523,0,1.054,0.039,1.576,0.118c0,0,0,0,0.001,0  c2.813,0.423,5.371,2.008,7.019,4.347c0.237,0.337,0.614,0.518,0.997,0.518c0.242,0,0.487-0.072,0.7-0.223  c0.551-0.388,0.683-1.147,0.295-1.697c-1.704-2.42-4.2-4.184-7.01-4.995c3.096-5.304,8.844-8.654,15.043-8.654  c8.556,0,15.775,6.117,17.166,14.547c0.158,0.956,0.237,1.916,0.237,2.855c0,0.673,0.546,1.219,1.219,1.219s1.219-0.546,1.219-1.219  c0-0.678-0.037-1.365-0.109-2.054c1.745-0.228,3.503-0.115,5.246,0.337c5.124,1.333,9.101,5.739,9.895,10.964  c0.61,4.024-0.493,7.916-3.108,10.958c-2.579,3-6.325,4.721-10.277,4.721c-0.035,0-0.071,0.002-0.106,0.005  c-1.067,0.094-2.124,0.247-3.03,0.383c-8.156,1.227-16.525,0.313-24.62-0.57C50.271,70.74,48.066,70.5,45.86,70.3  c-0.037-0.004-0.073-0.006-0.11-0.006c-1.446,0-2.936-0.058-4.513-0.12c-4.979-0.195-10.131-0.397-14.873,1.183  c-0.638,0.213-0.982,0.903-0.771,1.542c0.214,0.638,0.904,0.98,1.542,0.771c4.318-1.44,9.244-1.248,14.006-1.061  c1.582,0.063,3.077,0.121,4.553,0.123c2.173,0.198,4.346,0.436,6.519,0.672c5.352,0.584,10.818,1.181,16.312,1.181  c2.976,0,5.96-0.175,8.935-0.622c0.855-0.129,1.849-0.272,2.83-0.361c4.644-0.016,9.04-2.043,12.07-5.568  c3.041-3.537,4.378-8.243,3.669-12.912C95.091,48.944,90.393,43.738,84.339,42.163z"
                ></path>
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M40.888,67.213c2.285,0.211,4.557,0.468,6.754,0.716c5.188,0.586,10.204,1.151,15.319,1.151  c3.35,0,6.743-0.242,10.257-0.882c0.662-0.12,1.102-0.754,0.98-1.416c-0.12-0.663-0.759-1.105-1.416-0.98  c-8.528,1.549-16.466,0.654-24.867-0.295c-2.209-0.249-4.494-0.507-6.803-0.72c-6.186-0.572-13.303-1.009-19.498,1.057  c-0.638,0.213-0.982,0.903-0.771,1.542c0.214,0.638,0.903,0.981,1.542,0.771C28.132,66.239,34.95,66.666,40.888,67.213z"
                ></path>
              </g>
            </svg>
          </div>
          <div className="absolute md:left-1/2 md:right-auto right-[-3rem] transform -translate-x-1/2">
            {isEditable ? (
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Your City Name"
                  className="py-1 pl-[3rem] pr-4 rounded-lg border border-[#828282] outline-none w-[10rem] sm:w-[15rem] md:w-[20rem] focus:border-[#6B7280]"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity (e.target.value)}
                  onBlur={() => setIsEditable(false)}
                  onKeyDown={(e) => handleKey(e)}
                  autoFocus
                />

                <img
                  src={loaction}
                  alt="location"
                  className="cursor-pointer absolute left-3 top-[0.4rem] transform -translate-0"
                />
              </div>
            ) : (
              <div
                onClick={() => setIsEditable(true)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <img
                  src={loaction}
                  alt="location"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <h4 className="text-md md:text-lg font-bold cursor-pointer">
                  {selectedCity ? selectedCity : "Karachi"}
                </h4>
              </div>
            )}
          </div>
          <div className="relative md:block hidden">
            <Button
              content="share"
              Icon={Forward}
              tooltip="share weather"
              onClick={handleBtn}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-[#3741514f]"></div>
      {showModal && (
        <ShareModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default Navbar;
