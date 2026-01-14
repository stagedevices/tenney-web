import { useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LiquidMetal } from '@paper-design/shaders-react';
import AppStoreBadge from '../components/AppStoreBadge';
import FlutedGlassPanel from '../shaders/FlutedGlassPanel';
import { HERO_SCROLL_DISTANCE_VH, SHADER_DPR, SHADER_MAX_PIXELS, SHADER_SEED } from '../constants';

const HeroScrolly = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  });
  const prefersReducedMotion = useReducedMotion();

  const beat0Opacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 1, 0]);
  const beat1Opacity = useTransform(scrollYProgress, [0.08, 0.16, 0.22], [0, 1, 0]);
  const beat2Opacity = useTransform(scrollYProgress, [0.22, 0.35, 0.48], [0, 1, 0]);
  const beat3Opacity = useTransform(scrollYProgress, [0.48, 0.58, 0.66], [0, 1, 0]);
  const beat4Opacity = useTransform(scrollYProgress, [0.66, 0.74, 0.86], [0, 1, 0]);
  const beat5Opacity = useTransform(scrollYProgress, [0.86, 0.94, 1], [0, 1, 1]);
  const axisDraw = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const tunerReveal = useTransform(scrollYProgress, [0.66, 0.86], [0, 1]);

  const chips = useMemo(
    () => [
      { label: '3–31', tone: 'border-e3blue/60 text-e3blue' },
      { label: 'saved', tone: 'border-white/30 text-white/80' },
      { label: 'export', tone: 'border-e5orange/60 text-e5orange' },
    ],
    []
  );

  const ctaOpacity = useTransform(scrollYProgress, [0, 0.1, 0.18, 0.84, 0.9, 1], [1, 1, 0, 0, 1, 1]);

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: `${HERO_SCROLL_DISTANCE_VH}vh` }}
    >
      <div data-hero-sentinel className="absolute top-0 h-px w-px" />
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">Tenney</p>
              <motion.h1
                className="text-4xl font-semibold leading-tight text-white md:text-5xl"
                style={{ opacity: prefersReducedMotion ? 1 : beat0Opacity }}
              >
                Just intonation, as a navigable instrument.
              </motion.h1>
              <p className="text-lg text-white/80">Tune to 1¢. Traverse ratio space. Save and share systems.</p>
              <p className="text-xs text-white/60">iOS • iPadOS • macOS (Catalyst) • Offline • No accounts</p>
              <motion.div
                id="download"
                className="flex flex-wrap items-center gap-4"
                style={{ opacity: prefersReducedMotion ? 1 : ctaOpacity }}
              >
                <div className="relative rounded-3xl border border-white/20 bg-white/5 p-4">
                  <LiquidMetal
                    className="absolute inset-0 -z-10 rounded-3xl"
                    colorBack="#0B0E14"
                    colorTint="#2B8CFF"
                    distortion={0.4}
                    contour={0.7}
                    repetition={4}
                    angle={120}
                    speed={0}
                    frame={SHADER_SEED}
                    minPixelRatio={SHADER_DPR}
                    maxPixelCount={SHADER_MAX_PIXELS}
                  />
                  <AppStoreBadge variant="white" />
                </div>
                <Link to="/nightly" className="text-sm text-e5orange hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-e5orange rounded">Nightly builds</Link>
              </motion.div>
            </div>
            <div className="relative h-[520px] w-full">
              <div className="absolute inset-0 rounded-[32px] border border-white/15 bg-white/5" />
              <FlutedGlassPanel className="absolute inset-0 rounded-[32px] opacity-70" />
              <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_0_40px_rgba(255,255,255,0.12)]" />
              <motion.img
                src="/assets/hero-lattice-card@2x.png"
                alt="Lattice panel"
                className="absolute left-8 top-10 w-[70%] rounded-3xl shadow-2xl"
                style={{ opacity: prefersReducedMotion ? 1 : beat2Opacity }}
              />
              <motion.img
                src="/assets/hero-tuner-cards@2x.png"
                alt="Tuner panel"
                className="absolute bottom-8 right-2 w-[65%] rounded-3xl shadow-2xl"
                style={{ opacity: prefersReducedMotion ? 1 : tunerReveal }}
              />
              <svg className="absolute inset-0" viewBox="0 0 520 520">
                <motion.path
                  d="M120 380 L260 220 L400 320"
                  stroke="rgba(43,140,255,0.9)"
                  strokeWidth="4"
                  fill="none"
                  pathLength={1}
                  style={{ pathLength: prefersReducedMotion ? 1 : axisDraw }}
                />
              </svg>
              <motion.div className="absolute left-24 top-44 flex items-center gap-2" style={{ opacity: prefersReducedMotion ? 1 : beat1Opacity }}>
                <span className="h-3 w-3 rounded-full bg-e3blue shadow-glow" />
                <span className="text-xs text-white/80">root</span>
              </motion.div>
              <motion.div className="absolute right-16 top-56 flex items-center gap-2" style={{ opacity: prefersReducedMotion ? 1 : beat1Opacity }}>
                <span className="h-3 w-3 rounded-full bg-e5orange shadow-glow" />
                <span className="text-xs text-white/80">limit</span>
              </motion.div>
              <motion.div className="absolute left-12 bottom-14 space-y-3" style={{ opacity: prefersReducedMotion ? 1 : beat2Opacity }}>
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">Traverse. Select. Lock.</p>
                <div className="flex gap-2">
                  {['2/1', '3/2', '5/4', '7/4'].map((label) => (
                    <span key={label} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">{label}</span>
                  ))}
                </div>
              </motion.div>
              <motion.div className="absolute right-10 bottom-24 flex items-center gap-2" style={{ opacity: prefersReducedMotion ? 1 : beat3Opacity }}>
                {chips.map((chip) => (
                  <span key={chip.label} className={`rounded-full border px-3 py-1 text-xs ${chip.tone}`}>{chip.label}</span>
                ))}
                <span className="text-xs text-white/60">share</span>
              </motion.div>
              <motion.div className="absolute right-12 top-20 space-y-2 text-right" style={{ opacity: prefersReducedMotion ? 1 : beat4Opacity }}>
                <span className="inline-flex rounded-full border border-e5orange/60 px-3 py-1 text-xs text-e5orange">1¢</span>
                <p className="text-xs text-white/70">Tap + hold to lock.</p>
              </motion.div>
              <motion.div className="absolute left-8 top-8" style={{ opacity: prefersReducedMotion ? 1 : beat5Opacity }}>
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">Resolve</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroScrolly;
