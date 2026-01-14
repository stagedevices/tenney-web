import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AppStoreBadge from '../../components/AppStoreBadge';
import ParallaxLayer from '../../components/ParallaxLayer';
import SafeImage from '../../components/SafeImage';
import { NIGHTLY_URL } from '../../config';
import LiquidMetalBackground from '../../shaders/LiquidMetalBackground';
import { assetUrl } from '../../utils/assets';

const ShaderNarrativeHero = () => {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = !!shouldReduceMotion;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  });

  const reducedProgress = useMotionValue(0);
  const progress = reducedMotion ? reducedProgress : scrollYProgress;

  const hue = useTransform(progress, [0, 0.35, 0.7, 1], [210, 210, 28, 210]);
  const energy = useTransform(progress, [0, 0.25, 0.6, 0.85, 1], [0.15, 0.35, 0.75, 0.45, 0.2]);
  const hueRotateDeg = useTransform(hue, (value) => value - 210);
  const saturate = useTransform(energy, (value) => 1 + value * 0.8);
  const contrast = useTransform(energy, (value) => 1 + value * 0.28);
  const brightness = useTransform(energy, (value) => 0.92 + value * 0.1);
  const filterString = useTransform(
    [hueRotateDeg, saturate, contrast, brightness],
    (values) => {
      const [nextHueRotate, nextSaturate, nextContrast, nextBrightness] = values as number[];
      return `hue-rotate(${nextHueRotate.toFixed(1)}deg) saturate(${nextSaturate.toFixed(
        2
      )}) contrast(${nextContrast.toFixed(2)}) brightness(${nextBrightness.toFixed(2)})`;
    }
  );

  const orangeWashOpacity = useTransform(progress, [0.6, 0.78, 0.9], [0, 0.22, 0]);

  const deviceY = reducedMotion ? useMotionValue(0) : useTransform(progress, [0, 0.5, 1], [6, -6, 4]);
  const deviceScale = reducedMotion ? useMotionValue(1) : useTransform(progress, [0, 0.5, 1], [1, 1.015, 1]);
  const phoneX = reducedMotion ? useMotionValue(0) : useTransform(progress, [0, 1], [-8, 6]);
  const phoneY = reducedMotion ? useMotionValue(0) : useTransform(progress, [0, 1], [6, -4]);
  const macY = reducedMotion ? useMotionValue(0) : useTransform(progress, [0, 1], [-4, 6]);

  const iconX = reducedMotion ? useMotionValue(0) : useTransform(progress, [0, 1], [12, -10]);
  const iconY = reducedMotion ? useMotionValue(0) : useTransform(progress, [0, 1], [14, -12]);
  const iconRotate = reducedMotion ? useMotionValue(0) : useTransform(progress, [0, 1], [-1.5, 1.5]);
  const iconScale = reducedMotion ? useMotionValue(1) : useTransform(progress, [0, 0.5, 1], [1, 1.06, 1]);

  const ctaPlateOpacity = reducedMotion
    ? useMotionValue(0.35)
    : useTransform(progress, [0.85, 1], [0, 0.65]);

  const introInitial = reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 };

  return (
    <section ref={wrapperRef} className="relative h-[320vh]">
      <div id="cta" className="pointer-events-none absolute top-[260vh] h-px w-px" aria-hidden="true" />
      <div className="sticky top-0 h-screen">
        <div className="relative h-full overflow-hidden">
          <motion.div className="pointer-events-none absolute inset-0" style={{ filter: filterString }}>
            <LiquidMetalBackground className="pointer-events-none absolute inset-0" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,140,60,0.18),transparent_55%)]"
            style={{ opacity: orangeWashOpacity }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80" />
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                <motion.div
                  className="space-y-6"
                  initial={introInitial}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0.5 : 0.9, ease: 'easeOut' }}
                >
                  <h1 className="text-5xl font-semibold leading-tight text-white md:text-6xl">
                    Pitch as a physical space.
                  </h1>
                  <p className="text-lg text-white/70">
                    Just-intonation tuner & lattice — serious tracking, zero clutter.
                  </p>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                    iOS • iPadOS • macOS (Catalyst) • Offline • No accounts
                  </p>
                  <div className="relative flex flex-wrap items-center gap-4">
                    <motion.div
                      className="pointer-events-none absolute -inset-x-3 -inset-y-3 rounded-2xl border border-white/15 bg-white/10"
                      style={{ opacity: ctaPlateOpacity }}
                    />
                    <div className="relative z-10 flex flex-wrap items-center gap-4">
                      <AppStoreBadge variant="white" />
                      <div className="text-sm text-white/60">
                        <a
                          className="text-white/80 hover:text-white"
                          href={NIGHTLY_URL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Nightly builds via TestFlight.
                        </a>{' '}
                        For new features and regressions-in-flight.
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="relative flex items-center justify-center">
                  <motion.div className="relative" style={{ y: deviceY, scale: deviceScale }}>
                    <SafeImage
                      src={assetUrl('assets/hero-device-ipad@2x.png')}
                      alt="Tenney on iPad"
                      className="w-[420px] max-w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
                    />
                    <motion.div className="absolute -left-20 bottom-6" style={{ x: phoneX, y: phoneY }}>
                      <SafeImage
                        src={assetUrl('assets/hero-device-iphone@2x.png')}
                        alt="Tenney on iPhone"
                        className="w-[180px] max-w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                      />
                    </motion.div>
                    <motion.div className="absolute -right-12 top-6" style={{ y: macY }}>
                      <SafeImage
                        src={assetUrl('assets/hero-device-macos@2x.png')}
                        alt="Tenney on macOS"
                        className="w-[160px] max-w-full opacity-85 drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
                      />
                    </motion.div>
                  </motion.div>

                  <div className="absolute right-8 top-8">
                    <ParallaxLayer strength={18}>
                      <motion.div
                        style={{ x: iconX, y: iconY, rotate: iconRotate, scale: iconScale }}
                        className="relative"
                      >
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] bg-white/15 shadow-[0_0_45px_rgba(120,170,255,0.45)] ring-1 ring-white/30">
                          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-70" />
                          <SafeImage
                            src={assetUrl('app-icon.png')}
                            alt="Tenney app icon"
                            className="relative h-16 w-16"
                          />
                        </div>
                      </motion.div>
                    </ParallaxLayer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShaderNarrativeHero;
