// Import necessary modules from React and CSS file for styling
import React, { ChangeEvent, useEffect, useState } from "react";
import "./slider.tsx.css";

// Define the interface for Slider component props
interface SliderProps {
  label: string; // Label for the slider
  max: number; // Maximum value for the slider
  min: number; // Minimum value for the slider
  step: number; // Step value for the slider
  value: number; // Current value of the slider
  onChange: (value: number) => void; // Function to be called when the slider value changes
}

// Define the Slider functional component
const Slider: React.FC<SliderProps> = ({
  label,
  max,
  min,
  step,
  value,
  onChange,
}) => {
  // Define state for the current value of the slider
  const [currentValue, setCurrentValue] = useState(value);

  // Handle change event for the slider input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setCurrentValue(newValue); // Update the current value state
  };

  // Update the current value state when the value prop changes
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className="flex flex-col pb-5">
      <h2 className="text-center text-2xl font-bold font-helvetica pb-5">
        {label} {/* Display the label for the slider */}
      </h2>
      <div className="flex justify-center gap-5 items-center">
        <button
          className="sliderButton"
          onClick={() => {
            const newValue =
              currentValue - step >= min ? currentValue - step : currentValue;
            setCurrentValue(newValue); // Update the current value state
            onChange(newValue); // Call the onChange function with the new value
          }}
        >
          -
        </button>
        <input
          type="range"
          min={min} // Set the minimum value for the slider
          max={max} // Set the maximum value for the slider
          step={step} // Set the step value for the slider
          onChange={handleChange} // Handle change event for the slider input
          onMouseUp={() => onChange(currentValue)} // Call the onChange function when the mouse button is released
          value={currentValue} // Set the current value for the slider input
        />
        <button
          className="sliderButton"
          onClick={() => {
            const newValue =
              currentValue + step <= max ? currentValue + step : currentValue;
            setCurrentValue(newValue); // Update the current value state
            onChange(newValue); // Call the onChange function with the new value
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

// Export the Slider component as the default export
export default Slider;