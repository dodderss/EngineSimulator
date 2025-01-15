// Import necessary modules and components
import "./tabBar.tsx.css";
import { useState } from "react";
import BottomEnd from "../tabViews/bottom";
import TopEnd from "../tabViews/top";
import Aspiration from "../tabViews/aspiration";
import FuelAndTiming from "../tabViews/fuelandtiming";
import Appearance from "../tabViews/appearance";

// Define the TabBar functional component
function TabBar() {
  // Define state for the selected tab index
  const [selectedTab, setSelectedTab] = useState<number>(0);
  // Define the tabs array with tab names and corresponding components
  const tabs = [
    ["Bottom End", BottomEnd()],
    ["Top End", TopEnd()],
    ["Aspiration", Aspiration()],
    ["Fuel & Timing", FuelAndTiming()],
    ["Appearance", Appearance()],
  ];

  // Function to get the class name for a tab based on its index
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
            key={index} // Set a unique key for each tab button
            onClick={() => setSelectedTab(index)} // Update the selected tab index when a tab is clicked
            className="w-full"
          >
            <div className={getClassName(index)}>
              <h1>{tab[0]}</h1> {/* Display the tab name */}
            </div>
          </button>
        ))}
      </div>
      <div className="tabcontent">{tabs[selectedTab][1]}</div> {/* Display the content of the selected tab */}
    </div>
  );
}

// Export the TabBar component as the default export
export default TabBar;