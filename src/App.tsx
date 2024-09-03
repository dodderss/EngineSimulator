import StatisticList from "./components/ui/statisticList";
import TabBar from "./components/ui/tabBar";
import TopBar from "./components/topBar"; // Import the TopBar component
import { useContext, useEffect, useState } from "react";
import RunCalculations from "./services/calculations";
import { EngineContext } from "./services/globals";
import MenuScreen from "./components/menuScreen";
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { openFile, readFile } from "./services/fileSystem";
import { listen } from "@tauri-apps/api/event";
import Graph from "./components/ui/graph";

function App() {
  const { engine, updateState } = useContext(EngineContext);
  const [isEngineOpen, setIsEngineOpen] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    RunCalculations(engine, updateState);
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
      <div className="flex">
        <div
          className="modelViewer"
          onClick={() => {
            openFile().then((value) => {
              if (value === "") {
                return;
              }
              updateState({ engine: JSON.parse(value.toString()) });
            });
          }}
        >
          <p>{url}</p>
        </div>
        <div className="flex flex-col justify-end">
          <TopBar />
          <div className="powerGraph">
            <Graph />
          </div>
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
    <MenuScreen updateIsEngineOpen={setIsEngineOpen} />
  );
}

export default App;
