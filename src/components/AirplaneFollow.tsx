import React, { useEffect, useRef, useState } from "react";

interface AirplaneFollowProps {
  mouseSelected: boolean;
  setMouseSelected: (value: boolean) => void;
}

const AirplaneFollow: React.FC<AirplaneFollowProps> = ({
  mouseSelected,
  setMouseSelected,
}) => {
  const [mousePos, setMousePos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [airplanePos, setAirplanePos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [angle, setAngle] = useState(0);

  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);

      if (hoveredElement) {
        const cursorStyle = window.getComputedStyle(hoveredElement).cursor;

        if (
          cursorStyle.includes("pointer") ||
          document.body.style.cursor === "pointer"
        ) {
          setMouseSelected(true);
        } else {
          setMouseSelected(false);
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMouseSelected]);

  useEffect(() => {
    let animationFrame: number;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      setAirplanePos((prev) => {
        const newX = prev.x + (mousePos.x - prev.x) * 0.1;
        const newY = prev.y + (mousePos.y - prev.y) * 0.1;

        const dx = mousePos.x - newX;
        const dy = mousePos.y - newY;
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        setAngle(targetAngle);

        trailRef.current.push({ x: newX, y: newY });
        if (trailRef.current.length > 50) trailRef.current.shift();

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.beginPath();
        ctx.lineWidth = 2;
        if (!mouseSelected) {
          ctx.strokeStyle = "rgba(36, 236, 255, 0.7)";
        } else {
          ctx.strokeStyle = "rgba(255, 29, 108, 0.7)";
        }
        for (let i = 0; i < trailRef.current.length - 1; i++) {
          ctx.moveTo(trailRef.current[i].x, trailRef.current[i].y);
          ctx.lineTo(trailRef.current[i + 1].x, trailRef.current[i + 1].y);
        }
        ctx.stroke();

        return { x: newX, y: newY };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos, mouseSelected]);

  return (
    <div className="fixed inset-0 overflow-hidden z-50 pointer-events-none">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute top-0 left-0 pointer-events-none"
      />
      <div
        className={`airplane pointer-events-none ${
          mouseSelected ? "selected" : ""
        }`}
        style={{
          transform: `translate(${airplanePos.x - 25}px, ${
            airplanePos.y - 25
          }px) rotate(${mouseSelected ? angle + 90 : angle}deg)`,
        }}
      />
    </div>
  );
};

export default AirplaneFollow;
