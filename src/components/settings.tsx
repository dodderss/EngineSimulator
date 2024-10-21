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

interface SettingsProps {
  isOverlayOpen: boolean;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
}

interface Units {
  powerUnit?: string;
  torqueUnit?: string;
  massUnit?: string;
}

function Settings({ isOverlayOpen, setIsOverlayOpen }: SettingsProps) {
  const { engine, updateState, updateUnits } = useContext(EngineContext);
  const store = useMemo(() => {
    return new Store("store.bin");
  }, []);

  const [localUnits, setLocalUnits] = useState<Units>({});

  useEffect(() => {
    const fetchData = async () => {
      const units: Units = (await store.get("units")) ?? {};
      if (units) {
        setLocalUnits(units);
      }
    };

    fetchData();
  }, [store]);

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
        </div>
      </div>
    </Overlay>
  ) : null;
}

export default Settings;
