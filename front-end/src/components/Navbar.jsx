import { useState } from "react";
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
              <div>
                <input
                  type="text"
                  placeholder="Enter Your City Name"
                  className="py-1 pl-[3rem] pr-4 rounded-lg border border-[#828282] outline-none w-[10rem] sm:w-[15rem] md:w-[20rem] focus:border-[#6B7280]"
                  value={cityValue} 
                  onChange={(e) => setCityValue(e.target.value)}
                  onBlur={() => setIsEditable(false)}
                  autoFocus
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="cursor-pointer absolute left-3 top-[0.4rem] transform -translate-0"
                >
                  <path
                    d="M14 0C21.7293 0 28 6.27069 28 14C28 21.7293 21.7293 28 14 28C6.27069 28 0 21.7293 0 14C0 6.27069 6.27069 0 14 0ZM14 0.43575C6.50738 0.43575 0.435749 6.50738 0.435749 14C0.435749 21.4931 6.50738 27.5607 14 27.5607C21.4926 27.5607 27.5608 21.4926 27.5608 14C27.5608 6.50738 21.4926 0.43575 14 0.43575ZM14 4.5185C17.6243 4.5185 20.5625 7.45675 20.5625 11.081C20.5625 13.9707 16.3901 20.3179 14.6991 22.7723C14.3176 23.3258 13.6824 23.3258 13.3009 22.7723C11.6099 20.3175 7.4375 13.9711 7.4375 11.081C7.4375 7.45675 10.3757 4.5185 14 4.5185ZM14 7.581C13.0717 7.581 12.1815 7.94975 11.5251 8.60613C10.8687 9.2625 10.5 10.1527 10.5 11.081C10.5 12.0093 10.8687 12.8995 11.5251 13.5559C12.1815 14.2123 13.0717 14.581 14 14.581C14.9283 14.581 15.8185 14.2123 16.4749 13.5559C17.1313 12.8995 17.5 12.0093 17.5 11.081C17.5 10.1527 17.1313 9.2625 16.4749 8.60613C15.8185 7.94975 14.9283 7.581 14 7.581Z"
                    fill="#374151"
                  />
                </svg>
              </div>
            ) : (
              <div
                onClick={() => setIsEditable(true)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="cursor-pointer"
                >
                  <path
                    d="M14 0C21.7293 0 28 6.27069 28 14C28 21.7293 21.7293 28 14 28C6.27069 28 0 21.7293 0 14C0 6.27069 6.27069 0 14 0ZM14 0.43575C6.50738 0.43575 0.435749 6.50738 0.435749 14C0.435749 21.4931 6.50738 27.5607 14 27.5607C21.4926 27.5607 27.5608 21.4926 27.5608 14C27.5608 6.50738 21.4926 0.43575 14 0.43575ZM14 4.5185C17.6243 4.5185 20.5625 7.45675 20.5625 11.081C20.5625 13.9707 16.3901 20.3179 14.6991 22.7723C14.3176 23.3258 13.6824 23.3258 13.3009 22.7723C11.6099 20.3175 7.4375 13.9711 7.4375 11.081C7.4375 7.45675 10.3757 4.5185 14 4.5185ZM14 7.581C13.0717 7.581 12.1815 7.94975 11.5251 8.60613C10.8687 9.2625 10.5 10.1527 10.5 11.081C10.5 12.0093 10.8687 12.8995 11.5251 13.5559C12.1815 14.2123 13.0717 14.581 14 14.581C14.9283 14.581 15.8185 14.2123 16.4749 13.5559C17.1313 12.8995 17.5 12.0093 17.5 11.081C17.5 10.1527 17.1313 9.2625 16.4749 8.60613C15.8185 7.94975 14.9283 7.581 14 7.581Z"
                    fill="#374151"
                  />
                </svg>
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
