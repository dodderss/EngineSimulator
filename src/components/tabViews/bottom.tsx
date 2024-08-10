import Slider from "../slider";
import "./tabElement.css";
import { useContext, useState } from "react";
import { EngineContext } from "../../globals";

function BottomEnd() {
  const [stroke, setStroke] = useState(0);

  const { updateState, engine } = useContext(EngineContext);
  return (
    <div className="bottomEnd">
      <div className="column column1">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h1 className="tabText">Engine Block</h1>
          </div>
          <div className="columnContents w-full">
            <div className="blockTable">
              <div className="blockCol border-r-2 border-white">
                <p>Material</p>
              </div>
              <div className="blockCol">
                <p>Layout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="column column2">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h1 className="tabText">Capacity & Displacement</h1>
          </div>
          <div className="columnContents w-full flex p-5">
            <div>
              <Slider
                label="Bore Diameter"
                max={150}
                min={50}
                step={0.5}
                value={engine?.bore || 0}
                onChange={(value) => {
                  updateState({
                    engine: {
                      ...engine,
                      bore: value,
                      displacement:
                        (Math.PI / 4) *
                        (value) ** 2 *
                        ((engine?.stroke || 0)/1000) *
                        (engine?.engineCylinders || 0),
                    },
                  });
                }}
              />
              <Slider
                label="Stroke"
                max={150}
                min={50}
                step={0.5}
                value={engine?.stroke || 0}
                onChange={(value) => {
                  updateState({
                    engine: {
                      ...engine,
                      stroke: value,
                      displacement:
                        (Math.PI / 4) *
                        ((engine?.bore || 0)) ** 2 *
                        (value/1000) *
                        (engine?.engineCylinders || 0),
                    },
                  });
                }}
              />
            </div>
            <div>
              <p>{engine!.bore}</p>
              <p>{engine!.stroke}</p>
              <p>{engine!.displacement?.toPrecision(5)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="column column3">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h1 className="tabText">Piston Material</h1>
          </div>
          <div className="columnContents w-full">
            <>hello</>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomEnd;
