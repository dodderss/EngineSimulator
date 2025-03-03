import React from "react";
import { CurrencyConversion, DummyCurrency, DummyUnits, Units } from "./globals-context-provider";
import TabOptionData from "./data";

/**
 * Represents the engine specifications.
 * @typedef {Object} Engine
 * @property {number} bore - Bore size in mm.
 * @property {number} stroke - Stroke size in mm.
 * @property {number} compressionRatio - Compression ratio of the engine.
 * @property {number} displacement - Displacement in cubic centimeters (cc).
 * @property {number} power - Maximum power in kilowatts (kW).
 * @property {number} torque - Maximum torque in Newton meters (Nm).
 * @property {number[]} powerList - Power curve at various RPMs.
 * @property {number[]} torqueList - Torque curve at various RPMs.
 * @property {number} rpmLimit - RPM limit for the engine.
 * @property {string} fuelQuality - Fuel quality required (octane rating).
 * @property {string} aspirationType - Type of aspiration: naturally aspirated ('na') or turbocharged.
 * @property {string} engineType - Engine configuration type (e.g., Inline 'i', V-type).
 * @property {number} engineCylinders - Number of engine cylinders.
 * @property {number} boostPressure - Boost pressure in bars (if turbocharged).
 * @property {number} boostProviderSize - Size of the turbocharger in mm (if applicable).
 * @property {number} exhaustSize - Size of the exhaust in mm.
 * @property {number} engineWeight - Weight of the engine in kg.
 * @property {number} enginePrice - Price of the engine in the chosen currency (e.g., GBP).
 * @property {string} engineName - Name of the engine.
 * @property {string} fileName - File name for saving engine data.
 * @property {string} filePath - File path for saving engine data.
 * @property {string} blockMaterial - Material used for the engine block (e.g., Aluminum, Cast Iron).
 * @property {string} headMaterial - Material used for the engine head (e.g., Aluminum, Cast Iron).
 * @property {string} pistonMaterial - Material used for the pistons (e.g., Forged Steel, Aluminum Alloy).
 * @property {string} headType - Type of head used (e.g., DOHC, SOHC).
 * @property {string} intakeType - Type of intake system (e.g., Mechanical Injection).
 * @property {boolean} vvl - Indicates whether the engine uses Variable Valve Lift (VVL).
 * @property {boolean} vvt - Indicates whether the engine uses Variable Valve Timing (VVT).
 * @property {number} vvlRpm - RPM at which VVL is activated.
 * @property {number} volumetricEfficiency - Volumetric efficiency of the engine (percentage).
 * @property {number} mechanicalEfficiency - Mechanical efficiency of the engine (percentage).
 * @property {number} totalEfficiency - Total efficiency of the engine (percentage).
 * @property {number} engineLength - Engine length in mm.
 * @property {number} engineWidth - Engine width in mm.
 * @property {number} engineHeight - Engine height in mm.
 */

export interface Engine {
  /** Bore size in mm. */
  bore: number;

  /** Stroke size in mm. */
  stroke: number;

  /** Compression ratio of the engine. */
  compressionRatio: number;

  /** Displacement in cubic centimeters (cc). */
  displacement: number;

  /** Maximum power in kilowatts (kW). */
  power: number;

  /** Maximum torque in Newton meters (Nm). */
  torque: number;

  /** Power curve at various RPMs. */
  powerList: number[];

  /** Torque curve at various RPMs. */
  torqueList: number[];

  /** RPM limit for the engine. */
  rpmLimit: number;

  /** Fuel quality required (octane rating). */
  fuelQuality: string;

  /** Type of aspiration: naturally aspirated ('na') or turbocharged. */
  aspirationType: string;

  /** Engine configuration type (e.g., Inline 'i', V-type). */
  engineType: string;

  /** Number of engine cylinders. */
  engineCylinders: number;

  /** Boost pressure in bars (if turbocharged). */
  boostPressure: number;

  /** Size of the turbocharger in mm (if applicable). */
  boostProviderSize: number;

  /** Size of the exhaust in mm. */
  exhaustSize: number;

  /** Weight of the engine in kg. */
  engineMass: number;

  /** Price of the engine in the chosen currency (e.g., GBP). */
  enginePrice: number;

  /** Name of the engine. */
  engineName: string;

  /** File name for saving engine data. */
  fileName: string;

  /** File path for saving engine data. */
  filePath: string;

  /** Material used for the engine block (e.g., Aluminum, Cast Iron). */
  blockMaterial: string;

  /** Material used for the engine head (e.g., Aluminum, Cast Iron). */
  headMaterial: string;

  /** Material used for the pistons (e.g., Forged Steel, Aluminum Alloy). */
  pistonMaterial: string;

