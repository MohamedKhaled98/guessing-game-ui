"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import classNames from "classnames";

const LineChartWidget = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [drawnPercentage, setDrawnPercentage] = useState(0);
  const [counter, setCounter] = useState(0);
  const [freeze, setFreeze] = useState(false);
  useEffect(() => {
    socket.on("reset", handleReset);
    socket.on("updateMultiplier", setCounter);
    socket.on("freeze", handleFreeze);

    return () => {
      socket.off("updateMultiplier");
      socket.off("reset");
      socket.off("freeze");
    };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  }, []);

  useEffect(() => {
    if (counter > 0) {
      animatePath();
    }
  }, [counter]);

  const handleFreeze = () => {
    setFreeze(true);
  };
  const handleReset = () => {
    setFreeze(false);
    setCounter(0);
    setDrawnPercentage(0);
    gsap.to(pathRef.current, {
      duration: 0,
      strokeDashoffset: pathRef.current!.getTotalLength(),
      strokeDasharray: pathRef.current!.getTotalLength(),
      ease: "power1.inOut",
    });
  };
  const animatePath = () => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const newDrawnPercentage = Math.min(drawnPercentage + 0.6, 100);
    const newOffset = length - (length * newDrawnPercentage) / 100;

    gsap.to(path, {
      duration: 0,
      strokeDashoffset: newOffset,
      ease: "power1.inOut",
    });

    setDrawnPercentage(newDrawnPercentage);
  };

  return (
    <div>
      <div
        className="h-96 bg-mid-dark rounded-lg mt-4 border border-slate-800 relative p-10 flex-col content-end"
        style={{ height: 450 }}>
        <div
          className={classNames(
            "font-sans text-7xl font-bold text-center pt-14 absolute top-8 inset-0 center",
            freeze ? "text-orange" : "text-white"
          )}>
          {counter.toFixed(2)}x
        </div>
        <div className="mt-auto w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="300"
            preserveAspectRatio="xMinYMax meet">
            <path
              ref={pathRef}
              d="M 0,295  Q 500,300,590,0"
              fill="none"
              stroke="#FB6C4F"
              strokeWidth="4"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>
        </div>

        <div style={{ marginTop: -4 }}>
          <hr className="border-slate-700" />
          <div className="flex mt-4 justify-between">
            {Array.from(Array(11).keys()).map((index) => (
              <span key={index} className="text-sm text-gray-500">
                {index}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartWidget;
