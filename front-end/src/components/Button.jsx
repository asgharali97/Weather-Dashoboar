import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Button = ({ content, Icon, tooltip, bg="#1E293B", text="#ffff" }) => {
  
    const [isHovered,setIsHovered] = useState(false)
  const tooltipRef = useRef(null);
  useGSAP(() => {
    if (isHovered) {
      console.log(tooltipRef.current);
      gsap.from(tooltipRef.current, {
        delay: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "circ.out",
      });
    }
  }, [isHovered]);
  function handle (){
    console.log("hello")
  }
  return (
    <>
      <button
        className={`py-2 px-4 flex justify-center items-center gap-2 bg-[${bg}] text-[${text}] rounded-full text-md font-medium cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onClick={handle}
      >
        <Icon />
        {content}
      </button>

      {tooltip && isHovered ? (
        <span
          className="tooltip absolute top-12 r-0 z-10 bg-[#d6d3d1] w-28 p-2 text-[#374151] rounded-lg text-sm font-medium transaction-all"
          ref={tooltipRef}
        >
          {tooltip}
        </span>
      ) : null}
    </>
  );
};

export default Button;
