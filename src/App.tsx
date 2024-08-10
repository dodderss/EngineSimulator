// import { useState } from "react";
import StatisticList from "./components/statisticList";
import TabBar from "./components/tabBar";

function App() {
  return (
    <div className="App h-full">
      <div className="flex">
        <div className="modelViewer" />
        <div className="flex flex-col justify-end">
          <div className="topBar" />
          <div className="powerGraph" />
          <div className="torqueGraph" />
        </div>
      </div>
      <div className="bottomLeftSection flex h-full">
        <StatisticList />
        <TabBar />
      </div>
      <div className="rightSection bg-black fixed right-0 bottom-0" />
    </div>
  );
}

export default App;
