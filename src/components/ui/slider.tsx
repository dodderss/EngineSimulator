import React, { ChangeEvent, useState } from "react";
import "./slider.tsx.css";

interface SliderProps {
  label: string;
  max: number;
  min: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  max,
  min,
  step,
  initialValue,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setCurrentValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col pb-5">
      <h2 className="text-center text-2xl font-bold font-helvetica pb-5">
        {label}
      </h2>
      <div className="flex justify-center gap-5 items-center">
        <button
          className="sliderButton"
          onClick={() => {
            const newValue =
              currentValue - step >= min ? currentValue - step : currentValue;
            setCurrentValue(newValue);
            onChange(newValue);
          }}
        >
          -
        </button>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          value={currentValue}
        />
        <button
          className="sliderButton"
          onClick={() => {
            const newValue =
              currentValue + step <= max ? currentValue + step : currentValue;
            setCurrentValue(newValue);
            onChange(newValue);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Slider;
