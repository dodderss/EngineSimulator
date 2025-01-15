// Import necessary modules from React and CSS file for styling
import { useEffect, useState } from "react";
import "./options.tsx.css";

// Define the interface for Options component props
interface Props {
  options: string[]; // Array of option strings
  value: string; // Currently selected value
  onChange: (value: string) => void; // Function to be called when the selected option changes
  uniqueKey?: string; // Optional unique key for the component
}

// Define the Options functional component
function Options(props: Props) {
  // Define state for the selected option index
  const [selectedOption, setSelectedOption] = useState(
    props.options.indexOf(props.value)
  );

  // Update the selected option index when props.value or props.options change
  useEffect(() => {
    setSelectedOption(props.options.indexOf(props.value));
  }, [props.value, props.options]);

  // Define the OptionItem functional component
  const OptionItem = (props2: { label: string; index: number }) => {
    return (
      <div
        className={
          selectedOption === props2.index ? "selectedOptionItem" : "optionItem"
        } // Apply selected or default styles based on the selected option index
        onClick={() => {
          setSelectedOption(props2.index); // Update the selected option index
          props.onChange(props2.label); // Call the onChange function with the selected option label
        }}
      >
        <p>{props2.label}</p> {/* Display the option label */}
      </div>
    );
  };

  return (
    <div className="options" key={props.uniqueKey}>
      {props.options.map((option, index) => (
        <OptionItem
          key={`${props.uniqueKey}-${option}`} // Set a unique key for each option item
          label={option} // Pass the option label to the OptionItem component
          index={index} // Pass the option index to the OptionItem component
        />
      ))}
    </div>
  );
}

// Export the Options component as the default export
export default Options;