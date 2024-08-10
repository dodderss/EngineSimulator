import "./tabBar.tsx.css";
import { useState } from "react";
import BottomEnd from "./tabViews/bottom";
import TopEnd from "./tabViews/top";
import Aspiration from "./tabViews/aspiration";
import FuelAndTiming from "./tabViews/fuelandtiming";
import Appearance from "./tabViews/appearance";

function TabBar() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = [
    ["Bottom End", BottomEnd()],
    ["Top End", TopEnd()],
    ["Aspiration", Aspiration()],
    ["Fuel & Timing", FuelAndTiming()],
    ["Appearance", Appearance()],
  ];

  const getClassName = (index: number) => {
    const isSelected = index === selectedTab;
    const isLast = index === tabs.length - 1;

    if (isSelected && isLast) return "selectedLast";
    if (isSelected) return "selected";
    if (isLast) return "tabLast";
    return "tab";
  };

  return (
    <div className="w-full h-full">
      <div className="tabbar">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(index)}
            className="w-full"
          >
            <div className={getClassName(index)}>
              <p className="text-3xl">{tab[0]}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="tabcontent">{tabs[selectedTab][1]}</div>
    </div>
  );
}

export default TabBar;
