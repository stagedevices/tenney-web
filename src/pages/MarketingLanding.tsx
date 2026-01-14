import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import AmbientBackground from '../components/AmbientBackground';
import GlassNav from '../components/GlassNav';
import StickyPhone, { Screen } from '../components/StickyPhone';
import { useReducedMotionPreference } from '../lib/reducedMotion';

const sectionIds = ['hero', 'why', 'lattice', 'overlays', 'tuner', 'stage', 'cta'];

const screens: Screen[] = [
  {
    key: 'hero-lattice',
    src: '/assets/screens/screen-01-hero-lattice-overview@2x.png',
    alt: 'Lattice overview',
    sectionId: 'hero',
    chip: { label: 'Lattice', value: 'Map' }
  },
  {
    key: 'lattice-focus',
    src: '/assets/screens/screen-02-lattice-focus-heji-lens@2x.png',
    alt: 'HEJI lens focus',
    sectionId: 'lattice',
    chip: { label: 'HEJI', value: 'Lens' }
  },
  {
    key: 'prime-overlays',
    src: '/assets/screens/screen-03-lattice-prime-overlays@2x.png',
    alt: 'Prime overlays',
    sectionId: 'overlays',
    chip: { label: 'Prime', value: '7/11' }
  },
  {
    key: 'axis-shift',
    src: '/assets/screens/screen-04-lattice-axis-shift@2x.png',
    alt: 'Axis shift',
    sectionId: 'why',
    chip: { label: 'Fold', value: 'Band' }
  },
  {
    key: 'tuner-lock',
    src: '/assets/screens/screen-05-tuner-live-lock@2x.png',
    alt: 'Tuner lock',
    sectionId: 'tuner',
    chip: { label: 'PLL', value: 'Lock' }
  },
  {
    key: 'stage-mode',
    src: '/assets/screens/screen-06-tuner-stage-mode@2x.png',
    alt: 'Stage mode',
    sectionId: 'stage',
    chip: { label: 'Stage', value: 'Safe' }
  },
  {
    key: 'modes-a4',
    src: '/assets/screens/screen-07-tuner-modes-and-a4@2x.png',
    alt: 'Modes and A4 reference',
    sectionId: 'cta',
    chip: { label: 'A4', value: 'Custom' }
  }
];

const features = [
  { id: 'why', title: 'Pitch as a physical space' },
  { id: 'lattice', title: 'Lattice-as-map' },
  { id: 'overlays', title: 'Prime overlays' },
  { id: 'tuner', title: 'PLL lock' },
  { id: 'stage', title: 'Stage mode' },
  { id: 'cta', title: 'Join the beta' }
];

export default function MarketingLanding() {
  const reducedMotion = useReducedMotionPreference();
  const { scrollY } = useScroll();
  const heroShift = useTransform(scrollY, [0, 320], [0, -18]);

  const handleChipClick = (id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 }
  };

  return (
    <div className="relative min-h-screen text-white">
      <AmbientBackground />
      <GlassNav />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
        <div className="flex flex-col gap-20">
          <section id="hero" className="scroll-mt-24">
            <motion.div
              {...reveal}
              style={{ y: reducedMotion ? 0 : heroShift }}
              className="flex flex-col gap-6"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">2026 performance tuning</p>
              <h1 className="text-balance text-4xl font-semibold leading-tight text-white md:text-5xl">
                Pitch as a physical space.
              </h1>
              <p className="text-balance text-lg text-white/70">
                Just-intonation tuner &amp; lattice — serious tracking, zero clutter.{' '}
                <span className="text-white">See harmony. Land pitch.</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/beta"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Join public beta
                  <span className="text-white/60 transition group-hover:text-white">→</span>
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 transition hover:-translate-y-0.5 hover:text-white"
                >
                  Read docs
                </Link>
              </div>
              <ul className="mt-6 grid gap-3 text-sm text-white/70">
                <li>1. Lattice as a map of harmony — pitch becomes a physical space.</li>
                <li>2. Just-intonation tuner + lattice with serious tracking and zero clutter.</li>
                <li>3. Prime-aware exploration with pan/zoom/fold and 7/11 overlays.</li>
                <li>4. Locks and stays locked with FFT + phase-slope + 2nd-order PLL.</li>
                <li>5. Stage-safe mode, pro-input aware, HEJI/ratio labels, adjustable A4.</li>
              </ul>
            </motion.div>
          </section>

          <div className="lg:hidden">
            <StickyPhone screens={screens} sectionIds={sectionIds} className="mt-8" />
          </div>

          <section id="why" className="scroll-mt-24">
            <motion.div {...reveal} className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-white">Why Tenney</h2>
              <p className="text-white/70">
                The lattice is a tactile map. You can hear, see, and land pitch without the noise. Every
                control is tuned for performers who move fast.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => handleChipClick(feature.id)}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{feature.title}</span>
                      <span className="text-white/50 transition group-hover:text-white">↗</span>
                    </div>
                    <div className="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-aurora/40 via-plasma/40 to-ember/40 opacity-0 transition group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="lattice" className="scroll-mt-24">
            <motion.div {...reveal} className="flex flex-col gap-5">
              <h2 className="text-2xl font-semibold text-white">Lattice as instrument</h2>
              <p className="text-white/70">
                The lattice is a navigable harmony map. Pan and zoom to inspect micro-regions, fold the
                audible band into view, and pull the HEJI lens when ratios get dense.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
                Density-aware labels, ratio/HEJI overlays, and contextual focus keep the lattice
                legible even at extreme zoom.
              </div>
            </motion.div>
          </section>

          <section id="overlays" className="scroll-mt-24">
            <motion.div {...reveal} className="flex flex-col gap-5">
              <h2 className="text-2xl font-semibold text-white">Prime overlays, exploration-first</h2>
              <p className="text-white/70">
                Toggle prime overlays (7, 11) and explore harmonic neighborhoods with zero clutter.
                The lattice adapts density and labeling as you move.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Prime 7', 'Prime 11', 'Adaptive labels', 'Fold band'].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="tuner" className="scroll-mt-24">
            <motion.div {...reveal} className="flex flex-col gap-5">
              <h2 className="text-2xl font-semibold text-white">Locking tuner, zero drama</h2>
              <p className="text-white/70">
                Real-time FFT powered by Accelerate plus phase-slope refinement feeds a 2nd-order
                digital PLL. It locks fast and stays locked, even on stage.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  Pro-input awareness for complex sources and harmonics.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  Ratio + HEJI labels with adjustable A4 reference.
                </div>
              </div>
            </motion.div>
          </section>

          <section id="stage" className="scroll-mt-24">
            <motion.div {...reveal} className="flex flex-col gap-5">
              <h2 className="text-2xl font-semibold text-white">Stage-safe, performer-minded</h2>
              <p className="text-white/70">
                Stage mode boosts contrast, locks UI focus, and keeps the lattice readable under
                lights. Every interaction respects your performance flow.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                Switch between modes without losing context — tuner, lattice, and overlays sync in
                real time.
              </div>
            </motion.div>
          </section>

          <section id="cta" className="scroll-mt-24">
            <motion.div {...reveal} className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8">
              <h2 className="text-3xl font-semibold text-white">Ready to explore pitch space?</h2>
              <p className="text-white/70">
                Join the public beta, get early builds, and shape the 2026 tuning workflow.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/beta"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                >
                  Join public beta
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:text-white"
                >
                  Read docs
                </Link>
              </div>
            </motion.div>
          </section>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <StickyPhone screens={screens} sectionIds={sectionIds} />
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs uppercase tracking-[0.3em] text-white/50">
              Always-visible lattice preview
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
