import React, { useEffect, useState } from "react";
import { AppState, DummyEngine, EngineContext } from "./globals";
import RunCalculations from "./calculations";

interface Props {
  children: React.ReactNode;
}

export interface Units {
  powerUnit?: string;
  torqueUnit?: string;
  massUnit?: string;
}

export const DummyUnits = {
  powerUnit: "kW",
  torqueUnit: "Nm",
  massUnit: "kg",
};

/**
 * The main context provider
 */
export const EngineContextProvider: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const [state, setState] = useState<AppState>({
    engine: DummyEngine,
    updateState: () => {},
    units: DummyUnits,
    updateUnits: () => {},
  });

  const updateState = (newState: Partial<AppState>) => {
    setState((prevState) => {
      return {
        ...prevState,
        engine: {
          ...prevState.engine,
          ...newState.engine,
        },
        ...newState,
      };
    });
  };

  const updateUnits = (newUnits: Partial<Units>) => {
    setState((prevState) => {
      return {
        ...prevState,
        units: {
          ...prevState.units,
          ...newUnits,
        },
      };
    });
  };

  useEffect(() => {
    RunCalculations(
      state.engine,
      state.updateState,
      state.units,
      state.updateUnits
    );
  }, [state.engine, state.updateState, state.units, state.updateUnits]);

  return (
    <EngineContext.Provider value={{ ...state, updateState, updateUnits }}>
      {props.children}
    </EngineContext.Provider>
  );
};
