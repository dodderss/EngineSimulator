import StatisticItem from "./statisticItem";
import PowerIcon from "../icons/power.svg";
import TorqueIcon from "../icons/torque.svg";
import PriceIcon from "../icons/price.svg";
import EfficiencyIcon from "../icons/efficiency.svg";
import WeightIcon from "../icons/weight.svg";

import "./statisticList.tsx.css";
import { useContext } from "react";
import { EngineContext } from "../globals";

function StatisticList() {
  const { engine } = useContext(EngineContext);

  return (
    <div className="statList flex-col space-y-2 p-4 ">
      <h1 className="text-4xl">Statistics</h1>
      <StatisticItem
        image={PowerIcon.toString()}
        text={`${engine?.power || 0} HP`}
      />
      <StatisticItem
        image={TorqueIcon.toString()}
        text={`${engine?.torque || 0} Nm`}
      />
      <StatisticItem
        image={PriceIcon.toString()}
        text={`£${engine?.enginePrice || 0}`}
      />
      <StatisticItem
        image={EfficiencyIcon.toString()}
        text={`${engine?.totalEfficiency || 0}%`}
      />
      <StatisticItem
        image={WeightIcon.toString()}
        text={`${engine?.engineWeight || 0} KG`}
      />
    </div>
  );
}

export default StatisticList;
