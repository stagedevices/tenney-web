import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GlassPanel from '../../components/GlassPanel';
import ChipRail from '../../components/ChipRail';
import ParallaxLayer from '../../components/ParallaxLayer';
import LiquidMetalBackground from '../../shaders/LiquidMetalBackground';
import AppStoreBadge from '../../components/AppStoreBadge';
import SafeImage from '../../components/SafeImage';
import { NIGHTLY_URL } from '../../config';
import { assetUrl } from '../../utils/assets';

const MODULE_COUNT = 8;

const specChips = [
  'Phase-slope refinement',
  '2nd-order digital PLL',
  'Real-FFT (Accelerate)',
  'Prime-limit control',
  'HEJI lens',
  'Pro audio input',
  'Stage mode',
  'Scale library',
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const StackLiftStage = () => {
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (reducedMotion) {
      return;
    }
    const idx = clamp(Math.floor(value * MODULE_COUNT), 0, MODULE_COUNT - 1);
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const showSpecRail = reducedMotion ? true : active >= 1;

  const renderModule = (index: number) => {
    switch (index) {
      case 0:
        return (
          <GlassPanel className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Lattice</p>
                <h3 className="text-2xl font-semibold text-white">Traverse • Select • Lock</h3>
                <div className="mt-3 flex gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                  <span>Traverse</span>
                  <span>Select</span>
                  <span>Lock</span>
                </div>
              </div>
              <SafeImage
                src={assetUrl('assets/hero-module-lattice@2x.png')}
                alt="Lattice module"
                className="h-20 w-20 object-contain"
              />
            </div>
            <div className="h-1 w-full rounded-full bg-white/10">
              <div className="h-1 w-1/3 rounded-full bg-white/60" />
            </div>
          </GlassPanel>
        );
      case 1:
        return (
          <GlassPanel className="flex h-full flex-col justify-center gap-4 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Limits</p>
                <h3 className="text-2xl font-semibold text-white">3–31 limits</h3>
                <p className="mt-2 text-sm text-white/60">Prime-limit control with snap-in references.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                {['3', '5', '7', '11'].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-center">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </GlassPanel>
        );
      case 2:
        return (
          <GlassPanel className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Library</p>
                <h3 className="text-2xl font-semibold text-white">Save, export, share</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                  {['saved', 'export', 'Scala'].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <SafeImage
                src={assetUrl('assets/hero-module-library@2x.png')}
                alt="Library module"
                className="h-20 w-20 object-contain"
              />
            </div>
          </GlassPanel>
        );
      case 3:
        return (
          <GlassPanel className="flex h-full flex-col justify-center gap-4 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Tuner family</p>
                <h3 className="text-2xl font-semibold text-white">1¢ precision</h3>
                <p className="mt-2 text-sm text-white/60">
                  Fine-grained readouts designed for real tuning work.
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 text-xl font-semibold text-white">
                1¢
              </div>
            </div>
          </GlassPanel>
        );
      case 4:
        return (
          <GlassPanel className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8 shadow-[0_0_40px_rgba(43,140,255,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Performance</p>
                <h3 className="text-3xl font-semibold text-white">Lock tuner • Stage mode</h3>
                <p className="mt-2 text-sm text-white/60">Tap + hold to lock.</p>
              </div>
              <SafeImage
                src={assetUrl('assets/hero-module-tuner@2x.png')}
                alt="Tuner module"
                className="h-20 w-20 object-contain"
              />
            </div>
          </GlassPanel>
        );
      default:
        return (
          <div className="flex h-full flex-col justify-center rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="mb-6 h-2 w-full rounded-full bg-gradient-to-r from-white/5 via-white/40 to-white/5" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Ready</p>
                <h3 className="text-2xl font-semibold text-white">Download Tenney</h3>
              </div>
              <AppStoreBadge variant="white" />
            </div>
            <p className="mt-4 text-sm text-white/60">
              <a className="text-white/80 hover:text-white" href={NIGHTLY_URL}>
                Nightly builds via TestFlight.
              </a>{' '}
              For new features and regressions-in-flight.
            </p>
          </div>
        );
    }
  };

  return (
    <section ref={wrapperRef} className="relative h-[300vh]">
      <div id="cta" className="pointer-events-none absolute top-[240vh] h-px w-px" aria-hidden="true" />
      <div className="sticky top-0 h-screen">
        <div className="relative h-full overflow-hidden">
          <LiquidMetalBackground className="pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          <div className="relative z-10 flex h-full flex-col justify-center">
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6">
              <div className="relative grid h-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">StackLift Stage</p>
                  <h1 className="text-5xl font-semibold leading-tight text-white md:text-6xl">
                    Pitch as a physical space.
                  </h1>
                  <p className="text-lg text-white/70">
                    Just-intonation tuner & lattice — serious tracking, zero clutter.
                  </p>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                    iOS • iPadOS • macOS (Catalyst) • Offline • No accounts
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <AppStoreBadge variant="white" />
                    <div className="text-sm text-white/60">
                      <Link className="text-white/80 hover:text-white" to="/nightly">
                        Nightly builds via TestFlight.
                      </Link>{' '}
                      For new features and regressions-in-flight.
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ParallaxLayer className="relative">
                      <div className="relative">
                        <SafeImage
                          src={assetUrl('assets/hero-device-ipad@2x.png')}
                          alt="Tenney on iPad"
                          className="w-[420px] max-w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
                        />
                        <SafeImage
                          src={assetUrl('assets/hero-device-iphone@2x.png')}
                          alt="Tenney on iPhone"
                          className="absolute -left-20 bottom-8 w-[180px] max-w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                        />
                        <SafeImage
                          src={assetUrl('assets/hero-device-macos@2x.png')}
                          alt="Tenney on macOS"
                          className="absolute -right-10 top-4 w-[160px] max-w-full opacity-80 drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
                        />
                      </div>
                    </ParallaxLayer>
                  </div>
                  <ParallaxLayer strength={20}>
                    <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-white/10 shadow-[0_0_40px_rgba(43,140,255,0.45)] backdrop-blur">
                      <SafeImage src={assetUrl('app-icon.png')} alt="Tenney app icon" className="h-20 w-20" />
                    </div>
                  </ParallaxLayer>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {showSpecRail && (
                  <motion.div
                    key="spec-rail"
                    className="mt-8"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ChipRail chips={specChips} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8">
                <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur sm:min-h-[380px] lg:min-h-[420px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      className="absolute inset-0"
                      initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -32, filter: 'blur(10px)' }}
                      transition={{ type: 'spring', stiffness: 140, damping: 22 }}
                    >
                      {renderModule(active)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackLiftStage;
