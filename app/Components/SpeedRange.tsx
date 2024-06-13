import Image from "next/image";
import Volume from "../../public/knob.png";
import TitleWithIcon from "../Shared/titleWithIcon";
import { SetStateAction } from "react";
import classNames from "classnames";

type Props = {
  speed: number;
  setSpeed: React.Dispatch<SetStateAction<number>>;
};
const STEP = 50;
const SpeedRange = ({ speed, setSpeed }: Props) => {
  return (
    <div className="mt-6">
      <TitleWithIcon IconSrc={Volume} title="Speed" />

      <div className="border rounded-lg border-slate-700 bg-mid-dark px-3 py-2">
        <input
          type="range"
          className="w-full"
          max={250}
          min={50}
          step={STEP}
          value={speed}
          onChange={(v) => {
            console.log(v.target.value);
            setSpeed(parseInt(v.target.value));
          }}
        />
        <div className="div flex justify-between mt-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={classNames(
                "text-xs",
                speed >= index * STEP
                  ? "bg-gradient-to-r from-pink to-orange inline-block text-transparent bg-clip-text"
                  : "text-slate-400"
              )}>
              {index}x
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeedRange;
