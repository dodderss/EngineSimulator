import { useContext, useEffect, useState } from "react";
import { EngineContext } from "../services/globals";
import "./problemSidebar.tsx.css";
import TabOptionData from "../services/data";

export interface Problem {
  title: string;
  cause: string;
  description: string;
  solution: string;
}

function ProblemSidebar() {
  const { engine } = useContext(EngineContext);
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    setProblems([]);
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
  }, [engine]);

  return (
    <div className="rightSection fixed right-0 bottom-0 text-3xl  flex-col overflow-auto">
      <div className="problemsSection text-3xl">
        <h1 className="sticky">Problems</h1>
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

export default ProblemSidebar;
