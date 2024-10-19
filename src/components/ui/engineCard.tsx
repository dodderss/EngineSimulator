import { useContext } from "react";
import PowerIcon from "../../assets/icons/decorative/power.svg";
import TorqueIcon from "../../assets/icons/decorative/torque.svg";
import { EngineContext } from "../../services/globals";

import "./engineCard.tsx.css";

interface EngineCardProps {
  name: string;
  cylinders: number;
  layout: string;
  displacement: number;
  aspiration: string;
  power: number;
  torque: number;
  onClick: () => void;
}

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
  const { units } = useContext(EngineContext);
  return (
    <div
      className="engineCard"
      onClick={onClick}
      key={name + displacement.toString()}
    >
      <p>{name}</p>
      <p className="text-gray-300 text-sm italic font-semibold">
        {displacement.toFixed(1)}{" "}
        {aspiration === "na"
          ? "NA"
          : aspiration === "turbo"
          ? "TURBOCHARGED"
          : "SUPERCHARGED"}{" "}
        {layout == "i" ? "I" : "V"}
        {cylinders}
      </p>
      <div className="flex align-middle gap-2 mt-5">
        <img
          src={PowerIcon.toString()}
          width="36"
          height="36"
          alt="Power icon"
        />
        <p>
          {power.toFixed(1)} {units.powerUnit}
        </p>
      </div>
      <div className="flex align-middle gap-2">
        <img
          src={TorqueIcon.toString()}
          width="36"
          height="36"
          alt="Torque icon"
        />
        <p>
          {torque.toFixed(1)} {units.torqueUnit}
        </p>
      </div>
    </div>
  );
}

export default EngineCard;
