import ProgressBar from "./ProgressBar";
import Sun from "../assets/Sun.jsx";
import precipitation from "../assets/precipitation.svg";
import RainyCloud from "../assets/RainyCloud.jsx";
import Wind from "../assets/wind.jsx";
import temp from "../assets/temp.svg";
import speed from "../assets/speed.svg";
import airQuality from "../assets/airQuality.svg";
import compass from "../assets/compass.svg";
const Cards = () => {

  const cards = [
    {
      Title: "UV index",
      svg: <Sun color="#6366F1"/>,
      value: "6.3",
      subDetail: <ProgressBar progress={6.3} max={11} getAlertText={(value) => {
    if (value < 3) return "Low";
    if (value < 6) return "Moderate";
    if (value < 8) return "High";
    if (value < 11) return "Very High";
    return "Extreme";
    }}
    />,
    },
    {
      Title: "precipitation",
      svg: precipitation,
      value: "2.5 cm",
      subDetail: "Moderate",
    },
    {
      Title: "Chance of rain",
      svg: <RainyCloud color="#6366F1"/>,
      value: "50%",
      subDetail: "Heavy",
    },
    {
      Title: "Wind deg",
      svg: <Wind color="#6366F1"/>,
      value: "180°",
      subDetail: '',
      icon: compass
    },
    {
      Title: "Temp min/max",
      svg: temp,
      value: "34° 36°",
      subDetail: "Normal",
    },
    {
      Title: "Pressure",
      svg: speed,
      value: "647hpa",
      subDetail: <ProgressBar progress={647} max={1100} getAlertText={(value) => `${Math.round((value / 1100) * 100)}%`}
      />,
    },
    {
      Title: "Air quality",
      svg: airQuality,
      value: "58",
      subDetail: "Moderate",
    },
  ];

  return (
    <>
      <div className="w-full flex gap-8 flex-wrap justify-center">
        {cards.map((item, index) => (
          <div className="w-[22rem] py-4 px-6 my-2 mx-2 bg-white rounded-md shadow-lg" key={index}>
            <div className="flex justify-between items-center">
              <h4 className="text-md md:text-lg font-medium">{item.Title}</h4>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E5E5F2] flex items-center justify-center">
                {
                  typeof item.svg === "string" ? (
                    <img
                      src={item.svg}
                      alt={`${item.Title} icon`}
                      className="w-6 h-6 md:w-8 md:h-8"
                    />
                  ) : (
                    item.svg
                  )
                }
              </div>
            </div>
            <h4 className="text-2xl md:text-3xl font-semibold text-center">
              {item.value}
            </h4>
            {typeof item.subDetail === "string" ? (
              <div className="flex justify-center items-center mt-6">
                <span className="text-md md:text-lg text-center">
                  {item.subDetail}
                </span>
              </div>
            ) : (
              item.subDetail
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
