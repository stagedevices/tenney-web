import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const shaderEnabled = import.meta.env.VITE_BG_SHADER === "1";

const Background = () => {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!shaderEnabled || reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let frame = 0;
    let animationFrame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const render = () => {
      frame += 0.005;
      const { innerWidth, innerHeight } = window;
      context.clearRect(0, 0, innerWidth, innerHeight);

      for (let i = 0; i < 6; i += 1) {
        const size = 220 + i * 80;
        const x =
          innerWidth * (0.2 + 0.12 * i) +
          Math.sin(frame + i * 1.4) * 60;
        const y =
          innerHeight * (0.15 + 0.1 * i) +
          Math.cos(frame * 1.2 + i) * 50;
        const gradient = context.createRadialGradient(
          x,
          y,
          size * 0.2,
          x,
          y,
          size,
        );
        gradient.addColorStop(0, "rgba(126, 245, 199, 0.12)");
        gradient.addColorStop(1, "rgba(11, 12, 18, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-bg" aria-hidden="true" />
      <div className="ambient-2026" aria-hidden="true">
        2026
      </div>
      <div className="ambient-grain" aria-hidden="true" />
      {shaderEnabled && !reducedMotion ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
};

export default Background;
