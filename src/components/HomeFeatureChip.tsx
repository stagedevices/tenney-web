import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "../lib/reducedMotion";

type HomeFeatureChipProps = {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
  chromatic?: boolean;
};

const MotionLink = motion(Link);

export default function HomeFeatureChip({
  to,
  title,
  description,
  icon,
  chromatic = false,
}: HomeFeatureChipProps) {
  const reducedMotion = useReducedMotion();

  return (
    <MotionLink
      to={to}
      whileHover={reducedMotion ? undefined : { y: -1 }}
      whileTap={reducedMotion ? undefined : { y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tenney-cyan/40 ${
        chromatic ? "tenney-chip--chromatic" : ""
      }`}
    >
      <span className="tenney-chip__inner tenney-chip tenney-plusgrid flex h-full flex-col gap-3 rounded-[18px] border border-tenney-line/70 bg-white/70 p-5 text-left shadow-soft backdrop-blur-lg transition dark:border-tenney-line/60 dark:bg-slate-950/60">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/60 bg-white/70 text-slate-700 shadow-soft dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200">
            {icon}
          </span>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h4>
        </div>
        <p className="tenney-chip-description text-xs text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </span>
    </MotionLink>
  );
}
