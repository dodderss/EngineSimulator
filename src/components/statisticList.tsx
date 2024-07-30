import StatisticItem from "./statisticItem";
import PowerIcon from "../icons/power.svg";
import TorqueIcon from "../icons/torque.svg";
import PriceIcon from "../icons/price.svg";
import EfficiencyIcon from "../icons/efficiency.svg";
import WeightIcon from "../icons/weight.svg";

import './statisticList.tsx.css';

function StatisticList() {
  return <div className="statList flex-col space-y-2 p-4 ">
    <h1 className="text-4xl">Statistics</h1>
    <StatisticItem image={PowerIcon.toString()} text="--- HP" />
    <StatisticItem image={TorqueIcon.toString()} text="--- Nm" />
    <StatisticItem image={PriceIcon.toString()} text="£----" />
    <StatisticItem image={EfficiencyIcon.toString()} text="--%" />
    <StatisticItem image={WeightIcon.toString()} text="--- KG" />

  </div>;
}

export default StatisticList;