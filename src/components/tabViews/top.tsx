// Import necessary modules and components
import { useContext } from "react";
import RunCalculations from "../../services/calculations";
import { EngineContext } from "../../services/globals";
import TabOptionData from "../../services/data";
import Options from "../ui/options";
import Slider from "../ui/slider";

function TopEnd() {
  // Use context to get updateState, engine, and units from EngineContext
  const { updateState, engine, units } = useContext(EngineContext);

  return (
    <div className="bottomEnd">
      {/* Column 1: Head Type */}
      <div className="column column1 overflow-y-auto">
        <div className="innerColumn w-full ">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Head Type</h2>
          </div>
          <div className="columnContents w-full blockTable materialColflex flex-row justify-between pl-3 pr-3 pt-1">
            <Options
              options={TabOptionData.headTypes.map((type) => type.name)}
              value={engine.headType.findName(TabOptionData.headTypes)}
              key="headType"
              uniqueKey="headType"
              onChange={(value) => {
                TabOptionData.headTypes.forEach((type) => {
                  if (type.name === value) {
                    updateState({
                      engine: {
                        ...engine,
                        headType: type.value,
                      },
                    });
                    RunCalculations(
                      {
                        ...engine,
                        headType: type.value,
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

      {/* Column 2: Head Material */}
      <div className="column column2 overflow-y-scroll overflow-x-scroll">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Head Material</h2>
          </div>
          <div className="columnContents w-full blockTable materialColflex flex-row justify-between pl-3 pr-3 pt-1">
            <Options
              options={TabOptionData.headMaterials.map(
                (material) => material.name
              )}
              value={engine.headMaterial.findName(TabOptionData.headMaterials)}
              uniqueKey="headMaterial"
              onChange={(value) => {
                TabOptionData.headMaterials.forEach((type) => {
                  if (type.name === value) {
                    updateState({
                      engine: {
                        ...engine,
                        headMaterial: type.value,
                      },
                    });
                    RunCalculations(
                      {
                        ...engine,
                        headMaterial: type.value,
                      },
                      updateState,
                      units
                    );
                  }
                });
              }}
            />
            <div>
              {/* Slider for RPM Limit */}
              <Slider
                label={"RPM Limit: " + engine.rpmLimit.toString()}
                value={engine.rpmLimit}
                max={10000}
                min={1000}
                step={100}
                onChange={(value) => {
                  const newEngine = {
                    ...engine,
                    rpmLimit: value,
                  };
                  updateState({ engine: newEngine });
                  RunCalculations(newEngine, updateState, units);
                }}
              />
              {/* Slider for Compression Ratio */}
              <Slider
                label={
                  "Compression Ratio: " + engine.compressionRatio.toFixed(1).toString()
                }
                value={engine.compressionRatio}
                max={12}
                min={8}
                step={0.1}
                onChange={(value) => {
                  const newEngine = {
                    ...engine,
                    compressionRatio: value,
                  };
                  updateState({ engine: newEngine });
                  RunCalculations(newEngine, updateState, units);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Column 3: Exhaust Size */}
      <div className="column column3">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white ">
            <h2>Exhaust Size</h2>
          </div>
          <div className="columnContents w-full flex p-5 ">
            <div>
              <Slider
                label={engine.exhaustSize.toString() + " mm"}
                max={150}
                min={20}
                step={1}
                value={engine.exhaustSize}
                onChange={(value) => {
                  const newEngine = {
                    ...engine,
                    exhaustSize: value,
                  };
                  updateState({ engine: newEngine });
                  RunCalculations(newEngine, updateState, units);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the TopEnd component as default
export default TopEnd;