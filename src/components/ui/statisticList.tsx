import StatisticItem from "./statisticItem";
import PowerIcon from "../../assets/icons/decorative/power.svg";
import TorqueIcon from "../../assets/icons/decorative/torque.svg";
import PriceIcon from "../../assets/icons/decorative/price.svg";
import EfficiencyIcon from "../../assets/icons/decorative/efficiency.svg";
import WeightIcon from "../../assets/icons/decorative/weight.svg";

import "./statisticList.tsx.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { EngineContext } from "../../services/globals";
import { Store } from "@tauri-apps/plugin-store";

function StatisticList() {
  const { engine } = useContext(EngineContext);
  const store = useMemo(() => {
    return new Store("store.bin");
  }, []);

  const [powerUnit, setPowerUnit] = useState("kW");
  const [torqueUnit, setTorqueUnit] = useState("Nm");
  const [massUnit, setMassUnit] = useState("Kg");

  useEffect(() => {
    const fetchData = async () => {
      interface Units {
        powerUnit?: string;
        torqueUnit?: string;
        massUnit?: string;
      }

      const units: Units = (await store.get("units")) ?? {};

      if (units) {
        setPowerUnit(units.powerUnit ?? "kW");
        setTorqueUnit(units.torqueUnit ?? "Nm");
        setMassUnit(units.massUnit ?? "kg");
      }
    };

    fetchData();
  }, [store]);

  return (
    <div className="statList flex-col space-y-2 p-4 ">
      <h1 className="text-4xl">Statistics</h1>
      <StatisticItem
        image={PowerIcon.toString()}
        text={`${engine.power.toFixed(0)} ` + powerUnit}
      />
      <StatisticItem
        image={TorqueIcon.toString()}
        text={`${engine.torque.toFixed(0)} ` + torqueUnit}
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
        text={`${engine.engineWeight} ` + massUnit}
      />
    </div>
  );
}

export default StatisticList;
