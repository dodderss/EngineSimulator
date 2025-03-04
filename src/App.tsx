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
import ModelViewer from "./components/modelViewer";

function App() {
  // Get engine, updateState, and units from EngineContext
  const { engine, updateState, units, updateCurrency } =
    useContext(EngineContext);
  // State variables to manage the visibility of different sections
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInternetMenuOpen, setIsInternetMenuOpen] = useState(false);
  const [haveRunCurrencyConversion, setHaveRunCurrencyConversion] =
    useState(false);

  // Initialize undo system
  const undoSystem = new UndoRedo();

  // Effect to run calculations and handle undo/redo keyboard shortcuts
  useEffect(() => {
    RunCalculations(engine, updateState, units);
    if (!haveRunCurrencyConversion) {
      setHaveRunCurrencyConversion(true);
      const apiURL =
        "https://api.currencyapi.com/v3/latest?apikey=&currencies=USD%2CEUR%2CJPY&base_currency=GBP";
      fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
          updateCurrency({
            dollar: data.data.USD.value,
            euro: data.data.EUR.value,
            yen: data.data.JPY.value,
          });
        })
    }

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

    // Add event listener for keydown events
    window.addEventListener("keydown", handleUndo);
    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("keydown", handleUndo);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to push the current engine state to the undo system
  useEffect(() => {
    undoSystem.push(engine);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine]);

  // Effect to close the menu when the engine is open
  useEffect(() => {
    if (isEngineOpen) {
      setIsMenuOpen(false);
    }
  }, [isEngineOpen, setIsMenuOpen]);

  // Render the main application or the menu screen based on isEngineOpen state
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
          <ModelViewer />
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
