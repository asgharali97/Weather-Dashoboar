import { useState } from "react";
import loaction from "../assets/location.svg";
const Navbar = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [cityValue, setCityValue] = useState("Karachi");

  return (
    <>
      <div className="w-full py-3 px-6 shadow-sm">
        <div className="relative flex items-center justify-between md:justify-normal">
          <div className="text-2xl font-bold w-0">Weatherly</div>
          <div className="absolute md:left-1/2 md:right-auto right-[-3rem] transform -translate-x-1/2">
            {isEditable ? (
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Your City Name"
                  className="py-1 pl-[3rem] pr-4 rounded-lg border border-[#828282] outline-none w-[10rem] sm:w-[15rem] md:w-[20rem] focus:border-[#6B7280]"
                  value={cityValue}
                  onChange={(e) => setCityValue(e.target.value)}
                  onBlur={() => setIsEditable(false)}
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
                <img src={loaction} alt="location" />
                <h4 className="text-md md:text-lg font-bold cursor-pointer">
                  {cityValue ? cityValue : "Karachi"}
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-[#3741514f]"></div>
    </>
  );
};

export default Navbar;
