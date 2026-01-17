import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "../lib/reducedMotion";

type Offset = {
  x: number;
  y: number;
};

const nodes = [
  { id: "n1", x: 60, y: 60 },
  { id: "n2", x: 160, y: 40 },
  { id: "n3", x: 260, y: 80 },
  { id: "n4", x: 360, y: 50 },
  { id: "n5", x: 460, y: 90 },
  { id: "n6", x: 520, y: 160 },
  { id: "n7", x: 430, y: 180 },
  { id: "n8", x: 320, y: 150 },
  { id: "n9", x: 210, y: 170 },
  { id: "n10", x: 110, y: 140 },
  { id: "n11", x: 80, y: 220 },
  { id: "n12", x: 180, y: 250 },
  { id: "n13", x: 280, y: 240 },
  { id: "n14", x: 380, y: 260 },
  { id: "n15", x: 480, y: 230 },
  { id: "n16", x: 540, y: 280 },
  { id: "n17", x: 420, y: 300 },
  { id: "n18", x: 300, y: 320 },
  { id: "n19", x: 190, y: 320 },
  { id: "n20", x: 90, y: 300 },
];

const edges = [
  ["n1", "n2"],
  ["n2", "n3"],
  ["n3", "n4"],
  ["n4", "n5"],
  ["n5", "n6"],
  ["n6", "n7"],
  ["n7", "n8"],
  ["n8", "n9"],
  ["n9", "n10"],
  ["n10", "n1"],
  ["n10", "n11"],
  ["n11", "n12"],
  ["n12", "n13"],
  ["n13", "n14"],
  ["n14", "n15"],
  ["n15", "n16"],
  ["n16", "n17"],
  ["n17", "n18"],
  ["n18", "n19"],
  ["n19", "n20"],
  ["n20", "n11"],
  ["n8", "n13"],
  ["n7", "n14"],
  ["n9", "n12"],
  ["n4", "n8"],
  ["n3", "n9"],
  ["n5", "n7"],
  ["n14", "n18"],
  ["n12", "n18"],
  ["n6", "n15"],
];

export default function LatticeConstellation() {
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });

  const allowParallax = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches;
  }, []);

  useEffect(() => {
    if (reducedMotion || !allowParallax) return;
    let frame = 0;
    let latest: Offset = { x: 0, y: 0 };

    const handleMove = (event: MouseEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const x = (event.clientX / width - 0.5) * 16;
      const y = (event.clientY / height - 0.5) * 12;
      latest = { x, y };
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setOffset(latest);
        frame = 0;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [reducedMotion, allowParallax]);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 600 380"
        className="h-full w-full max-w-[560px]"
        style={{
          transform: reducedMotion ? "none" : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
        aria-hidden
      >
        <defs>
          <radialGradient id="tenney-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
            <stop offset="55%" stopColor="rgba(59, 130, 246, 0.18)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
          <linearGradient id="tenney-edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(125, 211, 252, 0.55)" />
            <stop offset="60%" stopColor="rgba(148, 163, 184, 0.25)" />
            <stop offset="100%" stopColor="rgba(37, 99, 235, 0.3)" />
          </linearGradient>
          <mask id="tenney-fade">
            <rect width="600" height="380" fill="url(#tenney-glow)" />
          </mask>
        </defs>
        <rect width="600" height="380" fill="url(#tenney-glow)" opacity="0.35" />
        <g mask="url(#tenney-fade)" stroke="url(#tenney-edge)" strokeWidth="1">
          {edges.map(([from, to]) => {
            const start = nodes.find((node) => node.id === from);
            const end = nodes.find((node) => node.id === to);
            if (!start || !end) return null;
            return (
              <line
                key={`${from}-${to}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                opacity="0.45"
              />
            );
          })}
        </g>
        <g mask="url(#tenney-fade)">
          {nodes.map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="6" fill="rgba(59, 130, 246, 0.12)" />
              <circle cx={node.x} cy={node.y} r="2.5" fill="rgba(125, 211, 252, 0.7)" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
