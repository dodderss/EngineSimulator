import { Dispatch, SetStateAction, useContext } from "react";
import Overlay from "./ui/overlay";
import Button from "./ui/button";
import { addEngine, getEngines } from "../services/onlineServices";
import { EngineContext } from "../services/globals";

interface OnlineHubProps {
  isOverlayOpen: boolean;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
}

function OnlineHub({ isOverlayOpen, setIsOverlayOpen }: OnlineHubProps) {
  const { engine } = useContext(EngineContext);
  return (
    <Overlay
      isOverlayOpen={isOverlayOpen}
      setIsOverlayOpen={setIsOverlayOpen}
      title="Enginuity Hub"
      size="large"
    >
      <Button name="Test add engine" onClick={() => {
        addEngine(engine);
      }} key={"testbutton"} />
      <Button name="Test get engines" onClick={() => {
        getEngines();
      } } key={"testbutton2"} />
    </Overlay>
  );
}

export default OnlineHub;
