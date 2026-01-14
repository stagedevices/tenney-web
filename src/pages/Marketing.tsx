import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import StickyPhone, { StickyPhoneScreen } from "../components/StickyPhone";

const sectionClass =
  "scroll-mt-[calc(var(--navH)+40px)] space-y-4 py-16 md:py-24";

const Marketing = () => {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  const screens = useMemo<StickyPhoneScreen[]>(
    () => [
      {
        key: "hero",
        sectionId: "hero",
        src: "/assets/screens/screen-01-hero-lattice-overview@2x.png",
        alt: "Tenney lattice overview",
        chip: { title: "OVERVIEW", value: "LATTICE" },
      },
      {
        key: "why",
        sectionId: "why",
        src: "/assets/screens/screen-02-lattice-focus-heji-lens@2x.png",
        alt: "HEJI focus lens",
        chip: { title: "HEJI", value: "LENS" },
      },
      {
        key: "lattice",
        sectionId: "lattice",
        src: "/assets/screens/screen-03-lattice-prime-overlays@2x.png",
        alt: "Prime overlays",
        chip: { title: "PRIME", value: "7/11" },
      },
      {
        key: "axis",
        sectionId: "axis",
        src: "/assets/screens/screen-04-lattice-axis-shift@2x.png",
        alt: "Axis shift",
        chip: { title: "AXIS", value: "SHIFT" },
      },
      {
        key: "tuner",
        sectionId: "tuner",
        src: "/assets/screens/screen-05-tuner-live-lock@2x.png",
        alt: "Live lock",
        chip: { title: "PLL", value: "LOCK" },
      },
      {
        key: "stage",
        sectionId: "stage",
        src: "/assets/screens/screen-06-tuner-stage-mode@2x.png",
        alt: "Stage mode",
        chip: { title: "STAGE", value: "MODE" },
      },
      {
        key: "beta",
        sectionId: "beta",
        src: "/assets/screens/screen-07-tuner-modes-and-a4@2x.png",
        alt: "Modes and A4",
        chip: { title: "A4", value: "REF" },
      },
    ],
    [],
  );

  const chips = [
    { title: "PLL lock", target: "tuner" },
    { title: "Real FFT", target: "tuner" },
    { title: "HEJI lens", target: "lattice" },
    { title: "Prime overlays 7/11", target: "lattice" },
    { title: "Stage mode", target: "stage" },
    { title: "Pro input", target: "tuner" },
    { title: "Scale library", target: "beta" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    element.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <section id="hero" ref={heroRef} className={sectionClass}>
            <motion.div
              style={reducedMotion ? undefined : { y: heroY, opacity: heroOpacity }}
              className="space-y-6"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                Tenney 2026
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Pitch as a physical space.
              </h1>
              <p className="max-w-xl text-lg text-white/70">
                Just-intonation tuner & lattice — serious tracking, zero clutter.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/beta"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-mint-400 px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:-translate-y-0.5"
                >
                  Join public beta
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 -translate-x-full bg-white/30 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                  </span>
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/40"
                >
                  Read docs
                </Link>
              </div>
            </motion.div>
          </section>

          <div className="lg:hidden">
            <StickyPhone screens={screens} />
          </div>

          <section id="why" className={sectionClass}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold">Why Tenney</h2>
              <p className="text-white/70">
                Tenney is “pitch as a physical space” — a lattice-as-map approach to
                harmony, powered by a just-intonation tuner that stays locked. See
                harmony. Land pitch.
              </p>
              <div className="flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <motion.button
                    key={chip.title}
                    type="button"
                    onClick={() => scrollToSection(chip.target)}
                    whileHover={reducedMotion ? undefined : { y: -4 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                    className="group relative overflow-hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80"
                  >
                    <span className="relative z-10">{chip.title}</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/10 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="lattice" className={sectionClass}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold">Lattice as map</h3>
              <p className="text-white/70">
                Pan, zoom, and fold the audible band. Toggle prime overlays for 7
                and 11, with density-adapting labels and a HEJI lens that makes
                harmonic intent visible at a glance.
              </p>
            </motion.div>
          </section>

          <section id="axis" className={sectionClass}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold">Prime-aware exploration</h3>
              <p className="text-white/70">
                Shift axes, fold the lattice, and explore pitch neighborhoods with
                confidence. Tenney turns the lattice into a performable map.
              </p>
            </motion.div>
          </section>

          <section id="tuner" className={sectionClass}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold">Tuner that locks</h3>
              <p className="text-white/70">
                Real-time FFT on Accelerate + phase-slope refinement feeds a
                second-order digital PLL, so Tenney locks and stays locked.
              </p>
            </motion.div>
          </section>

          <section id="stage" className={sectionClass}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold">Stage-safe & performer-minded</h3>
              <p className="text-white/70">
                Stage mode, pro-input awareness, ratio/HEJI labeling, and an
                adjustable A4 reference keep sessions focused and reliable.
              </p>
            </motion.div>
          </section>

          <section id="beta" className={sectionClass}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold">Built for performers</h3>
              <p className="text-white/70">
                Tenney is built for performers and composers who want harmony
                without friction. Join the public beta and help shape the launch.
              </p>
              <Link
                to="/beta"
                className="inline-flex items-center gap-2 rounded-full bg-mint-400 px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:-translate-y-0.5"
              >
                Join public beta
              </Link>
            </motion.div>
          </section>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[calc(var(--navH)+24px)]">
            <StickyPhone screens={screens} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Marketing;
