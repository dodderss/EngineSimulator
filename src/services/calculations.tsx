import TabOptionData from "./data";
import { AppState, Engine } from "./globals";
import { Units } from "./globals-context-provider";

const RunCalculations = (
  engine: Engine,
  updateState: (newState: Partial<AppState>) => void,
  units: Units
) => {
  var rpm: number[] = [];

  for (let i = 10; i <= engine.rpmLimit; i += 10) {
    rpm.push(i);
  }

  var power: number[] = [];
  var torque: number[] = [];
  var ve: number[] = [];
  var losses: number[] = [];
  var netPower: number[] = [];
  var netTorque: number[] = [];
  var netUnitPower: number[] = [];
  var netUnitTorque: number[] = [];
  var vvlFactor: number[] = [];
  var vvtFactor: number[] = [];
  var mep: number[] = [];

  const displacement =
    engine.engineCylinders *
    (Math.PI / 4) *
    Math.pow(engine.bore, 2) *
    engine.stroke;
  engine.displacement = displacement / 1000000;

  // ---- Total Block Mass Calculation ---- //

  // Initialize mass effector for the block
  var totalBlockMassEffector = 1;

  // Find block type and material details
  var blockType = TabOptionData.blockTypes.find(
    (type) => type.value === engine.engineType
  );
  var blockMaterial = TabOptionData.blockMaterials.find(
    (type) => type.value === engine.blockMaterial
  );

  // Calculate block volume (using volumeEffector instead of densityEffector)
  var totalBlockVolume = blockType!.densityEffector * engine.displacement;

  // Calculate block mass without effectors (volume * density)
  var totalBlockMass = totalBlockVolume * blockMaterial!.density;

  // Apply intake type density effector
  TabOptionData.intakeTypes.forEach((type) => {
    if (type.value === engine.intakeType) {
      totalBlockMassEffector *= type.densityEffector;
    }
  });

  // Apply VVT and VVL effectors to the block mass
  totalBlockMassEffector *= engine.vvt ? 1.05 : 1; // VVT effector (5% increase if VVT is enabled)
  totalBlockMassEffector *= engine.vvl ? 1.1 : 1; // VVL effector (10% increase if VVL is enabled)

  // Final block mass after applying the effectors
  totalBlockMass *= totalBlockMassEffector;

  // ---- Total Head Mass Calculation ---- //

  // Initialize mass effector for the head
  var totalHeadMassEffector = 1;

  var headMaterial = TabOptionData.headMaterials.find(
    (type) => type.value === engine.headMaterial
  );

  // Ensure headType and headMaterial are valid

  // Calculate head volume (using head volume effector)
  let headVolume = blockType!.headMassEffector * engine.displacement;

  // Calculate head mass without effectors (volume * density)
  let headMass = headVolume * headMaterial!.density;

  // Apply intake type density effector
  TabOptionData.intakeTypes.forEach((type) => {
    if (type.value === engine.intakeType) {
      totalHeadMassEffector *= type.densityEffector;
    }
  });

  // Apply VVT and VVL effectors to the head mass
  totalHeadMassEffector *= engine.vvt ? 1.1 : 1; // VVT effector (10% increase if VVT is enabled)
  totalHeadMassEffector *= engine.vvl ? 1.2 : 1; // VVL effector (20% increase if VVL is enabled)

  // Final head mass after applying the effectors
  headMass *= totalHeadMassEffector;

  // ---- Total Engine Mass Calculation ---- //

  // Sum of block mass and head mass
  var totalMass = (totalBlockMass + headMass) / 150;

  // Output the result
  console.log("Total Engine Mass:", totalMass);

  // ---- Power/Torque Calculations ---- //

  rpm.forEach((currentRpm, index) => {
    // ---- Volume Efficiency ---- //
    ve.push(
      0.88 * (1 - Math.pow((currentRpm - 5000) / 5000, 2)) -
        0.03 * Math.log10(engine.displacement) +
        0.15 * ((engine.compressionRatio - 1) / (engine.compressionRatio + 1))
    );

    // = 0.88 * (1 - ((O603 - 5000) / 5000)^2) - 0.03 * LOG($M$3) + 0.15 * (($B$5 - 1) / ($B$5 + 1))

    // ---- VVT Factor ---- //
    vvtFactor.push(1 + (0.03 * (currentRpm - 1500)) / 1500);

    // =1+(0.05 * ([@RPM] - 2000) / 2000)

    // ---- VVL Factor ---- //
    if (currentRpm >= engine.vvlRpm) {
      vvlFactor.push(1 + (0.05 * (currentRpm - 2000)) / 2000);
    } else {
      vvlFactor.push(1);
    }
    // =1 + (0.03 * ([@RPM] - 1500) / 1500)

    // ---- MEP ---- //
    mep.push(
      (10.5 +
        (engine.compressionRatio - 8) * 0.5 +
        (engine.boostPressure - 1) * 2) *
        (engine.vvl ? vvlFactor[index] : 1) *
        (engine.vvt ? vvtFactor[index] : 1)
    );
    // =(10.5 + ($B$5 - 8) * 0.5 + ($M$4 - 1) * 2) * IF($B$10 = "y",  [@[VVL Factor]], 1) * IF($B$11 = "y",  [@[VVT Factor]], 1)
    // =(10.5 + (Compression Ratio - 8) * 0.5 + (Boost Pressure - 1) * 2 IF(VVL = "y", [@[VVL Factor]], 1) * IF(VVT) = "y",  [@[VVT Factor]], 1)))
    // (10.5 + (11 - 8) * 0.5 + (0 - 1) * 2)

    // ---- Power ---- //
    power.push(
      (engine.displacement * mep[index] * currentRpm * ve[index]) /
        (120 * Math.PI)
    );
    // =($M$3 * [@MEP] * O14 * R14)/(120*PI())

    // ---- Torque ---- //
    torque.push((power[index] * 9549) / currentRpm);
    // =([@Power]*9549)/[@RPM]

    // ---- Losses ---- //
    losses.push(0.001 * Math.pow(currentRpm, 1.2));
    // =0.001*[@RPM]^1.2

    // ---- Net Power ---- //
    netPower.push(
      (power[index] - losses[index] >= 0 ? power[index] - losses[index] : 0) *
        (engine.mechanicalEfficiency / 100)
    );

    netUnitPower.push(
      netPower[index] * (units.powerUnit === "kW" ? 1 : 1.3596216173)
    );
    // =IF([@Power]-[@Losses] >= 0, [@Power]-[@Losses], 0)

    // ---- Net Torque ---- //
    netTorque.push(
      ((netPower[index] * 9549) / currentRpm >= 0
        ? (netPower[index] * 9549) / currentRpm
        : 0) * (units.torqueUnit === "Nm" ? 1 : 0.7375621493)
    );

    netUnitTorque.push(
      netTorque[index] * (units.torqueUnit === "Nm" ? 1 : 0.7375621493)
    );
    // =IF(([@NetTorque] * 6000)/[@RPM]>=0, ([@NetTorque] * 9549)/[@RPM], 0)
  });

  // get max of power, torque and ve

  const maxPower = Math.max(...netUnitPower);
  const maxTorque = Math.max(...netUnitTorque);
  const maxVe = Math.max(...ve);
  console.log(maxVe);
  updateState({
    engine: {
      ...engine,
      power: maxPower,
      torque: maxTorque,
      volumetricEfficiency: maxVe,
      totalEfficiency: engine.mechanicalEfficiency * maxVe,
      engineMass: totalMass,
      powerList: netUnitPower,
      torqueList: netUnitTorque,
    },
  });
};

export default RunCalculations;
