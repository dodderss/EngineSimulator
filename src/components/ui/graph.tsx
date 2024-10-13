import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
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

  const resizeCanvas = (canvas: HTMLCanvasElement) => {
    const parent = canvas.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      const { width, height } = rect;

      // Update canvas resolution (actual pixel size)
      canvas.width = width * window.devicePixelRatio; // Multiply by device pixel ratio for retina screens
      canvas.height = height * window.devicePixelRatio;

      // Scale the canvas context to match the higher resolution
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }

      // Now we should also redraw the graph
      const yData = isTorque ? engine.torqueList : engine.powerList;
      drawGraph(
        canvas,
        yData,
        Array.from({ length: engine.rpmLimit / 10 }, (_, i) => i * 10)
      );
    }
  };

  const drawGraph = useCallback(
    (canvas: HTMLCanvasElement, data: number[], x: number[]) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const padding = 2;
      const graphWidth = canvas.width / window.devicePixelRatio - padding * 2;
      const graphHeight = canvas.height / window.devicePixelRatio - padding * 2;

      const maxData = Math.max(...data);
      const minData = Math.min(...data);
      const maxRpm = engine.rpmLimit;
      const minRpm = 0;

      const xScale = graphWidth / (maxRpm - minRpm);
      const yScale = graphHeight / (maxData - minData);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the graph line
      ctx.beginPath();
      for (let i = 0; i < data.length; i++) {
        const rpm = minRpm + i * (maxRpm / (data.length - 1));
        const x = padding + (rpm - minRpm) * xScale;
        const y =
          canvas.height / window.devicePixelRatio -
          padding -
          (data[i] - minData) * yScale;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (isHovering) {
        ctx.font = "bold 16px Arial, sans-serif";
        ctx.fillStyle = "white";

        // Draw a point and display hovered data at the current RPM
        for (let i = 0; i < data.length; i++) {
          const rpm = minRpm + i * (maxRpm / (data.length - 1));
          const x = padding + (rpm - minRpm) * xScale;
          const y =
            canvas.height / window.devicePixelRatio -
            padding -
            (data[i] - minData) * yScale;

          if (Math.abs(rpm - currentRPM) < maxRpm / data.length) {
            // Draw the hovering circle
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI, false);
            ctx.fillStyle = "#4988cb";
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "white";
            ctx.stroke();

            // Display the hovered value near the pointer
            const text = `${data[i].toFixed(2)}`;
            ctx.font = "bold 16px Arial, sans-serif";
            ctx.fillStyle = "white";
            const textWidth = ctx.measureText(text).width;

            // Ensure text stays within canvas boundaries
            let textX = x - textWidth / 2;

            // Adjust text position based on the RPM position
            let textY = y - 30; // Default position above the point
            if (rpm > maxRpm * 0.4) {
              textY = y + 30; // Position below the point for RPM > 75%
            }

            // Ensure text stays within canvas boundaries
            if (textX + textWidth > canvas.width / window.devicePixelRatio)
              textX = canvas.width / window.devicePixelRatio - textWidth - 10;
            if (textX < 0) textX = 10;

            ctx.fillText(text, textX, textY);
          }
        }
      }
    },
    [engine, isHovering, currentRPM]
  );

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
      resizeCanvas(canvas); // Resize the canvas on load
    }

    const handleResize = () => {
      const canvas = isTorque ? canvasRef2.current : canvasRef.current;
      if (canvas) {
        resizeCanvas(canvas);
      }
    };

    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, isTorque, currentRPM, drawGraph]);

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
        <div className="w-full flex flex-col items-center h-full">
          <div className="w-full border-l-2 border-b-2 border-gray-300 ml-2 h-full">
            <canvas
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
              ref={isTorque ? canvasRef2 : canvasRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>

      {/* X-Axis labels */}
      <div className="flex flex-row justify-between">
        {xAxisLabels.map((label, index) => (
          <div key={index} className="text-center text-sm">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Graph;
