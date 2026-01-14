import { useEffect, useState } from "react";

interface CondensedNavOptions {
  threshold?: number;
  hysteresis?: number;
}

export const useCondensedNav = ({ threshold = 120, hysteresis = 24 }: CondensedNavOptions = {}) => {
  const [condensed, setCondensed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.scrollY > threshold;
  });

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setCondensed((prev) => {
        if (prev && y < threshold - hysteresis) {
          return false;
        }
        if (!prev && y > threshold + hysteresis) {
          return true;
        }
        return prev;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [hysteresis, threshold]);

  return condensed;
};