  /** Type of head used (e.g., DOHC, SOHC). */
  headType: string;

  /** Type of intake system (e.g., Mechanical Injection). */
  intakeType: string;

  /** Indicates whether the engine uses Variable Valve Lift (VVL). */
  vvl: boolean;

  /** Indicates whether the engine uses Variable Valve Timing (VVT). */
  vvt: boolean;

  /** RPM at which VVL is activated. */
  vvlRpm: number;

  /** Volumetric efficiency of the engine (percentage). */
  volumetricEfficiency: number;

  /** Mechanical efficiency of the engine (percentage). */
  mechanicalEfficiency: number;

  /** Total efficiency of the engine (percentage). */
  totalEfficiency: number;

  /** Engine length in mm. */
  engineLength: number;

  /** Engine width in mm. */
  engineWidth: number;

  /** Engine height in mm. */
  engineHeight: number;
}

export const DummyEngine: Engine = {
  bore: 84, // Default to 84 mm
  stroke: 90, // Default to 90 mm
  compressionRatio: 11, // Default to 11:1
  displacement: 2979, // Default to 2979 cc
  power: 150, // Default to 150 kW
  torque: 200, // Default to 200 Nm
  powerList: [], // Default to empty array
  torqueList: [], // Default to empty array
  rpmLimit: 7000, // Default to 7000 rpm
  fuelQuality: "95", // Default to 95 octane
  aspirationType: "na", // Default to naturally aspirated
  engineType: "i", // Default to Inline
  engineCylinders: 6, // Default to 6 cylinders
  boostPressure: 0, // Default to 0 bar (no turbo)
  boostProviderSize: 0, // Default to 0 mm
  exhaustSize: 30, // Default to 30 mm
  engineMass: 150, // Default to 150 kg
  enginePrice: 500, // Default to 500 GBP
  engineName: "My Engine", // Default to "My Engine"
  fileName: "/My Engine.engine", // Default to "/My Engine.engine"
  filePath: "", // Default to ""
  blockMaterial: "castIron", // Default to Cast Iron
  headMaterial: "castIron", // Default to Cast Iron
  pistonMaterial: "aluminiumAlloy", // Default to Aluminum Alloy
  headType: "dohc", // Default to DOHC
  intakeType: "mechInj", // Mechanical Injection
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
  currency: CurrencyConversion;
  updateCurrency: (newCurrency: Partial<CurrencyConversion>) => void;
}

/**
 * Default application state
 */
const defaultState: AppState = {
  engine: DummyEngine,
  updateState: (newState?: Partial<AppState>) => {},
  units: DummyUnits,
  updateUnits: (newUnits?: Partial<Units>) => {},
  currency: DummyCurrency,
  updateCurrency: (newCurrency?: Partial<CurrencyConversion>) => {},
};

/**
 * Type guard for Engine
 * @param obj
 * @returns boolean
 * @example
 * if (isEngine(obj)) {
 *  // obj is Engine
 * } else {
 *  // obj is not Engine
 * }
 */
