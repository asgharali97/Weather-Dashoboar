import HeroSection from "../components/HeroSection"
import Forecast from "../components/Forecast"

const LandingPage = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-[#E7E5E4] text-[#374151] px-12">
        <HeroSection/>
        <Forecast/>
      </div>
    </>
  )
}

export default LandingPage
