import StatisticList from "./components/ui/statisticList";
import TabBar from "./components/ui/tabBar";
import TopBar from "./components/topBar";
import { useContext, useEffect, useState } from "react";
import RunCalculations from "./services/calculations";
import { EngineContext } from "./services/globals";
import MenuScreen from "./components/menuScreen";
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { readFile } from "./services/fileSystem";
import { listen } from "@tauri-apps/api/event";
import Graph from "./components/ui/graph";
import Settings from "./components/settings";

function App() {
  const { engine, updateState, units, updateUnits } = useContext(EngineContext);
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    RunCalculations(engine, updateState, units, updateUnits);
    const handleOpenUrl = async (urls: any) => {
      console.log("deep link:", urls);
      setUrl(urls);

      updateState({ engine: JSON.parse(await readFile(urls)) });
    };
    const handleOpenUrlAsync = async () => {
      await onOpenUrl(handleOpenUrl);
    };
    handleOpenUrlAsync();
    listen("tauri://file-drop", (event) => {
      console.log(event);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isEngineOpen ? (
    <div className="App h-full">
      <Settings isMenuOpen={isMenuOpen} setisMenuOpen={setIsMenuOpen} />
      <div className="flex">
        <div className="modelViewer">
          <p>{url}</p>
        </div>
        <div className="flex flex-col justify-end">
          <TopBar setIsMenuOpen={setIsMenuOpen}/>
          <div className="powerGraph">
            <p className="mt-2 text-center">Power</p>
            <Graph isTorque={false} />
          </div>
          <div className="torqueGraph">
            <p className="mt-2 text-center">Torque</p>
            <Graph isTorque={true} />
          </div>
        </div>
      </div>
      <div className="bottomLeftSection flex h-full">
        <StatisticList />
        <TabBar />
      </div>
      <div className="rightSection bg-black fixed right-0 bottom-0"></div>
    </div>
  ) : (
    <MenuScreen updateIsEngineOpen={setIsEngineOpen} />
  );
}

export default App;
