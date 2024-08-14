import Slider from "../ui/slider";
import "./tabElement.css";
import { useContext, useState } from "react";
import { EngineContext } from "../../services/globals";
import Options from "../options";
import RunCalculations from "../../services/calculations";

function BottomEnd() {
  const [, setLayout] = useState("Inline");

  const { updateState, engine } = useContext(EngineContext);
  return (
    <div className="bottomEnd">
      <div className="column column1 overflow-y-auto">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Engine Block</h2>
          </div>
          <div className="columnContents w-full ">
            <div className="blockTable">
              <div className="materialCol w-full ">
                <div className="blockHeader border-r-2 border-white">
                  <p>Material</p>
                </div>
              </div>
              <div className="layoutCol w-full ">
                <div className="blockHeader">
                  <p>Layout</p>
                </div>
                <Options
                  options={["Inline", "V 60°", "V 90°"]}
                  value="Inline"
                  onChange={(value) => setLayout(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="column column2 overflow-y-scroll overflow-x-scroll">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white ">
            <h2>Capacity & Displacement</h2>
          </div>
          <div className="columnContents w-full flex p-5 ">
            <div>
              <Slider
                label="Bore Diameter"
                max={150}
                min={50}
                step={0.5}
                value={engine.bore}
                onChange={(value) => {
                  updateState({
                    engine: {
                      ...engine,
                      bore: value,
                      displacement:
                        (Math.PI / 4) *
                        value ** 2 *
                        (engine.stroke / 1000) *
                        engine.engineCylinders,
                    },
                  });
                  RunCalculations(engine, updateState);
                }}
              />
              <Slider
                label="Stroke"
                max={150}
                min={50}
                step={0.5}
                value={engine.stroke}
                onChange={(value) => {
                  updateState({
                    engine: {
                      ...engine,
                      stroke: value,
                      displacement:
                        (Math.PI / 4) *
                        engine.bore ** 2 *
                        (value / 1000) *
                        engine.engineCylinders,
                    },
                  });
                  RunCalculations(engine, updateState);
                }}
              />
            </div>
            <div>
              <p>{engine.bore}</p>
              <p>{engine.stroke}</p>
              <p>{engine.displacement.toPrecision(5)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="column column3">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Piston Material</h2>
          </div>
          <div className="columnContents w-full overflow-y-auto">
            <>hello</>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomEnd;
