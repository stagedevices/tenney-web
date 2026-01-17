import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import BeatCard, { Beat } from "./BeatCard";
import StickyPhone from "./StickyPhone";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import { useReducedMotion } from "../lib/reducedMotion";

interface StoryStageProps {
  beats: Beat[];
  onExit: () => void;
  onStoryStateChange?: (state: { beatIndex: number; isActive: boolean }) => void;
}

const WHEEL_THRESHOLD = 80;
const LOCK_DURATION = 700;

export default function StoryStage({ beats, onExit, onStoryStateChange }: StoryStageProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"story" | "page">("story");
  const [hasInteracted, setHasInteracted] = useState(false);
  const wheelAccum = useRef(0);
  const lockRef = useRef(false);
  const touchStart = useRef<number | null>(null);
  const touchAccum = useRef(0);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef = useRef<HTMLElement | null>(null);
  const stageTopSentinelRef = useRef<HTMLDivElement | null>(null);
  const stageBottomSentinelRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");
  const modeRef = useRef(mode);

  const total = beats.length;
  const lastIndex = total - 1;
  const isActive = mode === "story";

  const activeBeat = useMemo(() => beats[activeIndex], [beats, activeIndex]);

  const releaseToPage = ({ shouldScroll }: { shouldScroll: boolean }) => {
    setMode("page");
    wheelAccum.current = 0;
    touchAccum.current = 0;
    lockRef.current = false;
    touchStart.current = null;
    if (shouldScroll) {
      onExit();
    }
  };

  const moveBeat = (direction: number) => {
    if (lockRef.current) return;
    const nextIndex = activeIndex + direction;
    if (nextIndex < 0) {
      return;
    }
    if (nextIndex >= total) {
      setActiveIndex(lastIndex);
      releaseToPage({ shouldScroll: true });
      return;
    }
    lockRef.current = true;
    setHasInteracted(true);
    setActiveIndex(nextIndex);
    window.setTimeout(() => {
      lockRef.current = false;
    }, LOCK_DURATION);
  };

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (reducedMotion) {
      unlockScroll();
      return;
    }
    if (isActive) {
      lockScroll();
      return () => unlockScroll();
    }
    unlockScroll();
    return undefined;
  }, [isActive, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!isActive) return;

    const handleWheel = (event: WheelEvent) => {
      if (!isActive) return;
      event.preventDefault();
      wheelAccum.current += event.deltaY;
      if (Math.abs(wheelAccum.current) < WHEEL_THRESHOLD) return;
      const direction = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      moveBeat(direction);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (!isActive) return;
      if (["ArrowDown", "PageDown"].includes(event.key)) {
        event.preventDefault();
        moveBeat(1);
      }
      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        moveBeat(-1);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        releaseToPage({ shouldScroll: false });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, isActive, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!isActive) return;
    const stage = stageRef.current;
    if (!stage) return;

    const handleTouchStart = (event: TouchEvent) => {
      if (!isActive) return;
      touchStart.current = event.touches[0]?.clientY ?? null;
      touchAccum.current = 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isActive) return;
      if (touchStart.current === null) return;
      const currentY = event.touches[0]?.clientY ?? 0;
      const delta = touchStart.current - currentY;
      touchStart.current = currentY;
      touchAccum.current += delta;
      if (Math.abs(touchAccum.current) >= WHEEL_THRESHOLD) {
        moveBeat(touchAccum.current > 0 ? 1 : -1);
        touchAccum.current = 0;
      }
      event.preventDefault();
    };

    stage.addEventListener("touchstart", handleTouchStart, { passive: false });
    stage.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      stage.removeEventListener("touchstart", handleTouchStart);
      stage.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeIndex, isActive, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollDirection.current = currentY < lastScrollY.current ? "up" : "down";
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  useEffect(() => {
    onStoryStateChange?.({ beatIndex: activeIndex, isActive });
  }, [activeIndex, isActive, onStoryStateChange]);

  useEffect(() => {
    if (reducedMotion) return;
    const topSentinel = stageTopSentinelRef.current;
    const bottomSentinel = stageBottomSentinelRef.current;
    if (!topSentinel || !bottomSentinel) return;
    const positions = new Map<Element, number>();

    const updateMode = () => {
      const top = positions.get(topSentinel) ?? topSentinel.getBoundingClientRect().top;
      const bottom = positions.get(bottomSentinel) ?? bottomSentinel.getBoundingClientRect().top;
      const inStoryZone = top < window.innerHeight && bottom > 0;
      if (inStoryZone && modeRef.current === "page" && scrollDirection.current === "up") {
        setActiveIndex(lastIndex);
        setMode("story");
        wheelAccum.current = 0;
        touchAccum.current = 0;
        lockRef.current = false;
        touchStart.current = null;
        return;
      }
      if (!inStoryZone && modeRef.current === "story" && scrollDirection.current === "down") {
        setMode("page");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          positions.set(entry.target, entry.boundingClientRect.top);
        });
        updateMode();
      },
      { threshold: 0 },
    );
    observer.observe(topSentinel);
    observer.observe(bottomSentinel);
    return () => observer.disconnect();
  }, [lastIndex, reducedMotion]);

  useEffect(() => {
    if (!reducedMotion) return;
    const elements = observerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = elements.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row">
        <div className="md:w-1/2">
          {beats.map((beat, index) => (
            <div
              key={beat.id}
              ref={(el) => {
                observerRefs.current[index] = el;
              }}
              className="relative mb-8 before:pointer-events-none before:absolute before:-inset-x-6 before:inset-y-0 before:bg-gradient-to-b before:from-white/70 before:via-white/30 before:to-transparent before:opacity-80 dark:before:from-slate-950/60 dark:before:via-slate-950/30 dark:before:to-transparent"
            >
              <BeatCard beat={beat} index={index} total={total} active={activeIndex === index} surface="plain" />
            </div>
          ))}
        </div>
        <div className="md:w-1/2">
          <StickyPhone beats={beats} activeIndex={activeIndex} />
        </div>
      </section>
    );
  }

  return (
    <>
      <div ref={stageTopSentinelRef} className="h-1 w-full" aria-hidden />
      <section
        ref={stageRef}
        className={`story-viewport ${isActive ? "story-locked touch-none" : ""} relative z-10`}
      >
        <div className="mx-auto grid h-full max-w-6xl items-center gap-10 px-6 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex w-full flex-col items-start justify-center">
            <div className="relative w-full before:pointer-events-none before:absolute before:-inset-x-6 before:inset-y-0 before:bg-gradient-to-b before:from-white/70 before:via-white/30 before:to-transparent before:opacity-80 dark:before:from-slate-950/60 dark:before:via-slate-950/30 dark:before:to-transparent">
              <BeatCard beat={activeBeat} index={activeIndex} total={total} active={isActive} surface="plain" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Scroll to explore</span>
              <button
                type="button"
                onClick={() => {
                  setHasInteracted(true);
                  setActiveIndex(lastIndex);
                  releaseToPage({ shouldScroll: true });
                }}
                className="rounded-pill border border-tenney-line px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              >
                Skip
              </button>
            </div>
            {activeIndex === 0 && !hasInteracted ? (
              <div className="pointer-events-auto relative mt-10 flex w-full justify-center md:justify-start">
                <motion.button
                  type="button"
                  onClick={() => moveBeat(1)}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-tenney-line bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-soft backdrop-blur dark:bg-slate-900/60 dark:text-slate-200"
                  whileHover={reducedMotion ? undefined : { y: -2 }}
                >
                  <span className="pointer-events-none relative z-10">Scroll</span>
                  <span className="pointer-events-none relative z-10 text-base">⌄</span>
                  <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition duration-500 group-hover:translate-x-[120%] group-hover:opacity-100 dark:via-white/20" />
                  {!reducedMotion ? (
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-tenney-line/40"
                      animate={{ opacity: [0.35, 0.7, 0.35] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : null}
                </motion.button>
              </div>
            ) : null}
          </div>
          <div className="hidden w-full items-center justify-center md:flex">
            <StickyPhone beats={beats} activeIndex={activeIndex} />
          </div>
        </div>
      </section>
      <div ref={stageBottomSentinelRef} className="h-1 w-full" aria-hidden />
    </>
  );
}
