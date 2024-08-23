import StatisticItem from "./statisticItem";
import PowerIcon from "../../icons/decorative/power.svg";
import TorqueIcon from "../../icons/decorative/torque.svg";
import PriceIcon from "../../icons/decorative/price.svg";
import EfficiencyIcon from "../../icons/decorative/efficiency.svg";
import WeightIcon from "../../icons/decorative/weight.svg";

import "./statisticList.tsx.css";
import { useContext } from "react";
import { EngineContext } from "../../services/globals";

function StatisticList() {
  const { engine } = useContext(EngineContext);

  return (
    <div className="statList flex-col space-y-2 p-4 ">
      <h1 className="text-4xl">Statistics</h1>
      <StatisticItem
        image={PowerIcon.toString()}
        text={`${engine.power.toFixed(0)} kW`}
      />
      <StatisticItem
        image={TorqueIcon.toString()}
        text={`${engine.torque.toFixed(0)} Nm`}
      />
      <StatisticItem
        image={PriceIcon.toString()}
        text={`£${engine.enginePrice}`}
      />
      <StatisticItem
        image={EfficiencyIcon.toString()}
        text={`${engine.totalEfficiency}%`}
      />
      <StatisticItem
        image={WeightIcon.toString()}
        text={`${engine.engineWeight} KG`}
      />
    </div>
  );
}

export default StatisticList;