export function isEngine(obj: any): boolean {
  if (typeof obj !== "object" || obj === null) {
    console.log("obj is not a valid object");
    return false;
  }
  if (typeof obj.bore !== "number") {
    console.log("bore");
    return false;
  } else if (obj.bore > 120 || obj.bore < 55) {
    console.log("bore out of range");
    return false;
  }
  if (typeof obj.stroke !== "number") {
    console.log("stroke");
    return false;
  } else if (obj.stroke > 120 || obj.stroke < 55) {
    console.log("stroke out of range");
    return false;
  }
  if (typeof obj.compressionRatio !== "number") {
    console.log("compressionRatio");
    return false;
  } else if (obj.compressionRatio < 8 || obj.compressionRatio > 16) {
    console.log("compressionRatio out of range");
    return false;
  }
  if (typeof obj.displacement !== "number") {
    console.log("displacement");
    return false;
  } else if (obj.displacement < 0) {
    console.log("displacement out of range");
    return false;
  }
  if (typeof obj.power !== "number") {
    console.log("power");
    return false;
  } else if (obj.power < 0) {
    console.log("power out of range");
    return false;
  }
  if (typeof obj.torque !== "number") {
    console.log("torque");
    return false;
  } else if (obj.torque < 0) {
    console.log("torque out of range");
    return false;
  }
  if (!Array.isArray(obj.powerList)) {
    console.log("powerList is not an array");
    return false;
  }
  if (!obj.powerList.every((item: any) => typeof item === "number")) {
    console.log("powerList contains non-number");
    return false;
  }
  if (!Array.isArray(obj.torqueList)) {
    console.log("torqueList is not an array");
    return false;
  }
  if (!obj.torqueList.every((item: any) => typeof item === "number")) {
    console.log("torqueList contains non-number");
    return false;
  }
  if (typeof obj.rpmLimit !== "number") {
    console.log("rpmLimit");
    return false;
  } else if (obj.rpmLimit < 3000 || obj.rpmLimit > 10000) {
    console.log("rpmLimit out of range");
    return false;
  }
  if (typeof obj.fuelQuality !== "string") {
    console.log("fuelQuality");
    return false;
  } else if (TabOptionData.fuelQualities.some(fuel => fuel.value === obj.fuelQuality)) {
    console.log("fuelQuality out of range");
    return false;
  }
  if (typeof obj.aspirationType !== "string") {
    console.log("aspirationType");
    return false;
  } else if (TabOptionData.aspirationTypes.some(aspiration => aspiration.value === obj.aspirationType)) {
    console.log("aspirationType out of range");
    return false;
  }
  if (typeof obj.engineType !== "string") {
    console.log("engineType");
    return false;
  } else if (TabOptionData.blockTypes.some(block => block.value === obj.block)) {
    console.log("engineType out of range");
    return false;
  }
  if (typeof obj.engineCylinders !== "number") {
    console.log("engineCylinders");
    return false;
  } else if (obj.engineCylinders < 3 || obj.engineCylinders > 12) {
    console.log("engineCylinders out of range");
    return false;
  }
  if (typeof obj.boostPressure !== "number") {
    console.log("boostPressure");
    return false;
  } else if (obj.boostPressure < 0 || obj.boostPressure > 3) {
    console.log("boostPressure out of range");
    return false;
  }
  if (typeof obj.boostProviderSize !== "number") {
    console.log("boostProviderSize");
    return false;
  }
  if (typeof obj.exhaustSize !== "number") {
    console.log("exhaustSize");
    return false;
  }
  if (typeof obj.engineMass !== "number") {
    console.log("engineMass");
    return false;
  }
  if (typeof obj.enginePrice !== "number") {
    console.log("enginePrice");
    return false;
  }
  if (typeof obj.engineName !== "string") {
    console.log("engineName");
    return false;
  }
  if (typeof obj.fileName !== "string") {
    console.log("fileName");
    return false;
  }
  if (typeof obj.filePath !== "string") {
    console.log("filePath");
    return false;
  }
  if (typeof obj.blockMaterial !== "string") {
    console.log("blockMaterial");
    return false;
  } else if (TabOptionData.blockMaterials.some(material => material.value === obj.blockMaterial)) {
    console.log("blockMaterial out of range");
    return false;
  }
  if (typeof obj.headMaterial !== "string") {
    console.log("headMaterial");
    return false;
  } else if (TabOptionData.headMaterials.some(material => material.value === obj.headMaterial)) {
    console.log("headMaterial out of range");
    return false;
  }
  if (typeof obj.pistonMaterial !== "string") {
    console.log("pistonMaterial");
    return false;
  } else if (TabOptionData.pistonMaterials.some(material => material.value === obj.pistonMaterial)) {
    console.log("pistonMaterial out of range");
    return false;
  }
  if (typeof obj.headType !== "string") {
    console.log("headType");
    return false;
  } else if (TabOptionData.headTypes.some(type => type.value === obj.headType)) {
    console.log("headType out of range");
    return false;
  }
  if (typeof obj.intakeType !== "string") {
    console.log("intakeType");
    return false;
  } else if (TabOptionData.intakeTypes.some(type => type.value === obj.intakeType)) {
    console.log("intakeType out of range");
    return false;
  }
  if (typeof obj.vvl !== "boolean") {
    console.log("vvl");
    return false;
  }
  if (typeof obj.vvt !== "boolean") {
    console.log("vvt");
    return false;
  }
  if (typeof obj.vvlRpm !== "number") {
    console.log("vvlRpm");
    return false;
  } else if (obj.vvlRpm < 1000 || obj.vvlRpm > 7000) {
    console.log("vvlRpm out of range");
    return false;
  }
  if (typeof obj.volumetricEfficiency !== "number") {
    console.log("volumetricEfficiency");
    return false;
  }
  if (typeof obj.mechanicalEfficiency !== "number") {
    console.log("mechanicalEfficiency");
    return false;
  }
  if (typeof obj.totalEfficiency !== "number") {
    console.log("totalEfficiency");
    return false;
  }
  if (typeof obj.engineLength !== "number") {
    console.log("engineLength");
    return false;
  }
  if (typeof obj.engineWidth !== "number") {
    console.log("engineWidth");
    return false;
  }
  if (typeof obj.engineHeight !== "number") {
    console.log("engineHeight");
    return false;
  }

  return true;
}

/**
 * Creating the Application state context for the provider
 */
export const EngineContext = React.createContext<AppState>(defaultState);
