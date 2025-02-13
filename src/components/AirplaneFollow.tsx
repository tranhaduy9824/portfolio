import React, { useEffect, useRef, useState } from "react";

interface AirplaneFollowProps {
  mouseSelected: boolean;
  setMouseSelected: (value: boolean) => void;
  isLampOn: boolean;
}

const AirplaneFollow: React.FC<AirplaneFollowProps> = ({
  mouseSelected,
  setMouseSelected,
  isLampOn,
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
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wavesRef = useRef<
    { x: number; y: number; radius: number; opacity: number }[]
  >([]);

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

        if (!isSoundEnabled && performance.now() % 800 < 16) {
          wavesRef.current.push({ x: newX, y: newY, radius: 5, opacity: 1 });
        }

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = mouseSelected
          ? "rgba(255, 29, 108, 0.7)"
          : "rgba(36, 236, 255, 0.7)";

        for (let i = 0; i < trailRef.current.length - 1; i++) {
          ctx.moveTo(trailRef.current[i].x, trailRef.current[i].y);
          ctx.lineTo(trailRef.current[i + 1].x, trailRef.current[i + 1].y);
        }
        ctx.stroke();

        for (let i = wavesRef.current.length - 1; i >= 0; i--) {
          const wave = wavesRef.current[i];
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, 2 * Math.PI);
          ctx.strokeStyle = mouseSelected
          ? `rgba(255, 29, 108, ${wave.opacity}))`
          : `rgba(36, 236, 255, ${wave.opacity}))`;
          ctx.lineWidth = 2;
          ctx.stroke();

          wave.radius += 0.1;
          wave.opacity -= 0.003;

          if (wave.opacity <= 0) wavesRef.current.splice(i, 1);
        }

        return { x: newX, y: newY };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos, mouseSelected, isSoundEnabled]);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!isSoundEnabled) {
        setIsSoundEnabled(true);
        window.removeEventListener("click", handleUserInteraction);
      }
    };

    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [isSoundEnabled]);

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
          }px) rotate(${mouseSelected ? angle + 90 : angle + 45}deg)`,
        }}
      />
      {!isSoundEnabled && (
        <p
          className="absolute text-sm font-bold pointer-events-none"
          style={{
            top: `${airplanePos.y + 30}px`,
            left: `${airplanePos.x - 70}px`,
            width: "140px",
            textAlign: "center",
            textShadow: "0 0 8px rgba(36, 236, 255, 0.8)",
            color: `${isLampOn ? "white" : "black"}`,
          }}
        >
          Click to enable sounds 🔊
        </p>
      )}
    </div>
  );
};

export default AirplaneFollow;
