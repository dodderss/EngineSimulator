import React from "react";
import { DummyUnits, Units } from "./globals-context-provider";

export interface Engine {
  bore: number; 
  stroke: number;
  compressionRatio: number;
  displacement: number;
  power: number;
  torque: number;
  powerList: number[];
  torqueList: number[];
  rpmLimit: number;
  fuelQuality: string;
  aspirationType: string;
  engineType: string;
  engineCylinders: number;
  boostPressure: number;
  boostProviderSize: number;
  exhaustSize: number;
  engineWeight: number;
  enginePrice: number;
  engineName: string;
  fileName: string;
  filePath: string;
  blockMaterial: string;
  headMaterial: string;
  pistonMaterial: string;
  headType: string;
  intakeType: string;
  vvl: boolean;
  vvt: boolean;
  vvlRpm: number;
  volumetricEfficiency: number;
  mechanicalEfficiency: number;
  totalEfficiency: number;
  engineLength: number;
  engineWidth: number;
  engineHeight: number;
}

export const DummyEngine: Engine = {
  bore: 84, // Default to 84 mm
  stroke: 90, // Default to 90 mm
  compressionRatio: 11, // Default to 11:1
  displacement: 2979, // Default to 2979 cc
  power: 150, // Default to 150 kw
  torque: 200, // Default to 200 Nm
  powerList: [], // Default to empty array
  torqueList: [], // Default to empty array
  rpmLimit: 7000, // Default to 10000 rpm
  fuelQuality: "95", // Default to 95 octane
  aspirationType: "na", // Default to naturally aspirated
  engineType: "i", // Default to Inline
  engineCylinders: 6, // Default to 6 cylinders
  boostPressure: 0, // Default to 0 bar (no turbo)
  boostProviderSize: 0, // Default to 0mm
  exhaustSize: 30, // Default to 30mm
  engineWeight: 150, // Default to 150 kg
  enginePrice: 500, // Default to 5000 GBP
  engineName: "My Engine", // Default to "My Engine"
  // eslint-disable-next-line no-useless-escape
  fileName: "/My Engine.engine", // Default to "/My Engine.engine"
  filePath: "", // Default to ""
  blockMaterial: "castIron", // Default to Aluminum
  headMaterial: "castIron", // Default to Aluminum
  pistonMaterial: "aluminiumAlloy", // Default to Forged Steel
  headType: "dohc", // Default to DOHC
  intakeType: "mechInj",
  vvl: false, // Default to no VVL
  vvt: false, // Default to no VVT
  vvlRpm: 4200, // Default to 4200 rpm
  volumetricEfficiency: 60, // Default to 60%
  mechanicalEfficiency: 40, // Default to 40%
  totalEfficiency: 30, // Default to 30%
  engineLength: 600, // Default to 600 mm
  engineWidth: 600, // Default to 600 mm
  engineHeight: 600, // Default to 600 mm
};

export interface AppState {
  engine: Engine;
  updateState: (newState: Partial<AppState>) => void;
  units: Units;
  updateUnits: (newUnits: Partial<Units>) => void;
}

/**
 * Default application state
 */
const defaultState: AppState = {
  engine: DummyEngine,
  updateState: (newState?: Partial<AppState>) => {},
  units: DummyUnits,
  updateUnits: (newUnits?: Partial<Units>) => {},
};

/**
 * Creating the Application state context for the provider
 */
export const EngineContext = React.createContext<AppState>(defaultState);
