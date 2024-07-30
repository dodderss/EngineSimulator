import React, { ChangeEvent } from 'react';
import './/slider.tsx.css';

interface SliderProps {
  label: string;
  max: number;
  min: number;
  step: number;
  value: number;
  onChange: (value: number) => void; // Add this line
}

const Slider: React.FC<SliderProps> = ({ label, max, min, step, value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onChange(newValue); // Call the onChange function passed from the parent
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold font-helvetica pb-5">{label}</h2>
      <div className="flex justify-center gap-5 items-center">
        <button onClick={() => onChange((value - step) >= min ? value - step : value)}>-</button>
        <input type="range" min={min} max={max} step={step} onChange={handleChange} value={value} />
        <button onClick={() => onChange((value + step) <= max ? value + step : value)}>+</button>
      </div>
    </>
  );
};

export default Slider;