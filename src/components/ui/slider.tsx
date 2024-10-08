import React, { ChangeEvent, useEffect, useState } from "react";
import "./slider.tsx.css";

interface SliderProps {
  label: string;
  max: number;
  min: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  max,
  min,
  step,
  value,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setCurrentValue(newValue);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

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
          onMouseUp={() => onChange(currentValue)}
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
