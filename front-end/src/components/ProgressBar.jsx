import { useState } from "react";
const ProgressBar = ({ progress, max, getAlertText }) => {
  const [hovered, setHovered] = useState(false);

  const perecent = Math.min(100, Math.max(0,(progress / max) *100))
  
  return (
    <>
      <div className="relative w-full h-3 mt-8 bg-[#d6d3d1] rounded-full">
        <div className="absolute w-[${left}px] left-0 top-0 h-full bg-[#6366F1] rounded-tl-full rounded-bl-full"
        style={{ width: `${perecent + 2}%` }}
        ></div>
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${perecent}%` }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="w-5 h-5 rounded-full shadow-md cursor-pointer bg-[#E5E5F2]"
          />
          {hovered && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 text-sm bg-[#E5E5F2] rounded shadow-lg whitespace-nowrap">
              {getAlertText ? getAlertText(progress) : `${perecent.toFixed(0)}%`}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;

