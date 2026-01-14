import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export type StickyPhoneScreen = {
  src: string;
  alt: string;
  key: string;
  sectionId: string;
  chip?: { title: string; value?: string };
};

const fallbackSrc =
  "/assets/screens/Screenshot 2025-10-04 at 2.40.15 AM.png";
const placeholderSrc =
  "data:image/svg+xml;charset=utf-8,%3Csvg width='800' height='1600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23111320'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%23a0ffd9' text-anchor='middle' font-family='system-ui'%3EScreenshot loading%3C/text%3E%3C/svg%3E";

const StickyPhone = ({ screens }: { screens: StickyPhoneScreen[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overrides, setOverrides] = useState<Record<number, string>>({});
  const rafRef = useRef<number | null>(null);

  const sections = useMemo(
    () =>
      screens
        .map((screen) => document.getElementById(screen.sectionId))
        .filter((el): el is HTMLElement => Boolean(el)),
    [screens],
  );

  useEffect(() => {
    if (!sections.length) {
      return;
    }

    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      setActiveIndex((prev) => (prev === bestIndex ? prev : bestIndex));
    };

    const scheduleUpdate = () => {
      if (rafRef.current !== null) {
        return;
      }
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateActive();
      });
    };

    const observer = new IntersectionObserver(scheduleUpdate, {
      root: null,
      threshold: [0.15, 0.4, 0.7],
    });

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sections]);

  useEffect(() => {
    const next = screens[activeIndex + 1];
    if (!next) {
      return;
    }
    const img = new Image();
    img.src = next.src;
  }, [activeIndex, screens]);

  const handleError = (index: number) => {
    setOverrides((prev) => {
      const current = prev[index];
      if (!current) {
        return { ...prev, [index]: fallbackSrc };
      }
      if (current === fallbackSrc) {
        return { ...prev, [index]: placeholderSrc };
      }
      return prev;
    });
  };

  const activeChip = screens[activeIndex]?.chip;

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[32px] border border-white/10 bg-ink-800/60 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0">
          {screens.map((screen, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.img
                key={screen.key}
                src={overrides[index] ?? screen.src}
                alt={screen.alt}
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
                onError={() => handleError(index)}
                className="absolute inset-0 h-full w-full select-none object-contain pointer-events-none"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.01,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            );
          })}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
        <AnimatePresence mode="wait">
          {activeChip ? (
            <motion.div
              key={activeChip.title}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink-900/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80"
            >
              <span className="text-white/50">{activeChip.title}</span>
              {activeChip.value ? (
                <span className="ml-2 text-mint-400">{activeChip.value}</span>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StickyPhone;
