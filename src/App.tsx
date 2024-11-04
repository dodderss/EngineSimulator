import StatisticList from "./components/statisticList";
import TabBar from "./components/ui/tabBar";
import TopBar from "./components/topBar";
import { useContext, useEffect, useState } from "react";
import RunCalculations from "./services/calculations";
import { EngineContext } from "./services/globals";
import MenuScreen from "./components/menuScreen";
import Graph from "./components/ui/graph";
import Settings from "./components/settings";
import OnlineHub from "./components/online-hub";
import ProblemSidebar from "./components/problemSidebar";
import UndoRedo from "./services/undoRedo";

function App() {
  const { engine, updateState, units } = useContext(EngineContext);
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInternetMenuOpen, setIsInternetMenuOpen] = useState(false);

  const undoSystem = new UndoRedo();

  useEffect(() => {
    RunCalculations(engine, updateState, units);
    const handleUndo = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {

        if (undoSystem) {
          let undo = undoSystem.undo();
          if (undo) {
            updateState({ engine: undo });
            RunCalculations(undo, updateState, units);
          }
        }
      } else if ((event.ctrlKey || event.metaKey) && event.key === "y") {
        if (undoSystem) {
          let redo = undoSystem.redo();
          if (redo) {
            updateState({ engine: redo });
            RunCalculations(redo, updateState, units);
          }
        }
      }
    };

    window.addEventListener("keydown", handleUndo);
    return () => {
      window.removeEventListener("keydown", handleUndo); // Cleanup
    };
  }, []);
  useEffect(() => {
    undoSystem.push(engine);
    console.log("pushed", engine);
  }, [engine]);

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
        <div className="modelViewer"></div>
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
