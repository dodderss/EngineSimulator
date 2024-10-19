import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Overlay from "./ui/overlay";
import Button from "./ui/button";
import { addEngine, getEngines } from "../services/onlineServices";
import { Engine, EngineContext } from "../services/globals";
import EngineCard from "./ui/engineCard";

import "./online-hub.tsx.css";

import UploadIcon from "../assets/icons/system/upload.svg";
import RefreshIcon from "../assets/icons/system/refresh.svg";

interface OnlineHubProps {
  isOverlayOpen: boolean;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
}

function OnlineHub({ isOverlayOpen, setIsOverlayOpen }: OnlineHubProps) {
  const { engine, updateState } = useContext(EngineContext);
  const [engines, setEngines] = useState<Engine[]>([]);

  useEffect(() => {
    getEngines().then((data) => {
      setEngines(data);
    });
  }, []);

  return (
    <Overlay
      isOverlayOpen={isOverlayOpen}
      setIsOverlayOpen={setIsOverlayOpen}
      title="Enginuity Hub"
      size="large"
    >
      <div className="flex justify-between">
        <Button
          icon={UploadIcon.toString()}
          name="Upload Engine"
          onClick={() => {
            addEngine(engine);
          }}
        />
        <Button
          icon={RefreshIcon.toString()}
          name="Refresh Engines"
          onClick={() => {
            getEngines().then((data) => {
              console.log(data);
              setEngines(data);
            });
          }}
        />
      </div>

      <p className="mt-4">All Online Engines</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] pt-2 gap-2">
        {engines.map((i) => (
          <EngineCard
            name={i.engineName}
            cylinders={i.engineCylinders}
            layout={i.engineType}
            displacement={i.displacement}
            aspiration={i.aspirationType}
            power={i.power}
            torque={i.torque}
            onClick={() => {
              updateState({ engine: i });
              setIsOverlayOpen(false);
            }}
          />
        ))}
      </div>
    </Overlay>
  );
}

export default OnlineHub;
