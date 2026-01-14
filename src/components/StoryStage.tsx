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
  const [completed, setCompleted] = useState(false);
  const wheelAccum = useRef(0);
  const lockRef = useRef(false);
  const touchStart = useRef<number | null>(null);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endSentinelRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  const total = beats.length;

  const activeBeat = useMemo(() => beats[activeIndex], [beats, activeIndex]);

  const releaseStory = ({ didComplete, shouldScroll }: { didComplete: boolean; shouldScroll: boolean }) => {
    setCompleted(didComplete);
    setIsActive(false);
    wheelAccum.current = 0;
    lockRef.current = false;
    touchStart.current = null;
    unlockScroll();
    if (shouldScroll) {
      onExit();
    }
  };

  const moveBeat = (direction: number) => {
    if (lockRef.current) return;
    const nextIndex = activeIndex + direction;
    if (nextIndex < 0) {
      releaseStory({ didComplete: false, shouldScroll: false });
      return;
    }
    if (nextIndex >= total) {
      releaseStory({ didComplete: true, shouldScroll: true });
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
      setCompleted(true);
      unlockScroll();
      return;
    }
    if (isActive && !completed) {
      lockScroll();
      return () => unlockScroll();
    }
    unlockScroll();
    return undefined;
  }, [completed, isActive, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!isActive || completed) return;

    const handleWheel = (event: WheelEvent) => {
      if (!isActive || completed) return;
      event.preventDefault();
      wheelAccum.current += event.deltaY;
      if (Math.abs(wheelAccum.current) < WHEEL_THRESHOLD) return;
      const direction = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      moveBeat(direction);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (!isActive || completed) return;
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
        releaseStory({ didComplete: false, shouldScroll: false });
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!isActive || completed) return;
      touchStart.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isActive || completed) return;
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
  }, [activeIndex, completed, isActive, reducedMotion]);

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
    if (reducedMotion) return;
    const sentinel = endSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (scrollDirection.current !== "up") return;
          if (isActive) return;
          setCompleted(false);
          setActiveIndex(total - 1);
          setIsActive(true);
          wheelAccum.current = 0;
          lockRef.current = false;
          touchStart.current = null;
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isActive, reducedMotion, total]);

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
    <>
      <section className={`story-viewport ${isActive ? "story-locked" : ""} relative`}>
        <div className="mx-auto grid h-full max-w-6xl items-center gap-10 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex w-full flex-col items-start justify-center">
          <BeatCard beat={activeBeat} index={activeIndex} total={total} active={isActive} />
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Scroll to explore</span>
            <button
              type="button"
              onClick={() => releaseStory({ didComplete: false, shouldScroll: false })}
              className="rounded-pill border border-tenney-line px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            >
              Skip
            </button>
          </div>
          </div>
          <div className="hidden w-full items-center justify-center md:flex">
            <StickyPhone beats={beats} activeIndex={activeIndex} />
          </div>
        </div>
      </section>
      <div ref={endSentinelRef} className="h-1 w-full" aria-hidden />
    </>
  );
}
