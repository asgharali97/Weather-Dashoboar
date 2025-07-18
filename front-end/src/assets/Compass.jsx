import  { useRef } from "react";
import { gsap } from "gsap";
import {useGSAP} from '@gsap/react'
const Compass = ({ direction = 180 }) => {
  const needleRef = useRef(null);

  useGSAP(() => {
    gsap.to(needleRef.current, {
      rotation: direction,
      transformOrigin: "50% 50%",
      duration: 1,
      ease: "power2.out",
    })
  }, [direction]);

  return (
    <div className="flex justify-center items-center mt-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 159 159"
        fill="none"
        className="w-12 h-12"
      >
        <circle
          cx="79.5"
          cy="79.5"
          r="76.5"
          fill="white"
          stroke="#6366F1"
          strokeWidth="6"
        />
        <rect x="76" y="5" width="9" height="8" fill="#6366F1" />
        <rect x="76" y="147" width="9" height="8" fill="#6366F1" />
        <rect x="146" y="71" width="9" height="8" fill="#6366F1" />
        <rect x="3" y="71" width="9" height="8" fill="#6366F1" />
        <g ref={needleRef}>
        <path
          d="M116.5 109L72.0263 86.2783L44 42L88 66.5L116.5 109Z"
          fill="white"
        />
        <path
          d="M72.0263 86.2783L116.5 109L88 66.5M72.0263 86.2783L44 42L88 66.5M72.0263 86.2783L88 66.5"
          stroke="#6366F1"
          strokeWidth="3"
        />
        <path d="M116 108L88 67L72 87L116 108Z" fill="#6366F1" />
        </g>
      </svg>
    </div>
  );
};

export default Compass;
