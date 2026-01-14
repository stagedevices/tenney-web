import { PropsWithChildren, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const ParallaxLayer = ({
  children,
  className,
  strength = 12,
}: PropsWithChildren<{ className?: string; strength?: number }>) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 80, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 80, damping: 15 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (event.clientX / innerWidth - 0.5) * strength;
      const offsetY = (event.clientY / innerHeight - 0.5) * strength;
      x.set(offsetX);
      y.set(offsetY);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [strength, x, y]);

  return (
    <motion.div className={className} style={{ x: xSpring, y: ySpring }}>
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
