import { useContext } from "react";
import RunCalculations from "../../services/calculations";
import { EngineContext } from "../../services/globals";
import TabOptionData from "../../services/tabOptionData";
import Options from "../ui/options";
import Slider from "../ui/slider";

function TopEnd() {
  const { updateState, engine } = useContext(EngineContext);

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
      <div className="column column1 overflow-y-auto">
        <div className="innerColumn w-full ">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Head Type</h2>
          </div>
          <div className="columnContents w-full blockTable materialColflex flex-row justify-between pl-3 pr-3 pt-1">
            <Options
              options={TabOptionData.headTypes.map(
                (type) => type.name
              )}
              value={
                findIndexByValue(
                  TabOptionData.headTypes,
                  engine.headType
                )
              }
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
                      updateState
                    );
                  }
                });
              }}
            />
          </div>
        </div>
      </div>

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
              value={
                findIndexByValue(
                  TabOptionData.headMaterials,
                  engine.headMaterial
                )
              }
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
                      updateState
                    );
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
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
                initialValue={engine.exhaustSize}
                onChange={(value) => {
                  const newEngine = {
                    ...engine,
                    exhaustSize: value,
                  };
                  updateState({ engine: newEngine });
                  RunCalculations(newEngine, updateState);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopEnd;
