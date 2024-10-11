import React, { useContext, useEffect, useState, useRef } from "react";
import { EngineContext } from "../../services/globals";

type GraphProps = { isTorque: boolean };

function Graph({ isTorque }: GraphProps) {
  const { engine } = useContext(EngineContext);
  const [yAxisLabels, setYAxisLabels] = useState<string[]>([]);
  const [xAxisLabels, setXAxisLabels] = useState<string[]>([]);
  const [currentRPM, setCurrentRPM] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const yData = isTorque ? engine.torqueList : engine.powerList;
    const yMin = Math.min(...yData);
    const yMax = Math.max(...yData);
    const numLabelsY = 5;
    const numLabelsX = 5;

    setYAxisLabels(
      Array.from({ length: numLabelsY }, (_, i) =>
        (yMin + (i * (yMax - yMin)) / (numLabelsY - 1)).toFixed(0)
      ).reverse()
    );
    setXAxisLabels(
      Array.from({ length: numLabelsX }, (_, i) =>
        (i * (engine.rpmLimit / (numLabelsX - 1))).toFixed(0)
      )
    );

    const canvas = isTorque ? canvasRef2.current : canvasRef.current;
    if (canvas) {
      drawGraph(canvas, yData, Array.from({ length: engine.rpmLimit / 10 }, (_, i) => i * 10));
    }
  }, [engine, isTorque, currentRPM]);

  const drawGraph = (canvas: HTMLCanvasElement, data: number[], x: number[]) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const padding = 2;
    const graphWidth = canvas.width - padding * 2;
    const graphHeight = canvas.height - padding * 2;

    const maxData = Math.max(...data);
    const minData = Math.min(...data);
    const maxRpm = engine.rpmLimit;
    const minRpm = 0;

    const xScale = graphWidth / (maxRpm - minRpm);
    const yScale = graphHeight / (maxData - minData);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const rpm = minRpm + i * (maxRpm / (data.length - 1));
      const x = padding + (rpm - minRpm) * xScale;
      const y = canvas.height - padding - (data[i] - minData) * yScale;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.stroke();

    if (isHovering) {
      for (let i = 0; i < data.length; i++) {
        const rpm = minRpm + i * (maxRpm / (data.length - 1));
        const x = padding + (rpm - minRpm) * xScale;
        const y = canvas.height - padding - (data[i] - minData) * yScale;

        if (Math.abs(rpm - currentRPM) < maxRpm / data.length) {
          ctx.beginPath();
          ctx.arc(x, y, 16, 0, 2 * Math.PI, false);
          ctx.fillStyle = "#4988cb";
          ctx.fill();
          ctx.lineWidth = 8;
          ctx.strokeStyle = "white";
          ctx.stroke();
        }
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = isTorque ? canvasRef2.current : canvasRef.current;
    if (canvas) {
      const x = event.clientX;
      getEquivilantY(x - canvas.getBoundingClientRect().left);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const getEquivilantY = (mouseX: number) => {
    const canvas = isTorque ? canvasRef2.current : canvasRef.current;
    if (!canvas) return;

    const padding = 2;
    const graphWidth = canvas.getBoundingClientRect().width - padding * 2;
    const maxRpm = engine.rpmLimit;

    const xMultiplier =
      mouseX > graphWidth ? 1 : mouseX < 0 ? 0 : mouseX / graphWidth;

    const rpm = xMultiplier * maxRpm;
    setCurrentRPM(rpm);
  };

  return (
    <div className="container mx-auto p-4">
      <div
        style={{ width: "100%", height: "23vh" }}
        className="flex flex-row items-stretch"
      >
        {/* Y-Axis labels */}
        <div className="flex flex-col justify-between h-full">
          {yAxisLabels.map((label, index) => (
            <div key={index} className="text-left text-sm">
              {label}
            </div>
          ))}
        </div>
        {/* Graph area */}
        <div className="w-full flex flex-col items-center h-full">
          <div className="w-full border-l-2 border-b-2 border-gray-300 ml-2 h-full">
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              style={{
                width: "100%",
                height: "100%",
                display: isTorque ? "none" : "block",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
            <canvas
              ref={canvasRef2}
              width={800}
              height={400}
              style={{
                width: "100%",
                height: "100%",
                display: isTorque ? "block" : "none",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
            <p className="text-sm">Current RPM: {currentRPM}</p>
            <p className="text-sm">Current value: {engine.powerList[currentRPM / 10]}</p>
          </div>
          {/* X-Axis labels */}
          <div className="flex flex-row justify-between w-full mt-2">
            {xAxisLabels.map((label, index) => (
              <div key={index} className="text-center text-sm">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
