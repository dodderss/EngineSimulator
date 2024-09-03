import React, { useContext, useEffect } from "react";
import { EngineContext } from "../../services/globals";
import { AxisOptions, Chart } from "react-charts";

type Power = {
  rpm: number;
  power: number;
};

type PowerSeries = {
  label: string;
  data: Power[];
};

const Graph = () => {
  const { engine } = useContext(EngineContext);
  const [powerSeries, setPowerSeries] = React.useState<PowerSeries[]>([]);

  useEffect(() => {
    const rpm: number[] = [];

    for (let i = 10; i <= engine.rpmLimit; i += 10) {
      rpm.push(i);
    }

    const tempPower: Power[] = rpm.map((currentRpm, index) => ({
      rpm: currentRpm,
      power: engine.powerList[index],
    }));

    setPowerSeries([
      {
        label: "Power",
        data: tempPower,
      },
    ]);
  }, [engine]);

  const data = React.useMemo(() => powerSeries, [powerSeries]);

  const primaryAxis: AxisOptions<Power> = {
    getValue: (datum) => datum.rpm,
    scaleType: "linear", // Specify the scale type
  };

  const secondaryAxes: AxisOptions<Power>[] = [
    {
      getValue: (datum) => datum.power,
      scaleType: "linear", // Specify the scale type
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          defaultColors: ["white"],
          dark: true,
        }}
      />
    </div>
  );
};

export default Graph;
