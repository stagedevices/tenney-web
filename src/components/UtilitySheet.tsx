import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useReducedMotion } from "../lib/reducedMotion";
import { useTheme } from "../lib/theme";
import TenneyButton from "./TenneyButton";

const modes = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
] as const;

const STAGE_DEVICES_LINK = "https://stagedevices.com";
const IOS_TESTFLIGHT_LATEST = "https://testflight.apple.com/join/mWAWKYHT";

interface UtilitySheetProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

const focusableSelector =
  "a[href],button:not([disabled]),[tabindex]:not([tabindex='-1']),select,textarea,input";

export default function UtilitySheet({ open, onClose, returnFocusRef }: UtilitySheetProps) {
  const reducedMotion = useReducedMotion();
  const { mode, setMode } = useTheme();
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const titleId = useMemo(() => `tenney-utility-sheet-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousActive = document.activeElement as HTMLElement | null;
    const node = sheetRef.current;
    const focusables = node?.querySelectorAll<HTMLElement>(focusableSelector) ?? [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    first?.focus();
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      const restoreTarget = returnFocusRef?.current ?? previousActive;
      restoreTarget?.focus?.();
    };
  }, [onClose, open, returnFocusRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={backdropRef}
          className="tenney-sheet-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="tenney-sheet"
            initial={reducedMotion ? false : { y: 30, opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.3, ease: [0.22, 0.8, 0.28, 1] }}
          >
            <div className="flex items-center justify-between">
              <h2 id={titleId} className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200">
                Utilities
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-tenney-line/70 px-2 py-1 text-xs text-slate-600 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tenney-blue/40 dark:text-slate-300 dark:hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Theme</p>
                <div className="mt-3 flex rounded-pill border border-tenney-line/80 bg-white/70 p-1 text-xs text-slate-700 shadow-soft dark:bg-slate-950/60 dark:text-slate-200">
                  {modes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMode(item.id)}
                      className={`rounded-pill px-3 py-1 transition ${
                        mode === item.id
                          ? "bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-white"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TenneyButton
                  as="a"
                  href={STAGE_DEVICES_LINK}
                  target="_blank"
                  rel="noreferrer noopener"
                  size="sm"
                  variant="secondary"
                >
                  Stage Devices
                </TenneyButton>
                <TenneyButton
                  as="a"
                  href={IOS_TESTFLIGHT_LATEST}
                  target="_blank"
                  rel="noreferrer noopener"
                  size="sm"
                  variant="primary"
                >
                  Join Public Beta
                </TenneyButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
