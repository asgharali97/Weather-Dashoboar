const HeroSection = () => {
  return (
    <>
      <div className="w-full h-screen bg-[#E7E5E4]">
        <div className="py-14 my-4">
        <div className="relative flex justify-center items-center gap-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-center">33°</h1>
          <div className="absolute top-2 left-[65%] sm:top-4 sm:left-[61%] md:top-5 md:left-[62%] lg:top-8 lg:left-[60%] flex items-center gap-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 30"
              fill="none"
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
            >
              <path
                d="M12.4931 2.57752C12.831 2.19869 13.2477 1.91877 13.706 1.76266C14.1644 1.60654 14.6503 1.57906 15.1204 1.68265C15.5906 1.78625 16.0306 2.01772 16.4011 2.35647C16.7717 2.69523 17.0614 3.13079 17.2446 3.62442C17.4277 4.11806 17.4986 4.65447 17.4509 5.18599C17.4032 5.71751 17.2384 6.22766 16.9712 6.67109C16.7039 7.11452 16.3425 7.47749 15.9191 7.72773C15.4957 7.97798 15.0233 8.10775 14.544 8.10551H1.45312M16.8568 26.6024C17.1947 26.9812 17.6113 27.2611 18.0697 27.4173C18.528 27.5734 19.0139 27.6009 19.4841 27.4973C19.9543 27.3937 20.3942 27.1622 20.7648 26.8234C21.1353 26.4847 21.4251 26.0491 21.6082 25.5555C21.7914 25.0619 21.8622 24.5254 21.8145 23.9939C21.7668 23.4624 21.602 22.9523 21.3348 22.5088C21.0676 22.0654 20.7062 21.7024 20.2827 21.4522C19.8593 21.2019 19.3869 21.0722 18.9077 21.0744H1.45312M24.3331 7.66781C24.7562 7.1975 25.2767 6.85063 25.8487 6.65788C26.4206 6.46512 27.0264 6.43243 27.6124 6.56268C28.1984 6.69293 28.7465 6.98211 29.2084 7.40465C29.6702 7.8272 30.0316 8.37007 30.2604 8.98527C30.4892 9.60047 30.5784 10.269 30.5202 10.9318C30.4621 11.5946 30.2582 12.2312 29.9268 12.7853C29.5953 13.3394 29.1464 13.794 28.6198 14.1087C28.0933 14.4235 27.5052 14.5888 26.9077 14.59H1.45312"
                stroke="#1E293B"
                strokeWidth="2.90909"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            <span className="text-md md:text-lg font-medium text-[#1E293B]">
              7.2 km/h
            </span>
          </div>
          <div className="absolute top-8 left-[65%] sm:top-12 sm:left-[61%] md:top-16 md:left-[62%] lg:top-22 lg:left-[60%] flex items-center gap-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 39"
              fill="none"
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
            >
              <path
                d="M14.5813 2C19.3687 4.31779 29.3491 15.3346 30.6272 23.3179C30.705 27.5006 29.1435 30.8677 26.5984 33.2561C23.906 35.7809 20.105 37.2198 15.8817 37.2198C12.0451 37.2403 8.33839 36.0027 5.49007 33.7504C2.78102 31.5835 1.08058 28.5792 1 25.2534C2.39759 15.4296 12.1501 4.58317 14.5813 2ZM9.53835 19.846C9.51228 19.8794 9.48906 19.9144 9.46889 19.9507C8.57421 21.4602 7.82957 23.0062 7.53783 25.324C7.57117 26.3174 7.93515 27.2401 8.53253 28.0289C9.1827 28.8859 10.1107 29.5895 11.1999 30.0716C11.2971 30.113 11.3972 30.1227 11.4944 30.113C11.6004 30.1022 11.7007 30.065 11.7834 30.0059L11.8112 29.9937L11.5944 29.7502C10.6831 28.7398 9.31607 27.1524 9.31607 25.0124C9.31607 23.1815 9.52724 21.0853 9.53835 19.8485V19.846Z"
                stroke="#1E293B"
                strokeWidth="2"
              />
            </svg>
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
    </>
  );
};

export default HeroSection;
