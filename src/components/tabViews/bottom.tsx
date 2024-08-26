import Slider from "../ui/slider";
import "./tabElement.css";
import { useContext } from "react";
import { EngineContext } from "../../services/globals";
import Options from "../ui/options";
import RunCalculations from "../../services/calculations";
import TabOptionData from "../../services/tabOptionData";

function BottomEnd() {
  const { updateState, engine } = useContext(EngineContext);

  const handleOptionChange = (options: any[], value: string, key: string) => {
    options.forEach((type: { name: any; value: any }) => {
      if (type.name === value) {
        const newEngine = { ...engine, [key]: type.value };
        updateState({ engine: newEngine });
        RunCalculations(newEngine, updateState);
      }
    });
  };

  const findIndexByValue = (
    dataList: { name: string; value: any; [key: string]: any }[],
    targetValue: string
  ): number => {
    for (let index = 0; index < dataList.length; index++) {
      if (dataList[index].value === targetValue) {
        return index;
      }
    }
    return -1; // Return -1 if the value is not found
  };

  return (
    <div className="bottomEnd">
      <div className="column column1">
        <div className="innerColumn w-full  overflow-y-auto">
          <div className="columnHeader w-full border-b-2 border-white ">
            <h2>Engine Block</h2>
          </div>
          <div className="columnContents w-full ">
            <div className="blockTable">
              <div className="materialCol w-full border-r-white border-r-2">
                <div className="blockHeader">
                  <p>Material</p>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div className="pl-3 pr-3 pt-1 box-border">
                    <Options
                      options={TabOptionData.blockMaterials.map(
                        (material) => material.name
                      )}
                      value={findIndexByValue(
                        TabOptionData.blockMaterials,
                        engine.blockMaterial
                      )}
                      onChange={(value) =>
                        handleOptionChange(
                          TabOptionData.blockMaterials,
                          value,
                          "blockMaterial"
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="materialCol w-full">
                <div className="blockHeader">
                  <p>Layout</p>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div className="pl-3 pr-3 pt-1 box-border">
                    <Options
                      options={TabOptionData.blockTypes.map(
                        (type) => type.name
                      )}
                      value={findIndexByValue(
                        TabOptionData.blockTypes,
                        engine.engineType
                      )}
                      onChange={(value) =>
                        handleOptionChange(
                          TabOptionData.blockTypes,
                          value,
                          "engineType"
                        )
                      }
                    />
                  </div>
                  <div className="border-l-2 border-white pl-3 pr-3 pt-1 box-border">
                    <Options
                      options={
                        engine.engineType === "i"
                          ? TabOptionData.inlineBlockTypes.map(
                              (type) => type.name
                            )
                          : engine.engineType === "v60"
                          ? TabOptionData.v60BlockTypes.map((type) => type.name)
                          : TabOptionData.v90BlockTypes.map((type) => type.name)
                      }
                      value={
                        engine.engineType === "i"
                          ? findIndexByValue(
                              TabOptionData.inlineBlockTypes,
                              engine.engineCylinders.toString()
                            )
                          : engine.engineType === "v60"
                          ? findIndexByValue(
                              TabOptionData.v60BlockTypes,
                              engine.engineCylinders.toString()
                            )
                          : findIndexByValue(
                              TabOptionData.v90BlockTypes,
                              engine.engineCylinders.toString()
                            )
                      }
                      onChange={(value) => {
                        const blockTypes =
                          engine.engineType === "i"
                            ? TabOptionData.inlineBlockTypes
                            : engine.engineType === "v60"
                            ? TabOptionData.v60BlockTypes
                            : TabOptionData.v90BlockTypes;
                        handleOptionChange(
                          blockTypes,
                          value,
                          "engineCylinders"
                        );
                      }}
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
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Capacity & Displacement</h2>
          </div>
          <div className="columnContents w-full flex p-5">
            <div>
              <Slider
                label={"Bore: " + engine.bore.toString() + "mm"}
                max={150}
                min={50}
                step={0.5}
                initialValue={engine.bore}
                onChange={(value) => {
                  const newEngine = { ...engine, bore: value };
                  updateState({ engine: newEngine });
                  RunCalculations(newEngine, updateState);
                }}
              />
              <Slider
                label={"Stroke: " + engine.stroke.toString() + "mm"}
                max={150}
                min={50}
                step={0.5}
                initialValue={engine.stroke}
                onChange={(value) => {
                  const newEngine = { ...engine, stroke: value };
                  updateState({ engine: newEngine });
                  RunCalculations(newEngine, updateState);
                }}
              />
            </div>
            <div>
              <h2 className="text-center">Displacement:</h2>
              <h2 className="text-center">{engine.displacement.toFixed(2)}L</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="column column3">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Piston Material</h2>
          </div>
          <div className="flex flex-row justify-between">
            <div className="pl-3 pr-3 pt-1">
              <Options
                options={TabOptionData.pistonMaterials.map(
                  (material) => material.name
                )}
                value={findIndexByValue(
                  TabOptionData.pistonMaterials,
                  engine.pistonMaterial
                )}
                onChange={(value) =>
                  handleOptionChange(
                    TabOptionData.pistonMaterials,
                    value,
                    "pistonMaterial"
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomEnd;
