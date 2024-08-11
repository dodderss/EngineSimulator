import React, { useState } from "react";
import "./options.tsx.css";

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function Options(props: Props) {
  const [selectedOption, setSelectedOption] = useState(
    props.options.indexOf(props.value)
  );

  const OptionItem = (props2: { label: string; index: number }) => {
    return (
      <div
        className={
          selectedOption === props2.index ? "selectedOptionItem" : "optionItem"
        }
        onClick={() => {
          setSelectedOption(props2.index);
          props.onChange(props2.label);
        }}
      >
        <p>{props2.label}</p>
      </div>
    );
  };

  return (
    <div className="options">
      {props.options.map((option, index) => (
        <OptionItem key={option} label={option} index={index} />
      ))}
    </div>
  );
}

export default Options;
