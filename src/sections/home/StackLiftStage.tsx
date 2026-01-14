import { motion, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import StageShell, { useStageShell } from '../../components/StageShell';
import GlassPanel from '../../components/GlassPanel';
import ChipRail from '../../components/ChipRail';
import ParallaxLayer from '../../components/ParallaxLayer';
import LiquidMetalBackground from '../../shaders/LiquidMetalBackground';
import AppStoreBadge from '../../components/AppStoreBadge';
import SafeImage from '../../components/SafeImage';
import { NIGHTLY_URL } from '../../config';

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

const moduleRanges = Array.from({ length: 8 }, (_, index) => {
  const step = 1 / 8;
  return { start: index * step, end: (index + 1) * step };
});

const useModuleMotion = (index: number) => {
  const { scrollYProgress, reducedMotion } = useStageShell();
  if (!scrollYProgress || reducedMotion) {
    return { opacity: 1, y: 0, scale: 1 };
  }
  const { start, end } = moduleRanges[index];
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, start + 0.1], [80, 0]);
  const scale = useTransform(scrollYProgress, [start, start + 0.1], [0.98, 1]);
  return { opacity, y, scale };
};

const StackLiftStage = () => {
  const { scrollYProgress, reducedMotion } = useStageShell();
  const specProgress = scrollYProgress
    ? useTransform(scrollYProgress, [0.1, 0.2], [0, 1])
    : undefined;
  const specY = useSpring(specProgress ? useTransform(specProgress, [0, 1], [32, 0]) : 0);
  const specOpacity = useSpring(specProgress ?? 1);

  const heroMotion = useModuleMotion(0);
  const latticeMotion = useModuleMotion(2);
  const limitsMotion = useModuleMotion(3);
  const libraryMotion = useModuleMotion(4);
  const tunerMotion = useModuleMotion(5);
  const performanceMotion = useModuleMotion(6);
  const ctaMotion = useModuleMotion(7);

  const showModules = !reducedMotion;

  return (
    <StageShell>
      <div className={reducedMotion ? 'relative pb-24' : 'sticky top-0 h-screen overflow-hidden'}>
        <LiquidMetalBackground className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="relative z-10 flex h-full flex-col justify-center">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6">
            <div className="relative grid h-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div className="space-y-6" style={heroMotion} initial={false}>
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
              </motion.div>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ParallaxLayer className="relative">
                    <div className="relative">
                      <SafeImage
                        src="/public/assets/hero-device-ipad@2x.png"
                        alt="Tenney on iPad"
                        className="w-[420px] max-w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
                      />
                      <SafeImage
                        src="/public/assets/hero-device-iphone@2x.png"
                        alt="Tenney on iPhone"
                        className="absolute -left-20 bottom-8 w-[180px] max-w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                      />
                      <SafeImage
                        src="/public/assets/hero-device-macos@2x.png"
                        alt="Tenney on macOS"
                        className="absolute -right-10 top-4 w-[160px] max-w-full opacity-80 drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
                      />
                    </div>
                  </ParallaxLayer>
                </div>
                <ParallaxLayer strength={20}>
                  <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-white/10 shadow-[0_0_40px_rgba(43,140,255,0.45)] backdrop-blur">
                    <SafeImage src="/public/assets/app-icon.png" alt="Tenney app icon" className="h-20 w-20" />
                  </div>
                </ParallaxLayer>
              </div>
            </div>
            <motion.div className="mt-10" style={{ opacity: specOpacity, y: specY }}>
              <ChipRail chips={specChips} />
            </motion.div>
            {reducedMotion && (
              <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-semibold text-white">Download Tenney</h2>
                <p className="mt-2 text-sm text-white/60">
                  Nightly builds via TestFlight. For new features and regressions-in-flight.
                </p>
                <div className="mt-4">
                  <AppStoreBadge variant="white" />
                </div>
              </div>
            )}
          </div>
        </div>

        {showModules && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-16 z-20 mx-auto flex max-w-6xl justify-center px-6"
            style={latticeMotion}
          >
            <GlassPanel className="pointer-events-auto w-full max-w-xl p-6">
              <div className="flex items-center justify-between">
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
                  src="/public/assets/hero-module-lattice@2x.png"
                  alt="Lattice module"
                  className="h-24 w-24 object-contain"
                />
              </div>
              <div className="mt-4 h-1 w-full rounded-full bg-white/10">
                <div className="h-1 w-1/3 rounded-full bg-white/60" />
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {showModules && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-28 z-20 mx-auto flex max-w-6xl justify-center px-6"
            style={limitsMotion}
          >
            <GlassPanel className="pointer-events-auto w-full max-w-lg p-6">
              <div className="flex items-start justify-between">
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
          </motion.div>
        )}

        {showModules && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-24 z-20 mx-auto flex max-w-6xl justify-center px-6"
            style={libraryMotion}
          >
            <GlassPanel className="pointer-events-auto w-full max-w-lg p-6">
              <div className="flex items-center justify-between">
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
                  src="/public/assets/hero-module-library@2x.png"
                  alt="Library module"
                  className="h-24 w-24 object-contain"
                />
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {showModules && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-24 z-20 mx-auto flex max-w-6xl justify-center px-6"
            style={tunerMotion}
          >
            <GlassPanel className="pointer-events-auto w-full max-w-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">Tuner family</p>
                  <h3 className="text-2xl font-semibold text-white">1¢ precision</h3>
                  <p className="mt-2 text-sm text-white/60">Fine-grained readouts designed for real tuning work.</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 text-xl font-semibold text-white">
                  1¢
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {showModules && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-20 z-20 mx-auto flex max-w-6xl justify-center px-6"
            style={performanceMotion}
          >
            <GlassPanel className="pointer-events-auto w-full max-w-2xl p-6 shadow-[0_0_40px_rgba(43,140,255,0.45)]">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">Performance</p>
                  <h3 className="text-3xl font-semibold text-white">Lock tuner • Stage mode</h3>
                  <p className="mt-2 text-sm text-white/60">Tap + hold to lock.</p>
                </div>
                <SafeImage
                  src="/public/assets/hero-module-tuner@2x.png"
                  alt="Tuner module"
                  className="h-24 w-24 object-contain"
                />
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {showModules && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-14 z-20 mx-auto flex max-w-6xl justify-center px-6"
            style={ctaMotion}
          >
            <div className="pointer-events-auto w-full max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
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
          </motion.div>
        )}
      </div>
    </StageShell>
  );
};

export default StackLiftStage;
