import { useEffect, useMemo, useRef } from "react";
import BackgroundField from "../components/BackgroundField";
import StoryStage from "../components/StoryStage";
import CTACluster from "../components/CTACluster";
import { Beat } from "../components/BeatCard";

const screenBase = "/tenney-web/assets/screens";

export default function Home() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const beats = useMemo<Beat[]>(
    () => [
      {
        id: "beat-1",
        title: "Pitch as a physical space",
        lede: "See harmony as a dimensional field—every touchpoint mapped, tuned, and spatially anchored.",
        bullets: [
          "Spatial pitch layout that feels tactile, not abstract.",
          "Instant read of interval distance and center of gravity.",
          "A calm canvas for composition and rehearsal.",
        ],
        shotSrc: `${screenBase}/screen-01-lattice-overview.png`,
        accent: "cool",
      },
      {
        id: "beat-2",
        title: "Lattice with meaning",
        lede: "Ratio intelligence rides alongside the lattice—context without clutter.",
        bullets: [
          "Ratio cards float near the moment you need them.",
          "Live tension readouts for precise tuning.",
          "Harmonic intent stays visible at a glance.",
        ],
        shotSrc: `${screenBase}/screen-02-lattice-info-card.png`,
        accent: "cool",
      },
      {
        id: "beat-3",
        title: "Tools: Pads / Builder / Scope",
        lede: "Shift from exploration to production without leaving the lattice.",
        bullets: [
          "Pads for immediate playability.",
          "Builder for structural drafting.",
          "Scope for continuous harmonic feedback.",
        ],
        shotSrc: `${screenBase}/screen-03-pads-builder-scope.png`,
        accent: "cool",
      },
      {
        id: "beat-4",
        title: "Scales: save + export",
        lede: "Capture harmonic states and move them across devices or performers.",
        bullets: [
          "Store scale families with metadata.",
          "Export ready for stage rigs.",
          "Recall quickly during rehearsal.",
        ],
        shotSrc: `${screenBase}/screen-04-scale-save-export.png`,
        accent: "cool",
      },
      {
        id: "beat-5",
        title: "Land pitch",
        lede: "The tuner gives you a trustworthy landing point before any performance." ,
        bullets: [
          "Adaptive pitch detection that reads intent.",
          "Visual confidence bars for stability.",
          "Immediate comparison against lattice targets.",
        ],
        shotSrc: `${screenBase}/screen-05-tuner-overview.png`,
        accent: "warm",
      },
      {
        id: "beat-6",
        title: "Lock stability",
        lede: "Lock in the center and hold it even as the space around it breathes.",
        bullets: [
          "Hold states for sustained focus.",
          "Intonation drift visualization.",
          "Subtle cues for returning to center.",
        ],
        shotSrc: `${screenBase}/screen-06-tuner-locked.png`,
        accent: "warm",
        details: {
          summary: "Under the hood",
          body: [
            "Tenney tracks harmonic vectors in real time and smooths jitter using adaptive filtering.",
            "A fast path keeps low-latency feedback while a slower layer ensures the lock stays true.",
          ],
        },
      },
      {
        id: "beat-7",
        title: "Prime overlays",
        lede: "Reveal harmonic structure with overlays that emphasize prime relationships.",
        bullets: [
          "Overlay modes tuned for just intonation.",
          "Instant visibility into complex ratios.",
          "Layered context without sacrificing clarity.",
        ],
        shotSrc: `${screenBase}/screen-07-prime-overlays.png`,
        accent: "cool",
      },
      {
        id: "beat-8",
        title: "Stage-minded ergonomics",
        lede: "Every control is built for quick reads in a live performance setting.",
        bullets: [
          "Large interaction zones for confident play.",
          "Balanced contrast for dim venues.",
          "Layouts designed around performer flow.",
        ],
        shotSrc: `${screenBase}/screen-08-stage-mode.png`,
        accent: "warm",
      },
      {
        id: "beat-9",
        title: "Take Tenney on stage",
        lede: "Download, join the beta, or run nightly builds—the full ecosystem is ready.",
        bullets: [
          "Ship-ready iOS release today.",
          "Opt into new tools before release.",
          "Nightly builds for advanced workflows.",
        ],
        shotSrc: `${screenBase}/screen-08-stage-mode.png`,
        accent: "warm",
        isCTA: true,
      },
    ],
    [],
  );

  useEffect(() => {
    const preload = [
      `${screenBase}/screen-01-lattice-overview.png`,
      `${screenBase}/screen-02-lattice-info-card.png`,
    ];
    preload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <main className="relative tenney-pagegrid">
      <BackgroundField />
      <StoryStage
        beats={beats}
        onExit={() => contentRef.current?.scrollIntoView({ behavior: "smooth" })}
      />
      <div ref={contentRef} className="mx-auto max-w-5xl space-y-16 px-6 py-16">
        <section className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-10 shadow-soft backdrop-blur-lg dark:bg-slate-900/70">
          <h3 className="text-2xl font-semibold">Designed for the long rehearsal</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Tenney blends an editorial interface with a scientific core, keeping the lattice stable while
            performers move quickly between harmonic states.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Performance ready",
                description: "High-contrast meters, confident touch targets, and a calm stage view.",
              },
              {
                title: "Research friendly",
                description: "Capture ratio data, organize scales, and export sessions with context.",
              },
              {
                title: "Collaborative",
                description: "Share scale libraries and lattice snapshots with ensembles.",
              },
            ].map((item) => (
              <div key={item.title} className="tenney-plusgrid rounded-card border border-tenney-line bg-white/70 p-5 dark:bg-slate-950/60">
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-10 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Ready to explore Tenney?</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Install the app, join TestFlight, or try nightly builds for early features.
              </p>
            </div>
            <CTACluster />
          </div>
        </section>
        <footer className="text-xs text-slate-500 dark:text-slate-400">
          © 2025 Tenney Devices. Crafted for harmonic explorers.
        </footer>
      </div>
    </main>
  );
}
