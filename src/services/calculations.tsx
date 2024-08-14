import { AppState, Engine } from "./globals";

const RunCalculations = (engine: Engine, updateState: (newState: Partial<AppState>) => void) => {
  const rpm = [];

  for (let i = 0; i <= engine.rpmLimit; i += 10) {
    rpm.push(i);
  }

  const power = [];
  const torque = [];
  const ve = [];
  const losses = [];
  const netPower = [];
  const netTorque = [];
  const vvlFactor = [];
  const vvtFactor = [];
  const mep = [];

  for (let i = 0; i < rpm.length; i += 10) {
    // ---- Volume Efficiency ---- //
    ve.push(
      0.88 * ((1 - (i - 5000) / 5000) ^ 2) -
        0.03 * Math.log(engine.displacement) +
        0.15 * ((engine.compressionRatio - 1) / (engine.compressionRatio + 1))
    );

    // ---- Power ---- //
    power.push((engine.displacement * i * ve[i]) / (120 * Math.PI));

    // ---- Torque ---- //
    torque.push((power[i] * 9549) / i);

    // ---- Losses ---- //
    losses.push((0.001 * i) ^ 1.2);

    // ---- Net Power ---- //
    netPower.push(power[i] - losses[i] >= 0 ? power[i] - losses[i] : 0);

    // ---- Net Torque ---- //
    netTorque.push(
      (netPower[i] * 6000) / i >= 0 ? (netPower[i] * 6000) / i : 0
    );

    // ---- VVL Factor ---- //
    vvlFactor.push(1 + (0.05 * (i - 2000)) / 2000);

    // ---- VVT Factor ---- //
    vvtFactor.push(1 + (0.03 * (i - 1500)) / 1500);

    // ---- MEP ---- //
    mep.push(
      (10.5 +
        (engine.compressionRatio - 8) * 0.5 +
        (engine.turboPressure - 1) * 2) *
        (engine.vvl ? vvlFactor[i] : 1) *
        (engine.vvt ? vvtFactor[i] : 1)
    );
  }

  // get max of power, torque and ve
  const maxPower = Math.max(...power);
  const maxTorque = Math.max(...torque);
  const maxVe = Math.max(...ve);

  updateState({
    engine: {
      ...engine,
      power: maxPower,
      torque: maxTorque,
      volumetricEfficiency: maxVe,
    },
  });

  return {
    netPower,
    netTorque,
  };
};

export default RunCalculations;
