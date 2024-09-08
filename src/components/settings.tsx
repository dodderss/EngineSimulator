import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { EngineContext } from "../services/globals";

import CloseIcon from "../assets/icons/system/close.svg";

import "./settings.tsx.css";
import Options from "./ui/options";
import { Store } from "@tauri-apps/plugin-store";
import RunCalculations from "../services/calculations";

interface MenuProps {
  isMenuOpen: boolean;
  setisMenuOpen: Dispatch<SetStateAction<boolean>>;
}

interface Units {
  powerUnit?: string;
  torqueUnit?: string;
  massUnit?: string;
}

function Settings({ isMenuOpen, setisMenuOpen }: MenuProps) {
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

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setisMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, setisMenuOpen]);

  return isMenuOpen ? (
    <div className="settings-overlay">
      <div className="settings">
        <div className="settings-header flex flex-row justify-between w-full p-3">
          <h1>Settings</h1>
          <div
            className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
            onClick={() => setisMenuOpen(false)}
          >
            <img src={CloseIcon.toString()} alt="" />
          </div>
        </div>
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

                    RunCalculations(engine, updateState, newUnits, updateUnits);
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
                    RunCalculations(engine, updateState, newUnits, updateUnits);
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
                    RunCalculations(engine, updateState, newUnits, updateUnits);
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
    </div>
  ) : null;
}

export default Settings;
