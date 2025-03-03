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
  currencyUnit?: string;
  engineColour?: string;
  simplifiedView?: boolean;
}

export interface CurrencyConversion {
  dollar?: number;
  euro?: number;
  yen?: number;
}

export const DummyUnits = {
  powerUnit: "kW",
  torqueUnit: "Nm",
  massUnit: "kg",
  currencyUnit: "£",
  engineColour: "#FFFFFF",
  simplifiedView: false,
};

export const DummyCurrency = {
  dollar: 1.5,
  euro: 1.5,
  yen: 150.0,
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
    currency: DummyCurrency,
    updateCurrency: () => {},
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

  const updateCurrency = (newCurrency: Partial<CurrencyConversion>) => {
    setState((prevState) => {
      return {
        ...prevState,
        currency: {
          ...prevState.currency,
          ...newCurrency,
        },
      };
    });
  };

  useEffect(() => {
    RunCalculations(state.engine, state.updateState, state.units);
  }, [state.engine, state.updateState, state.units, state.updateUnits]);

  return (
    <EngineContext.Provider
      value={{ ...state, updateState, updateUnits, updateCurrency }}
    >
      {props.children}
    </EngineContext.Provider>
  );
};
