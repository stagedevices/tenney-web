import { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotionPreference } from '../lib/reducedMotion';

const MAX_DPR = 1.5;

export default function AmbientBackground() {
  const reducedMotion = useReducedMotionPreference();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const enabled = useMemo(
    () => import.meta.env.VITE_ENABLE_SHADER_BG === 'true' && !reducedMotion,
    [reducedMotion]
  );
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 800], [0, -60]);

  useEffect(() => {
    if (!enabled || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let frameId = 0;
    let lastTime = 0;
    let running = true;
    const blobs = Array.from({ length: 5 }).map((_, index) => ({
      radius: 140 + index * 35,
      speed: 0.0006 + index * 0.0002,
      phase: index * 1.2
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (time: number) => {
      if (!running) {
        return;
      }

      if (time - lastTime < 33) {
        frameId = window.requestAnimationFrame(render);
        return;
      }

      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(7, 9, 15, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob, index) => {
        const x = window.innerWidth * 0.2 + Math.sin(time * blob.speed + blob.phase) * 240 + index * 120;
        const y = window.innerHeight * 0.3 + Math.cos(time * blob.speed + blob.phase) * 180 + index * 90;
        const gradient = ctx.createRadialGradient(x, y, 10, x, y, blob.radius);
        gradient.addColorStop(0, 'rgba(109, 225, 255, 0.14)');
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.12)');
        gradient.addColorStop(1, 'rgba(7, 9, 15, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      frameId = window.requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      running = !document.hidden;
      if (running) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    frameId = window.requestAnimationFrame(render);

    return () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [enabled]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-hero-radial opacity-80 drift"
        style={{ y: reducedMotion ? 0 : parallax }}
      />
      <div className="absolute inset-0 bg-vignette" />
      <div className="absolute inset-0 grain opacity-40 mix-blend-soft-light" />
      {enabled ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-70"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
