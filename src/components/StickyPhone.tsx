import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';

export type Screen = {
  key: string;
  src: string;
  alt: string;
  sectionId: string;
  chip?: { label: string; value?: string };
};

const fallbackSrc = '/assets/Screenshot 2025-10-04 at 2.40.15 AM.png';

type StickyPhoneProps = {
  screens: Screen[];
  sectionIds: string[];
  className?: string;
};

export default function StickyPhone({ screens, sectionIds, className }: StickyPhoneProps) {
  const activeSection = useActiveSection(sectionIds);
  const [erroredKeys, setErroredKeys] = useState<Record<string, boolean>>({});
  const activeIndex = Math.max(
    screens.findIndex((screen) => screen.sectionId === activeSection),
    0
  );
  const activeScreen = screens[activeIndex] ?? screens[0];

  const resolvedScreens = useMemo(() => {
    return screens.map((screen) => ({
      ...screen,
      resolvedSrc: erroredKeys[screen.key] ? fallbackSrc : screen.src
    }));
  }, [erroredKeys, screens]);

  useEffect(() => {
    const preload = (screen?: Screen) => {
      if (!screen) {
        return;
      }
      const image = new Image();
      image.src = screen.src;
    };

    preload(screens[activeIndex + 1]);
    preload(screens[activeIndex + 2]);
  }, [activeIndex, screens]);

  return (
    <div className={className}>
      <div className="relative mx-auto w-full max-w-[360px]">
        <div className="rounded-[36px] border border-white/15 bg-slate-900/70 p-3 shadow-lift">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80">
            <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-slate-900/80" />
            <div className="aspect-[9/19] w-full">
              <AnimatePresence initial={false} mode="sync">
                {activeScreen ? (
                  <motion.img
                    key={activeScreen.key}
                    src={
                      resolvedScreens.find((screen) => screen.key === activeScreen.key)?.resolvedSrc ??
                      activeScreen.src
                    }
                    alt={activeScreen.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onError={() =>
                      setErroredKeys((prev) => ({
                        ...prev,
                        [activeScreen.key]: true
                      }))
                    }
                  />
                ) : null}
              </AnimatePresence>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10" />
          </div>
        </div>
        {activeScreen?.chip ? (
          <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 shadow-glow">
            <span>{activeScreen.chip.label}</span>
            {activeScreen.chip.value ? (
              <span className="ml-2 text-white/60">{activeScreen.chip.value}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
