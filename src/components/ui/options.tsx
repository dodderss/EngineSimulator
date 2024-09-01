import { useEffect, useState } from "react";
import "./options.tsx.css";

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  uniqueKey?: string;
}

function Options(props: Props) {
  const [selectedOption, setSelectedOption] = useState(
    props.options.indexOf(props.value)
  );

  useEffect(() => {
    setSelectedOption(props.options.indexOf(props.value));
  }, [props.value, props.options]);

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
    <div className="options" key={props.uniqueKey}>
      {props.options.map((option, index) => (
        <OptionItem
          key={`${props.uniqueKey}-${option}`}
          label={option}
          index={index}
        />
      ))}
    </div>
  );
}

export default Options;
