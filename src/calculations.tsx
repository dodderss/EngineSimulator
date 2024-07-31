import { Engine } from './globals';

const RunCalculations = (engine: Engine) => {
    
    const rpm = []
    for (let i = 0; i <= (engine.rpmLimit ?? 0); i += 10) {
        rpm.push(i);
    }
    console.log(rpm);

    return null; // or return some JSX if needed
};

export default RunCalculations;