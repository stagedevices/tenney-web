import { useEffect, useMemo, useRef, useState } from "react";
import BeatCard, { Beat } from "./BeatCard";
import StickyPhone from "./StickyPhone";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import { useReducedMotion } from "../lib/reducedMotion";

interface StoryStageProps {
  beats: Beat[];
  onExit: () => void;
}

const WHEEL_THRESHOLD = 80;
const LOCK_DURATION = 700;

export default function StoryStage({ beats, onExit }: StoryStageProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const wheelAccum = useRef(0);
  const lockRef = useRef(false);
  const touchStart = useRef<number | null>(null);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const total = beats.length;

  const activeBeat = useMemo(() => beats[activeIndex], [beats, activeIndex]);

  const exitStory = () => {
    setIsActive(false);
    unlockScroll();
    onExit();
  };

  const moveBeat = (direction: number) => {
    if (lockRef.current) return;
    const nextIndex = activeIndex + direction;
    if (nextIndex < 0) return;
    if (nextIndex >= total) {
      exitStory();
      return;
    }
    lockRef.current = true;
    setActiveIndex(nextIndex);
    window.setTimeout(() => {
      lockRef.current = false;
    }, LOCK_DURATION);
  };

  useEffect(() => {
    if (reducedMotion) {
      setIsActive(false);
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
      event.preventDefault();
      wheelAccum.current += event.deltaY;
      if (Math.abs(wheelAccum.current) < WHEEL_THRESHOLD) return;
      const direction = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      moveBeat(direction);
    };

    const handleKey = (event: KeyboardEvent) => {
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
        exitStory();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStart.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStart.current === null) return;
      const currentY = event.touches[0]?.clientY ?? 0;
      const delta = touchStart.current - currentY;
      if (Math.abs(delta) > WHEEL_THRESHOLD) {
        moveBeat(delta > 0 ? 1 : -1);
        touchStart.current = null;
      }
      event.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeIndex, isActive, reducedMotion]);

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
              className="mb-8"
            >
              <BeatCard beat={beat} index={index} total={total} active={activeIndex === index} />
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
    <section className={`story-viewport ${isActive ? "story-locked" : ""} relative`}>
      <div className="mx-auto flex h-full max-w-6xl items-center gap-10 px-6">
        <div className="w-full md:w-1/2">
          <BeatCard beat={activeBeat} index={activeIndex} total={total} active={isActive} />
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Scroll to explore</span>
            <button
              type="button"
              onClick={exitStory}
              className="rounded-pill border border-tenney-line px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            >
              Skip
            </button>
          </div>
        </div>
        <div className="hidden w-1/2 md:block">
          <StickyPhone beats={beats} activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}
