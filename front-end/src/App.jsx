import { useEffect, useState } from "react";
import HistoryChart from "./components/HistoryChart";
import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Button from "./components/Button";
import Map from "./components/Map";
import { Forward } from "lucide-react";
import { WeatherContextProvider } from "./context/WeatherContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const city = "Karachi";
  const queryClient = new QueryClient();
  useEffect(() => {
    const weather = async () => {
      const geoCode = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
          import.meta.VITE_OWM_KEY
        }`
      );
      const geoData = await geoCode.json();
      console.log(geoData[0].lat, geoData[0].lon);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          geoData[0].lat
        }&lon=${geoData[0].lon}&appid=${import.meta.VITE_OWM_KEY}`
      );
      const data = await res.json();
      console.log(data);
    };
    // weather()
  });

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WeatherContextProvider>
          <div className="w-full h-screen bg-[#E7E5E4] text-[#374151] font-Mozilla">
            {isOffline && (
              <div className="bg-[#6366f1] text-[#fff] p-2 text-center">
                You’re offline. Showing last updated weather.
              </div>
            )}
            <div className="relative">
              <div className="fixed right-2 bottom-4 z-10 md:hidden">
                <Button
                  content="share"
                  Icon={Forward}
                  tooltip="share weather"
                />
              </div>
            </div>
            <Navbar />
            <main>
            <LandingPage />
            <HistoryChart />
            </main>
          </div>
        </WeatherContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
