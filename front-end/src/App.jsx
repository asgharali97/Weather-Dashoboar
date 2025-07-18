import HistoryChart from "./components/HistoryChart";
import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Map from "./components/Map";
import Button from "./components/Button";
import { Forward } from "lucide-react";
function App() {
  return (
    <>
      <div className="w-full h-screen bg-[#E7E5E4] text-[#374151]">
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
        <LandingPage />
        <HistoryChart />
        <Map />
      </div>
    </>
  );
}

export default App;
