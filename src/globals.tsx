import React from "react";

export interface Engine {
  bore?: number;
  stroke?: number;
  compressionRatio?: number;
  displacement?: number;
  power?: number;
  torque?: number;
  rpmLimit?: number;
  fuelQuality?: number;
  fuelType?: string;
  turbo?: boolean;
  engineType?: string;
  engineCylinders?: number;
  turboPressure?: number;
  exhaustSize?: number;
  engineWeight?: number;
  enginePrice?: number;
  engineName?: string;
  fileName?: string;
  blockMaterial?: string;
  headMaterial?: string;
  pistonMaterial?: string;
  crankshaftMaterial?: string;
  valveMaterial?: string;
  headType?: string;
  vvl?: boolean;
  vvt?: boolean;
  volumetricEfficiency?: number;
  mechanicalEfficiency?: number;
  totalEfficiency?: number;
  engineLength?: number;
  engineWidth?: number;
  engineHeight?: number;
  headColour?: string;
  blockColour?: string;
  valveCoverColour?: string;
  turboColour?: string;
  headDecorativeMaterial?: string;
  blockDecorativeMaterial?: string;
  valveCoverDecorativeMaterial?: string;
  turboDecorativeMaterial?: string;
}

export const DummyEngine: Engine = {
  bore: 86, // Default to 86 mm
  stroke: 86, // Default to 86 mm
  compressionRatio: 10, // Default to 10:1
  displacement: 1998, // Default to 1998 cc
  power: 150, // Default to 150 hp
  torque: 200, // Default to 200 Nm
  rpmLimit: 6500, // Default to 6500 rpm
  fuelQuality: 95, // Default to 95 octane
  fuelType: "Petrol", // Default to Petrol
  turbo: false, // Default to naturally aspirated
  engineType: "Inline-4", // Default to Inline-4
  engineCylinders: 4, // Default to 4 cylinders
  turboPressure: 0, // Default to 0 bar (no turbo)
  exhaustSize: 2.5, // Default to 2.5 inches
  engineWeight: 150, // Default to 150 kg
  enginePrice: 5000, // Default to 5000 USD
  engineName: "", // Default to empty string
  fileName: "", // Default to empty string
  blockMaterial: "Aluminum", // Default to Aluminum
  headMaterial: "Aluminum", // Default to Aluminum
  pistonMaterial: "Forged Steel", // Default to Forged Steel
  crankshaftMaterial: "Forged Steel", // Default to Forged Steel
  valveMaterial: "Titanium", // Default to Titanium
  headType: "DOHC", // Default to DOHC
  vvl: false, // Default to no VVL
  vvt: true, // Default to VVT enabled
  volumetricEfficiency: 90, // Default to 90%
  mechanicalEfficiency: 85, // Default to 85%
  totalEfficiency: 75, // Default to 75%
  engineLength: 600, // Default to 600 mm
  engineWidth: 600, // Default to 600 mm
  engineHeight: 600, // Default to 600 mm
  headColour: "Silver", // Default to Silver
  blockColour: "Black", // Default to Black
  valveCoverColour: "Red", // Default to Red
  turboColour: "Silver", // Default to Silver
  headDecorativeMaterial: "Carbon Fiber", // Default to Carbon Fiber
  blockDecorativeMaterial: "Carbon Fiber", // Default to Carbon Fiber
  valveCoverDecorativeMaterial: "Carbon Fiber", // Default to Carbon Fiber
  turboDecorativeMaterial: "Carbon Fiber", // Default to Carbon Fiber
};

export interface AppState {
  engine?: Engine;
  updateState: (newState: Partial<AppState>) => void;
}

/**
 * Default application state
 */
const defaultState: AppState = {
  engine: {},
  updateState: (newState?: Partial<AppState>) => {},
};

/**
 * Creating the Application state context for the provider
 */
export const EngineContext = React.createContext<AppState>(defaultState);
