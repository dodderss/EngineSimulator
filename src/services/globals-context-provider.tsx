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
  const [state, setState] = useState<AppState>({
    engine: DummyEngine,
    updateState: () => {},
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

  useEffect(() => {
    RunCalculations(state.engine, state.updateState);
  }, [state.engine, state.updateState]);

  return (
    <EngineContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </EngineContext.Provider>
  );
};