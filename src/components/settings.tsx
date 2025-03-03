// Import necessary libraries and components
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { EngineContext } from "../services/globals";

import Options from "./ui/options";
import { Store } from "@tauri-apps/plugin-store";
import RunCalculations from "../services/calculations";
import Overlay from "./ui/overlay";

// Define the props for the Settings component
interface SettingsProps {
  isOverlayOpen: boolean;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
}

// Define the Units interface
interface Units {
  powerUnit?: string;
  torqueUnit?: string;
  massUnit?: string;
  currencyUnit?: string;
  engineColour?: string;
  simplifiedView?: boolean;
}

// Define the Settings component
function Settings({ isOverlayOpen, setIsOverlayOpen }: SettingsProps) {
  // Use context to get the engine and update functions
  const { engine, updateState, updateUnits } = useContext(EngineContext);
  // Create a memoized store instance
  const store = useMemo(() => {
    return new Store("store.bin");
  }, []);

  // Define state variables
  const [localUnits, setLocalUnits] = useState<Units>({});

  // Fetch units from the store when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const units: Units = (await store.get("units")) ?? {};
      if (units) {
        setLocalUnits(units);
      }
    };

    fetchData();
  }, [store]);

  // Render the component
  return isOverlayOpen ? (
    <Overlay
      isOverlayOpen={isOverlayOpen}
      setIsOverlayOpen={setIsOverlayOpen}
      title="Settings"
    >
      <div>
        <div className="p-3 space-x-5 flex flex-row">
          <div>
            <h2>Power unit</h2>
            <Options
              onChange={async (value) => {
                setLocalUnits((prevUnits) => {
                  const newUnits = { ...prevUnits, powerUnit: value };
                  store.set("units", newUnits).then(() => {
                    updateState({ engine: engine });
                    updateUnits(newUnits);

                    RunCalculations(engine, updateState, newUnits);
                  });
                  return newUnits;
                });
              }}
              options={["kW", "hp"]}
              value={localUnits.powerUnit ?? "kW"}
              uniqueKey={"powerUnit"}
            />
          </div>

          <div>
            <h2>Torque unit</h2>
            <Options
              onChange={async (value) => {
                setLocalUnits((prevUnits) => {
                  const newUnits = { ...prevUnits, torqueUnit: value };
                  store.set("units", newUnits).then(() => {
                    updateState({ engine: engine });
                    updateUnits(newUnits);
                    RunCalculations(engine, updateState, newUnits);
                  });
                  return newUnits;
                });
              }}
              options={["Nm", "lbft"]}
              value={localUnits.torqueUnit ?? "Nm"}
              uniqueKey={"torqueUnit"}
            />
          </div>

          <div>
            <h2>Mass unit</h2>
            <Options
              onChange={async (value) => {
                setLocalUnits((prevUnits) => {
                  const newUnits = { ...prevUnits, massUnit: value };
                  store.set("units", newUnits).then(() => {
                    updateState({ engine: engine });
                    updateUnits(newUnits);
                    RunCalculations(engine, updateState, newUnits);
                  });
                  return newUnits;
                });
              }}
              options={["kg", "lb"]}
              value={localUnits.massUnit ?? "kg"}
              uniqueKey={"massUnit"}
            />
          </div>
          <div>
            <h2>Simplified View</h2>
            <Options
              onChange={async (value) => {
                setLocalUnits((prevUnits) => {
                  const newUnits = {
                    ...prevUnits,
                    simplifiedView: value === "Yes" ? true : false,
                  };
                  store.set("units", newUnits).then(() => {
                    updateState({ engine: engine });
                    updateUnits(newUnits);
                    RunCalculations(engine, updateState, newUnits);
                  });
                  return newUnits;
                });
              }}
              options={["Yes", "No"]}
              value={localUnits.simplifiedView ? "Yes" : "No"}
              uniqueKey={"simplifiedView"}
            />
          </div>
        </div>
        <div className="p-3 space-x-5 flex flex-row">
          <div>
            <h2>Currency</h2>
            <Options
              onChange={async (value) => {
                setLocalUnits((prevUnits) => {
                  const newUnits = {
                    ...prevUnits,
                    currencyUnit: value,
                  };
                  store.set("units", newUnits).then(() => {
                    updateState({ engine: engine });
                    updateUnits(newUnits);
                    RunCalculations(engine, updateState, newUnits);
                  });
                  return newUnits;
                });
              }}
              options={["£", "$", "€", "¥"]}
              value={localUnits.currencyUnit ?? "£"}
              uniqueKey={"currencyUnit"}
            />
          </div>
        </div>
      </div>
    </Overlay>
  ) : null;
}

// Export the Settings component as the default export
export default Settings;
