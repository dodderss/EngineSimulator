import { useContext } from "react";
import RunCalculations from "../../services/calculations";
import { EngineContext } from "../../services/globals";
import TabOptionData from "../../services/tabOptionData";
import Options from "../ui/options";
import Slider from "../ui/slider";

function FuelAndTiming() {
  const { updateState, engine } = useContext(EngineContext);

  return (
    <div className="bottomEnd">
      <div className="column column1 overflow-y-auto">
        <div className="innerColumn w-full ">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Fuel Quality</h2>
          </div>
          <div className="columnContents w-full blockTable materialColflex flex-row justify-between pl-3 pr-3 pt-1">
            <Options
              options={TabOptionData.fuelQualities.map((type) => type.name)}
              value={engine.fuelQuality + " Octane"}
              key="fuelQuality"
              uniqueKey="fuelQuality"
              onChange={(value) => {
                TabOptionData.fuelQualities.forEach((type) => {
                  if (type.name === value) {
                    updateState({
                      engine: {
                        ...engine,
                        fuelQuality: type.value,
                      },
                    });
                    RunCalculations(
                      {
                        ...engine,
                        fuelQuality: type.value,
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

      <div className="column column2">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Variable Systems</h2>
          </div>
          <div className="columnContents w-full h-full overflow-hidden">
            <div className="blockTable h-full">
              <div className="materialCol w-full border-r-white border-2 border-t-0 border-l-0 border-b-0 h-full">
                <div className="blockHeader">
                  <p>VVT</p>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="pl-3 pr-3 pt-1">
                    <Options
                      options={["No", "Yes"]}
                      value={engine.vvt ? "Yes" : "No"}
                      uniqueKey="vvt"
                      onChange={(value) => {
                        updateState({
                          engine: {
                            ...engine,
                            vvt: value === "Yes" ? true : false,
                          },
                        });
                        RunCalculations(
                          {
                            ...engine,
                            vvt: value === "Yes" ? true : false,
                          },
                          updateState
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="layoutCol w-full ">
                <div className="blockHeader">
                  <p>VVL</p>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="pl-3 pr-3 pt-1 flex flex-col">
                    <Options
                      options={["No", "Yes"]}
                      value={engine.vvl ? "Yes" : "No"}
                      uniqueKey="vvl"
                      onChange={(value) => {
                        updateState({
                          engine: {
                            ...engine,
                            vvl: value === "Yes" ? true : false,
                          },
                        });
                        RunCalculations(
                          {
                            ...engine,
                            vvl: value === "Yes" ? true : false,
                          },
                          updateState
                        );
                      }}
                    />
                    <Slider
                      label={"RPM: " + engine.vvlRpm}
                      min={0}
                      max={8000}
                      step={10}
                      value={engine.vvlRpm}
                      onChange={(value) => {
                        updateState({
                          engine: {
                            ...engine,
                            vvlRpm: value,
                          },
                        });
                        RunCalculations(
                          {
                            ...engine,
                            vvlRpm: value,
                          },
                          updateState
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
      <div className="column column3">
        <div className="innerColumn w-full">
          <div className="columnHeader w-full border-b-2 border-white">
            <h2>Intake Type</h2>
          </div>
          <div className="columnContents w-full blockTable materialColflex flex-row justify-between pl-3 pr-3 pt-1">
            <Options
              options={TabOptionData.intakeTypes.map((type) => type.name)}
              value={engine.intakeType.findName(TabOptionData.intakeTypes)}
              uniqueKey="intakeType"
              onChange={(value) => {
                TabOptionData.intakeTypes.forEach((type) => {
                  if (type.name === value) {
                    updateState({
                      engine: {
                        ...engine,
                        intakeType: type.value,
                      },
                    });
                    RunCalculations(
                      {
                        ...engine,
                        intakeType: type.value,
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
    </div>
  );
}

export default FuelAndTiming;
