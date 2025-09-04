import { useEffect, useState } from "react";
import HistoryChart from "./components/HistoryChart";
import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import { WeatherContextProvider } from "./context/WeatherContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const queryClient = new QueryClient();

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
