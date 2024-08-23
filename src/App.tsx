import StatisticList from "./components/ui/statisticList";
import TabBar from "./components/ui/tabBar";
import TopBar from "./components/topBar"; // Import the TopBar component
import { useContext, useEffect, useState } from "react";
import RunCalculations from "./services/calculations";
import { EngineContext } from "./services/globals";
import MenuScreen from "./components/menuScreen";

function App() {
  const { engine, updateState } = useContext(EngineContext);
  const [isEngineOpen, setIsEngineOpen] = useState(true);
  useEffect(() => {
    RunCalculations(engine, updateState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isEngineOpen ? (
      <div className="App h-full">
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
    ) : (
      <MenuScreen updateIsEngineOpen={setIsEngineOpen}/>
    )
  );
}

export default App;
