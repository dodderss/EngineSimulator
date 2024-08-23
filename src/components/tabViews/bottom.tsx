import Slider from "../ui/slider";
import "./tabElement.css";
import { useContext, useState } from "react";
import { EngineContext } from "../../services/globals";
import Options from "../ui/options";
import RunCalculations from "../../services/calculations";

function BottomEnd() {
  const [, setLayout] = useState("Inline");

  const { updateState, engine } = useContext(EngineContext);
  return (
    <div className="bottomEnd">
      <div className="column column1 overflow-y-auto">
        <div className="innerColumn w-full h-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Engine Block</h2>
          </div>
          <div className="columnContents w-full h-full">
            <div className="blockTable h-full">
              <div className="materialCol w-full border-r-white border-2 border-t-0 border-l-0">
                <div className="blockHeader">
                  <p>Material</p>
                </div>
              </div>
              <div className="layoutCol w-full h-full ">
                <div className="blockHeader">
                  <p>Layout</p>
                </div>
                <div className="h-full flex flex-row justify-between">
                  <div className="pl-3 pr-3 pt-1">
                    <Options
                      options={["Inline", "V 60°", "V 90°"]}
                      value="Inline"
                      onChange={(value) => {
                        setLayout(value);
                      }}
                    />
                  </div>

                  <div className="border-l-2 border-white  pl-3 pr-3 pt-1">
                    <Options
                      options={["3", "4", "5", "6"]}
                      value="6"
                      onChange={(value) => setLayout(value)}
                    />
                  </div>
                </div>
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
                initialValue={engine.bore}
                onChange={(value) => {
                  const newEngine = {
                    ...engine,
                    bore: value,
                  };
                  updateState({ engine: newEngine });
                  RunCalculations(newEngine, updateState);
                }}
              />
              <Slider
                label="Stroke"
                max={150}
                min={50}
                step={0.5}
                initialValue={engine.stroke}
                onChange={(value) => {
                  const newEngine = {
                    ...engine,
                    stroke: value,
                  };
                  updateState({ engine: newEngine });
                  RunCalculations(newEngine, updateState);
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
