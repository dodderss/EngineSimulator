import StatisticList from "./components/statisticList";
import TabBar from "./components/ui/tabBar";
import TopBar from "./components/topBar";
import { useContext, useEffect, useState } from "react";
import RunCalculations from "./services/calculations";
import { EngineContext, isEngine } from "./services/globals";
import MenuScreen from "./components/menuScreen";
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { readFile } from "./services/fileSystem";
import { listen } from "@tauri-apps/api/event";
import Graph from "./components/ui/graph";
import Settings from "./components/settings";
import OnlineHub from "./components/online-hub";
import ProblemSidebar from "./components/problemSidebar";

function App() {
  const { engine, updateState, units } = useContext(EngineContext);
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInternetMenuOpen, setIsInternetMenuOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    RunCalculations(engine, updateState, units);
    const handleOpenUrl = async (urls: any) => {
      console.log("deep link:", urls);
      setUrl(urls);

      await readFile(urls).then((value) => {
        if (value === "") {
          alert("Invalid file: File empty.");
          return;
        }

        const parsedValue = JSON.parse(value.toString());

        if (isEngine(parsedValue)) {
          updateState({ engine: JSON.parse(value.toString()) });
          setIsEngineOpen(true);

          return value;
        } else {
          alert("Invalid file: File may be corrupted or an old version.");
          return;
        }
      });
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

  useEffect(() => {
    if (isEngineOpen) {
      setIsMenuOpen(false);
    }
  }, [isEngineOpen, setIsMenuOpen]);

  return isEngineOpen ? (
    <div className="App h-full">
      {/* Overlay Items (don't show up until requested) */}
      <Settings isOverlayOpen={isMenuOpen} setIsOverlayOpen={setIsMenuOpen} />
      <OnlineHub
        isOverlayOpen={isInternetMenuOpen}
        setIsOverlayOpen={setIsInternetMenuOpen}
      />
      {/* Main App */}
      <div className="flex">
        {/* Top and Left Section */}
        <div className="modelViewer">
          <p>{url}</p>
        </div>
        <div className="flex flex-col justify-end">
          <TopBar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isInternetMenuOpen={isInternetMenuOpen}
            setIsInternetMenuOpen={setIsInternetMenuOpen}
          />
          <div className="powerGraph">
            <p className="mt-2 text-center ml-16 fixed">Power</p>
            <Graph isTorque={false} />
          </div>
          <div className="torqueGraph">
            <p className="mt-2 text-center ml-16 fixed">Torque</p>
            <Graph isTorque={true} />
          </div>
        </div>
      </div>
      {/* Bottom Left-Mid section */}
      <div className="bottomLeftSection flex h-full">
        <StatisticList />
        <TabBar />
      </div>
      {/* Right Section */}
      <div className="rightSection fixed right-0 bottom-0">
        <ProblemSidebar />
      </div>
    </div>
  ) : (
    <MenuScreen updateIsEngineOpen={setIsEngineOpen} />
  );
}

export default App;
