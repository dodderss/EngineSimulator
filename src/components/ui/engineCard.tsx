// Import necessary modules and assets
import { useContext } from "react";
import PowerIcon from "../../assets/icons/decorative/power.svg";
import TorqueIcon from "../../assets/icons/decorative/torque.svg";
import { EngineContext } from "../../services/globals";

import "./engineCard.tsx.css";

// Define the interface for EngineCard component props
interface EngineCardProps {
  name: string; // The name of the engine
  cylinders: number; // The number of cylinders in the engine
  layout: string; // The layout of the engine (e.g., "i" for inline, "v" for V-shaped)
  displacement: number; // The displacement of the engine
  aspiration: string; // The aspiration type of the engine (e.g., "na" for naturally aspirated, "turbo" for turbocharged)
  power: number; // The power output of the engine
  torque: number; // The torque output of the engine
  onClick: () => void; // Function to be called when the card is clicked
}

// Define the EngineCard functional component
function EngineCard({
  name,
  cylinders,
  layout,
  displacement,
  aspiration,
  power,
  torque,
  onClick,
}: EngineCardProps) {
  const { units } = useContext(EngineContext); // Get the units from the EngineContext

  return (
    <div
      className="engineCard" // Apply styles for the engine card
      onClick={onClick} // Call the onClick function when the card is clicked
      key={name + displacement.toString()} // Set a unique key for the card
    >
      <p>{name}</p> {/* Display the name of the engine */}
      <p className="text-gray-300 text-sm italic font-semibold">
        {displacement.toFixed(1)}{" "} {/* Display the displacement of the engine */}
        {aspiration === "na"
          ? "NA" // Display "NA" if the engine is naturally aspirated
          : aspiration === "turbo"
          ? "TURBOCHARGED" // Display "TURBOCHARGED" if the engine is turbocharged
          : "SUPERCHARGED"}{" "} // Display "SUPERCHARGED" if the engine is supercharged
        {layout === "i" ? "I" : "V"} {/* Display "I" for inline layout, "V" for V-shaped layout */}
        {cylinders} {/* Display the number of cylinders */}
      </p>
      <div className="flex align-middle gap-2 mt-5">
        <img
          src={PowerIcon.toString()} // Set the source of the power icon image
          width="36" // Set the width of the power icon
          height="36" // Set the height of the power icon
          alt="Power icon" // Set the alt text for the power icon
        />
        <p>
          {power.toFixed(1)} {units.powerUnit} {/* Display the power output and unit */}
        </p>
      </div>
      <div className="flex align-middle gap-2">
        <img
          src={TorqueIcon.toString()} // Set the source of the torque icon image
          width="36" // Set the width of the torque icon
          height="36" // Set the height of the torque icon
          alt="Torque icon" // Set the alt text for the torque icon
        />
        <p>
          {torque.toFixed(1)} {units.torqueUnit} {/* Display the torque output and unit */}
        </p>
      </div>
    </div>
  );
}

// Export the EngineCard component as the default export
export default EngineCard;