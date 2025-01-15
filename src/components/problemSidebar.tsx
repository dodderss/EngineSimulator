// Import necessary libraries and components
import { useContext, useEffect, useState } from "react";
import { EngineContext } from "../services/globals";
import "./problemSidebar.tsx.css";
import TabOptionData from "../services/data";

// Define the Problem interface
export interface Problem {
  title: string;
  cause: string;
  description: string;
  solution: string;
}

// Define the ProblemSidebar component
function ProblemSidebar() {
  // Use context to get the engine
  const { engine } = useContext(EngineContext);
  // Define state variables
  const [problems, setProblems] = useState<Problem[]>([]);

  // Use effect to update problems when the engine changes
  useEffect(() => {
    // Clear the problems array
    setProblems([]);

    // Check block materials for problems
    TabOptionData.blockMaterials.forEach((material) => {
      if (material.value === engine.blockMaterial) {
        if (material.maxPower < engine.power) {
          setProblems((prev) => [
            ...prev,
            {
              title: "Power Output Too High",
              cause: "Engine Block",
              description:
                "The engine's power output is too high for the material you have selected.",
              solution: "Change the material to a stronger material",
            },
          ]);
        }
        if (material.maxTorque < engine.torque) {
          setProblems((prev) => [
            ...prev,
            {
              title: "Torque Output Too High",
              cause: "Engine Block",
              description:
                "The engine's torque output is too high for the material you have selected.",
              solution: "Change the material to a stronger material",
            },
          ]);
        }
      }
    });

    // Check head materials for problems
    TabOptionData.headMaterials.forEach((material) => {
      if (material.value === engine.headMaterial) {
        if (material.maxPower < engine.power) {
          setProblems((prev) => [
            ...prev,
            {
              title: "Power Output Too High",
              cause: "Head",
              description:
                "The engine's power output is too high for the material you have selected.",
              solution: "Change the material to a stronger material",
            },
          ]);
        }
        if (material.maxTorque < engine.torque) {
          setProblems((prev) => [
            ...prev,
            {
              title: "Torque Output Too High",
              cause: "Head",
              description:
                "The engine's torque output is too high for the material you have selected.",
              solution: "Change the material to a stronger material",
            },
          ]);
        }
      }
    });

    // Check piston materials for problems
    TabOptionData.pistonMaterials.forEach((material) => {
      if (material.value === engine.pistonMaterial) {
        if (material.maxPower < engine.power) {
          setProblems((prev) => [
            ...prev,
            {
              title: "Power Output Too High",
              cause: "Pistons",
              description:
                "The engine's power output is too high for the material you have selected.",
              solution: "Change the material to a stronger material",
            },
          ]);
        }
        if (material.maxTorque < engine.torque) {
          setProblems((prev) => [
            ...prev,
            {
              title: "Torque Output Too High",
              cause: "Pistons",
              description:
                "The engine's torque output is too high for the material you have selected.",
              solution: "Change the material to a stronger material",
            },
          ]);
        }
      }
    });

    // Calculate the chance of knock
    var chanceOfKnock = 0;
    var knockCauses = [];
    if (engine.compressionRatio > 10) {
      chanceOfKnock += 10;
      knockCauses.push("High Compression Ratio");
    }
    if (engine.compressionRatio > 11) {
      chanceOfKnock += 20;
      knockCauses.push("Very High Compression Ratio");
    }
    if (engine.rpmLimit > 8000) {
      chanceOfKnock += 10;
      knockCauses.push("High RPM Limit");
    }
    if (engine.rpmLimit > 9000) {
      chanceOfKnock += 10;
      knockCauses.push("Very High RPM Limit");
    }
    if (!engine.vvt) {
      chanceOfKnock += 10;
      knockCauses.push("No VVT");
    }
    if (!engine.vvl) {
      chanceOfKnock += 10;
      knockCauses.push("No VVL");
    }
    if (engine.boostPressure > 1) {
      chanceOfKnock += 10;
      knockCauses.push("High Boost Pressure");
    }
    if (engine.boostPressure > 2) {
      chanceOfKnock += 10;
      knockCauses.push("Very High Boost Pressure");
    }

    // Add knock problems if the chance of knock is high
    if (chanceOfKnock > 50) {
      knockCauses.forEach((cause) => {
        setProblems((prev) => [
          ...prev,
          {
            title: "High Chance of Knock",
            cause: cause,
            description:
              "The engine has a high chance of knocking due to the engine's configuration.",
            solution:
              "Change the engine configuration to reduce the chance of knock",
          },
        ]);
      });
    }

    // Check for low power to weight ratio
    if (engine.power / engine.engineMass < 0.05) {
      setProblems((prev) => [
        ...prev,
        {
          title: "Low Power to Weight Ratio",
          cause: "Engine",
          description:
            "The engine has a low power to weight ratio and may not perform well.",
          solution: "Increase the power output or decrease the engine mass",
        },
      ]);
    }
  }, [engine]);

  // Render the component
  return (
    <div className="rightSection fixed right-0 bottom-0 text-3xl  flex-col overflow-auto">
      <div className="problemsSection text-3xl">
        <h1>Problems</h1>
        {problems.map((problem, index) => (
          <div key={index} className="problem mt-2">
            <p className="text-lg">{problem.title}</p>
            <p className="text-gray-300 text-sm italic font-semibold">
              {problem.cause}
            </p>
            <p className="text-sm">{problem.description}</p>
            <p className="text-sm text-gray-300">{problem.solution}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the ProblemSidebar component as the default export
export default ProblemSidebar;