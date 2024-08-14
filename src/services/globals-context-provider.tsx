import React, { useEffect, useState } from "react";
import { AppState, DummyEngine, EngineContext } from "./globals";
import RunCalculations from "./calculations";

interface Props {
  children: React.ReactNode;
}

/**
 * The main context provider
 */
export const EngineContextProvider: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  /**
   * Using react hooks, set the default state
   */
  const [state, setState] = useState<AppState>({
    engine: DummyEngine,
    updateState: () => {},
  });

  /**
   * Declare the update state method that will handle the state values
   */
  const updateState = (newState: Partial<AppState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  useEffect(() => {
    RunCalculations(state.engine, state.updateState);
  }, [state]);

  /**
   * Context wrapper that will provider the state values to all its children nodes
   */
  return (
    <EngineContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </EngineContext.Provider>
  );
};
