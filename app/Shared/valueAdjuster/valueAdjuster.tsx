import React from "react";
import CaretUp from "../../../public/caret-up.png";
import CaretDown from "../../../public/caret-down.png";
import Image from "next/image";
type Props = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  min?: number;
  max?: number;
  step?: number;
  fixedDecimal?: number;
};
const ValueAdjuster = ({
  label,
  value,
  setValue,
  min = 0,
  max = 10,
  fixedDecimal = 0,
  step = 1,
}: Props) => {
  const handleIncrement = () => {
    const parsedValue = parseFloat(value);
    const updatedValue = (!isNaN(parsedValue) ? parsedValue : 0) + step;
    if (updatedValue > max) return;
    setValue(updatedValue.toFixed(fixedDecimal));
  };
  const handleDecrement = () => {
    const parsedValue = parseFloat(value);
    const updatedValue = (!isNaN(parsedValue) ? parsedValue : 0) - step;
    if (updatedValue < min) return;
    setValue(updatedValue.toFixed(fixedDecimal));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setValue(value);
  };
  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const parsedValue = parseFloat(value);
    setValue(parsedValue.toFixed(fixedDecimal));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value > max || value < min) return;
    onChange(e);
  };

  return (
    <div className="text-center bg-gradient-to-r from-dark to-mid-dark rounded-md px-2 py-1 border border-slate-800">
      <div className="text-slate-400 text-xs font-medium">{label}</div>
      <div className="flex  justify-center font-bold text-sm">
        <button
          onClick={handleDecrement}
          className="bg-mid-dark border rounded-md border-slate-700 p-1 w-6 h-6 text-xs flex justify-center items-center">
          <Image
            src={CaretDown}
            width={12}
            alt="cup icon"
            objectFit="contain"
          />
        </button>
        <input
          className="grow mx-1 bg-extra-dark rounded-lg text-center"
          type="number"
          min={min.toFixed(fixedDecimal)}
          max={max.toFixed(fixedDecimal)}
          value={value}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <button
          onClick={handleIncrement}
          className="bg-mid-dark border rounded-md border-slate-700 p-1 w-6 h-6 flex justify-center items-center text-xs ">
          <Image src={CaretUp} width={12} alt="cup icon" objectFit="contain" />
        </button>
      </div>
    </div>
  );
};

export default ValueAdjuster;
