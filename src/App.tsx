import StatisticList from "./components/ui/statisticList";
import TabBar from "./components/tabBar";
import TopBar from "./components/topBar"; // Import the TopBar component
import { useContext, useEffect } from "react";
import RunCalculations from "./services/calculations";
import { EngineContext } from "./services/globals";

function App() {
  const { engine, updateState } = useContext(EngineContext);
  
  useEffect(() => {
    RunCalculations(engine, updateState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App h-fulsl">
      <div className="flex">
        <div className="modelViewer"></div>
        <div className="flex flex-col justify-end">
          <TopBar />
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
