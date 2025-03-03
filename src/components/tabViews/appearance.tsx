import { useContext, useState } from "react";
import { SketchPicker } from 'react-color';
import { EngineContext } from "../../services/globals";

function Appearance() {
  const { units, updateUnits } = useContext(EngineContext);
  return (
    <div className="items-center flex h-full">
      <SketchPicker color={units.engineColour} onChange={(e: any) => {
        updateUnits({
            ...units,
            engineColour: e.hex,
        })
        }}/>
    </div>
  );
}

export default Appearance;
