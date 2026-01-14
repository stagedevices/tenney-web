import { motion } from "framer-motion";
import CTACluster from "./CTACluster";

export interface Beat {
  id: string;
  title: string;
  lede: string;
  bullets: string[];
  shotSrc: string;
  accent: "cool" | "warm";
  details?: { summary: string; body: string[] };
  isCTA?: boolean;
}

interface BeatCardProps {
  beat: Beat;
  index: number;
  total: number;
  active: boolean;
}

const accentStyles = {
  cool: "border-tenney-blue/50 bg-white/80 dark:bg-slate-900/60",
  warm: "border-tenney-amber/60 bg-white/80 dark:bg-slate-900/60",
};

export default function BeatCard({ beat, index, total, active }: BeatCardProps) {
  return (
    <motion.div
      className={`rounded-card border p-6 shadow-softer backdrop-blur-lg ${accentStyles[beat.accent]}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: active ? 1 : 0.45, y: active ? 0 : 10 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        Beat {index + 1} / {total}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        {beat.title}
      </h2>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{beat.lede}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {beat.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-tenney-cyan" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      {beat.details && (
        <details className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          <summary className="cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200">
            {beat.details.summary}
          </summary>
          <div className="mt-2 space-y-2">
            {beat.details.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </details>
      )}
      {beat.isCTA && (
        <div className="mt-6">
          <CTACluster />
        </div>
      )}
    </motion.div>
  );
}
