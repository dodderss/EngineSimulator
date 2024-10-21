import { useContext } from "react";
import RunCalculations from "../../services/calculations";
import { EngineContext } from "../../services/globals";
import TabOptionData from "../../services/data";
import Options from "../ui/options";
import Slider from "../ui/slider";

function Aspiration() {
  const { updateState, engine, units } = useContext(EngineContext);
  return (
    <div className="bottomEnd">
      <div className="column column1 overflow-y-auto">
        <div className="innerColumn w-full h-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Aspiration Type</h2>
          </div>
          <div className="columnContents w-full blockTable materialColflex flex-row justify-between pl-3 pr-3 pt-1">
            <Options
              options={TabOptionData.aspirationTypes.map(
                (aspiration) => aspiration.name
              )}
              value={engine.aspirationType.findName(
                TabOptionData.aspirationTypes
              )}
              key="aspirationType"
              uniqueKey="aspirationType"
              onChange={(value) => {
                TabOptionData.aspirationTypes.forEach((type) => {
                  if (type.name === value) {
                    updateState({
                      engine: {
                        ...engine,
                        aspirationType: type.value,
                      },
                    });
                    RunCalculations(
                      {
                        ...engine,
                        aspirationType: type.value,
                      },
                      updateState,
                      units
                    );
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
      {engine.aspirationType !== "na" ? (
        <>
          <div className="column column2 overflow-y-scroll overflow-x-scroll">
            <div className="innerColumn w-full">
              <div className="columnHeader w-full border-b-2 border-white ">
                <h2>Boost Pressure</h2>
              </div>
              <div className="columnContents w-full flex p-5 ">
                <div>
                  <Slider
                    label={
                      (engine.boostPressure * 14.504).toFixed(0).toString() +
                      " psi"
                    }
                    max={50}
                    min={0}
                    step={0.5}
                    value={engine.boostPressure}
                    onChange={(value) => {
                      const newEngine = {
                        ...engine,
                        boostPressure: value / 14.504,
                      };
                      updateState({ engine: newEngine });
                      RunCalculations(newEngine, updateState, units);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column column3">
            <div className="innerColumn w-full">
              <div className="columnHeader w-full border-b-2 border-white ">
                <h2>Size</h2>
              </div>
              <div className="columnContents w-full flex p-5 ">
                <div>
                  <Slider
                    label={engine.boostProviderSize.toString() + " mm"}
                    max={500}
                    min={0}
                    step={1}
                    value={engine.boostProviderSize}
                    onChange={(value) => {
                      const newEngine = {
                        ...engine,
                        boostProviderSize: value,
                      };
                      updateState({ engine: newEngine });
                      RunCalculations(newEngine, updateState, units);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Aspiration;
