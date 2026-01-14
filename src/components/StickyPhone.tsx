import { motion } from "framer-motion";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Beat } from "./BeatCard";
import { useReducedMotion } from "../lib/reducedMotion";

interface StickyPhoneProps {
  beats: Beat[];
  activeIndex: number;
}

export default function StickyPhone({ beats, activeIndex }: StickyPhoneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [highlight, setHighlight] = useState({ x: 50, y: 30 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setHighlight({ x, y });
    };

    container.addEventListener("mousemove", handleMove);
    return () => container.removeEventListener("mousemove", handleMove);
  }, []);

  const activeBeat = beats[activeIndex];
  const glowClass = activeBeat?.accent === "warm" ? "shadow-[0_0_60px_rgba(254,155,0,0.25)]" : "shadow-[0_0_60px_rgba(5,219,254,0.25)]";

  return (
    <div className="sticky top-24" ref={containerRef}>
      <div
        className={`relative mx-auto w-full max-w-[360px] rounded-[36px] bg-white/40 p-5 shadow-softer backdrop-blur-xl dark:bg-slate-900/40 ${glowClass}`}
        style={{
          "--highlight-x": `${highlight.x}%`,
          "--highlight-y": `${highlight.y}%`,
        } as CSSProperties}
      >
        <div className="absolute inset-0 rounded-[36px] border border-white/40 dark:border-white/10" />
        <div className="absolute inset-0 rounded-[36px] shadow-[0_40px_120px_rgba(15,23,42,0.35)]" />
        <div className="absolute inset-0 rounded-[36px] shadow-[0_12px_24px_rgba(15,23,42,0.18)]" />
        <div className="absolute inset-0 rounded-[36px] shimmer-highlight opacity-70" />
        <div className="relative aspect-[9/19] overflow-hidden rounded-[28px] bg-black/5 dark:bg-black/40">
          {beats.map((beat, index) => (
            <motion.img
              key={beat.id}
              src={beat.shotSrc}
              alt={beat.title}
              loading={index < 2 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-contain"
              animate={{ opacity: index === activeIndex ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
              style={{
                clipPath: "inset(6% 0 0 0)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
