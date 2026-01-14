import { createContext, PropsWithChildren, useContext, useRef } from 'react';
import { MotionValue, useReducedMotion, useScroll } from 'framer-motion';

type StageShellContextValue = {
  scrollYProgress: MotionValue<number> | null;
  reducedMotion: boolean;
};

const StageShellContext = createContext<StageShellContextValue>({
  scrollYProgress: null,
  reducedMotion: false,
});

export const useStageShell = () => useContext(StageShellContext);

const StageShell = ({ children }: PropsWithChildren) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <StageShellContext.Provider value={{ scrollYProgress, reducedMotion: !!reducedMotion }}>
      <section ref={ref} className={reducedMotion ? 'relative' : 'relative min-h-[800vh]'}>
        {children}
      </section>
    </StageShellContext.Provider>
  );
};

export default StageShell;
