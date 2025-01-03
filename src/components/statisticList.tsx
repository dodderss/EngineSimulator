import StatisticItem from "./ui/statisticItem";
import PowerIcon from "../assets/icons/decorative/power.svg";
import TorqueIcon from "../assets/icons/decorative/torque.svg";
import PriceIcon from "../assets/icons/decorative/price.svg";
import EfficiencyIcon from "../assets/icons/decorative/efficiency.svg";
import WeightIcon from "../assets/icons/decorative/weight.svg";

import "./statisticList.tsx.css";
import { useContext } from "react";
import { EngineContext } from "../services/globals";

function StatisticList() {
  const { engine, units } = useContext(EngineContext);

  return (
    <div className="statList flex-col space-y-2 p-4 ">
      <h1 className="text-4xl">
        Statistics
      </h1>
      <StatisticItem
        image={PowerIcon.toString()}
        text={`${engine.power.toFixed(0)} ` + units.powerUnit}
      />
      <StatisticItem
        image={TorqueIcon.toString()}
        text={`${engine.torque.toFixed(0)} ` + units.torqueUnit}
      />
      <StatisticItem
        image={PriceIcon.toString()}
        text={`£${engine.enginePrice.toFixed(2)}`}
      />
      <StatisticItem
        image={EfficiencyIcon.toString()}
        text={`${engine.totalEfficiency.toFixed(1)}%`}
      />
      <StatisticItem
        image={WeightIcon.toString()}
        text={`${engine.engineMass.toFixed(2)} ` + units.massUnit}
      />
    </div>
  );
}

export default StatisticList;
