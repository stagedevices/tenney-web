import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BackgroundField from "../components/BackgroundField";
import {
  APP_STORE_BADGE_DARK,
  APP_STORE_BADGE_LIGHT,
  APP_STORE_LINK,
} from "../components/CTACluster";
import TenneyButton from "../components/TenneyButton";
import { useReducedMotion } from "../lib/reducedMotion";
import { useTheme } from "../lib/theme";

type AnchorItem = {
  id: string;
  label: string;
  type: "section" | "link";
  href?: string;
};

type FeatureSectionData = {
  id: string;
  title: string;
  thesis: string;
  bullets: string[];
  whyItMatters: string;
  underTheHood: string[];
  tryIt: string;
  figure?: "A" | "B" | "C" | "D";
};

const baseUrl = import.meta.env.BASE_URL || "/";

const phoneScreens = [
  {
    id: "pitch-as-space",
    src: `${baseUrl}assets/screens/screen-01-lattice-overview.png`,
    alt: "Tenney lattice overview",
    label: "Lattice overview",
  },
  {
    id: "lattice-meaning",
    src: `${baseUrl}assets/screens/screen-02-lattice-info-card.png`,
    alt: "Lattice information card",
    label: "Ratio details",
  },
  {
    id: "tools",
    src: `${baseUrl}assets/screens/screen-03-pads-builder-scope.png`,
    alt: "Pads builder and scope",
    label: "Builder tools",
  },
  {
    id: "export",
    src: `${baseUrl}assets/screens/screen-04-scale-save-export.png`,
    alt: "Export and save views",
    label: "Save + export",
  },
];

const anchorItems: AnchorItem[] = [
  { id: "pitch-as-space", label: "Pitch as space", type: "section" },
  { id: "lattice-meaning", label: "Lattice meaning", type: "section" },
  { id: "tools", label: "Tools", type: "section" },
  { id: "export", label: "Export", type: "section" },
  { id: "land-pitch", label: "Land pitch", type: "section" },
  { id: "lock", label: "Lock", type: "section" },
  { id: "overlays", label: "Overlays", type: "section" },
  { id: "stage", label: "Stage", type: "section" },
  { id: "white-paper", label: "White paper", type: "link", href: "/features/white-paper" },
];

const featureSections: FeatureSectionData[] = [
  {
    id: "pitch-as-space",
    title: "Pitch as space",
    thesis:
      "Tenney treats just intonation as a navigable surface, so pitch behaves like coordinates instead of a list.",
    bullets: [
      "Drag across fifths, thirds, and primes as physical directions rather than abstract math.",
      "Zoom to change the density of the lattice and see larger or tighter harmonic neighborhoods.",
      "Pin a reference pitch so every move keeps an ear-level anchor for tuning decisions.",
      "Preview relationships before committing, with spatial distance reflecting harmonic distance.",
    ],
    whyItMatters:
      "Spatial navigation shortens the time between imagining a ratio and landing on it. Instead of scrolling through long tuning menus, performers can place pitch in context, keep orientation, and move with intent. The lattice keeps the map visible so you always know where you are in the harmonic field.",
    underTheHood: [
      "The lattice is generated from prime vectors, centered around a configurable tonic.",
      "Grid density adapts to zoom so that step sizes remain readable on small screens.",
      "Anchors hold a reference note while the lattice re-centers for exploration.",
      "Every node retains its ratio label and cents offset for quick verification.",
    ],
    tryIt: "Open the lattice, drag toward a pure fifth, then zoom out to see the new neighborhood.",
  },
  {
    id: "lattice-meaning",
    title: "Lattice meaning",
    thesis:
      "Every pitch reveals its ratio, prime-limit context, and tonal role so the map stays interpretable.",
    bullets: [
      "Tap any node to reveal ratio, cents deviation, and its reduced fraction.",
      "See how prime limits shape the vocabulary by filtering to 5-limit, 7-limit, or beyond.",
      "Identify tonal gravity by comparing distances to your chosen tonic and anchor pitches.",
      "Mark landmarks to keep recurring ratios consistent across sessions.",
    ],
    whyItMatters:
      "Just intonation is only useful when the meaning of each pitch is clear. The lattice cards translate spatial placement into language: ratio, prime limit, and tonal gravity. That clarity keeps rehearsals efficient because everyone can point to the same harmonic definition.",
    underTheHood: [
      "Ratios are simplified to lowest terms and tagged by prime-limit vocabulary.",
      "The system computes cents offsets relative to 12-TET or a custom reference.",
      "Landmarks persist per scale so sessions reopen with consistent labels.",
      "The info card is optimized for one-hand use and quick reading on stage.",
    ],
    tryIt: "Tap a lattice node, switch the prime-limit filter, and watch the vocabulary narrow.",
  },
  {
    id: "tools",
    title: "Tools",
    thesis:
      "Builder tools turn lattice navigation into playable instruments with pads, scopes, and gestures.",
    bullets: [
      "Build pads that snap to chosen ratios for fast performance mapping.",
      "Use the scope to scan harmonic neighborhoods without leaving your playing surface.",
      "Capture ratio sets as collections, then reuse them in new layouts.",
      "Assign gesture lanes for bends, steps, or glissandi that respect JI ratios.",
    ],
    whyItMatters:
      "Mapping pitch to physical controls is the fastest way to make just intonation playable. Tenney’s tools keep the lattice in view while you design pads and gestures, so the tuning logic stays connected to the performance surface. The result is a playable grid that still speaks in ratios.",
    underTheHood: [
      "Pads reference ratio IDs, so layouts remain stable even if the tonic changes.",
      "Gesture lanes quantize to ratio steps, avoiding accidental drift.",
      "The builder caches layouts for instant switching during rehearsals.",
      "Scope previews run in parallel so you can audition without losing your place.",
    ],
    tryIt: "Open Pads Builder, assign a 5-limit triad, and sweep the scope to find neighboring color tones.",
  },
  {
    id: "export",
    title: "Export",
    thesis:
      "Tenney saves scales and exports tuning data in formats that travel between devices and DAWs.",
    bullets: [
      "Save collections as named scales with descriptive tags and version notes.",
      "Export to Scala, CSV, or tuning table formats for synthesis tools.",
      "Generate MTS-compatible tables for hardware or software instruments.",
      "Share project packs that include lattice landmarks and pad layouts.",
    ],
    whyItMatters:
      "A tuning is only as useful as its portability. Export tooling keeps your work consistent across instruments and sessions, so a scale built on Tenney can become a rehearsal preset, a DAW tuning file, and a performance backup without manual re-entry.",
    underTheHood: [
      "Exports include both ratio data and cents for compatibility across ecosystems.",
      "Project packs bundle lattice landmarks with builder layouts.",
      "Files are labeled with tonic and prime-limit metadata for quick recall.",
      "Share links are generated locally to keep workflows offline-friendly.",
    ],
    tryIt: "Save a scale, export a Scala file, and import it into your favorite synth.",
  },
  {
    id: "land-pitch",
    title: "Land pitch",
    thesis:
      "The tuner prioritizes quick pitch acquisition so you can arrive at the target ratio with confidence.",
    bullets: [
      "Clear pitch targets stay visible even when ambient noise shifts.",
      "A confidence band helps you decide when a pitch is stable enough to lock.",
      "Micro adjustments are quantified in cents so you can correct without guessing.",
      "You can toggle between absolute and ratio-relative readouts.",
    ],
    whyItMatters:
      "Landing a justly tuned note takes more than hearing a beat. The tuner gives you a visual lane that mirrors how performers listen: find the center, confirm stability, and commit. This shortens rehearsal time and helps ensembles align without verbal back-and-forth.",
    underTheHood: [
      "Pitch detection uses weighted windows to reduce jitter during quick entries.",
      "The display adapts sensitivity based on the ratio’s complexity.",
      "Confidence thresholds are tuned to avoid false locks while still feeling responsive.",
      "Relative mode references the current lattice anchor to keep context intact.",
    ],
    tryIt: "Set a target ratio, play your note, and watch the confidence band settle before you lock.",
    figure: "A",
  },
  {
    id: "lock",
    title: "Lock",
    thesis:
      "Lock mode constrains available pitches to a chosen vocabulary, keeping performance decisions clear.",
    bullets: [
      "Filter the lattice to a prime-limit vocabulary that matches the piece.",
      "Hold a lock while improvising to prevent accidental ratios.",
      "Switch locks mid-performance without clearing your pad layout.",
      "Use locks as rehearsal checkpoints to keep ensembles aligned.",
    ],
    whyItMatters:
      "When the harmonic space is large, decision fatigue can slow performers down. Lock mode narrows the vocabulary so you can move quickly inside a defined set, which is useful for ensemble coherence and for compositions that demand a specific prime-limit palette.",
    underTheHood: [
      "Lock filters are computed from ratio sets, not visual position alone.",
      "Vocabulary cones compress the lattice to show the active harmonic range.",
      "Locks can stack with pad assignments without remapping.",
      "Each lock state preserves its own anchor pitch and tonic offsets.",
    ],
    tryIt: "Choose a 7-limit lock, then jump between pads to feel the tighter vocabulary.",
    figure: "B",
  },
  {
    id: "overlays",
    title: "Overlays",
    thesis:
      "Overlay layers let you compare alternate tuning maps and export them as a coherent pack.",
    bullets: [
      "Stack multiple tuning overlays to compare harmonic options side by side.",
      "Toggle overlays to audition alternate ratios without losing the base map.",
      "Use overlays to rehearse modulations or contrasting harmonic colors.",
      "Bundle overlays into a shareable pack for collaborators.",
    ],
    whyItMatters:
      "Overlays are a fast way to test harmonic decisions in context. You can keep the core lattice stable while exploring alternative ratio sets, then export the outcome as a unified pack. This keeps experimentation lightweight and collaborative without mixing files manually.",
    underTheHood: [
      "Overlay stacks keep their own metadata, labels, and ratio notes.",
      "Export packs include overlays, pad layouts, and lock presets.",
      "Toggle states are stored per session for quick A/B checks.",
      "The overlay pipeline preserves consistent naming across formats.",
    ],
    tryIt: "Create two overlays for alternate cadences, then toggle them while playing your pad layout.",
    figure: "C",
  },
  {
    id: "stage",
    title: "Stage",
    thesis:
      "Stage views simplify performance with dedicated presentation styles for live contexts.",
    bullets: [
      "Gauge view gives a large, focused tuning target with minimal distraction.",
      "Chrono view tracks time-based performances with pitch checkpoints.",
      "Scope view keeps a mini lattice visible for situational awareness.",
      "Stage presets remember layout, locks, and overlays per piece.",
    ],
    whyItMatters:
      "Live performance demands clarity. Stage views strip away editing complexity and surface only what you need to tune or perform in the moment. This reduces cognitive load and makes it easier to stay connected to the ensemble.",
    underTheHood: [
      "Stage presets snapshot the exact tuning state, including locks and overlays.",
      "Presentation styles share a common timing engine for consistent cues.",
      "Each view is optimized for visibility in low-light performance settings.",
      "Switching views preserves the active tuning target and confidence state.",
    ],
    tryIt: "Save a stage preset, switch to Gauge view, and rehearse a sustained pitch change.",
    figure: "D",
  },
];

function useImageAspect(src: string, fallback = 9 / 19.5) {
  const [aspect, setAspect] = useState<number | null>(null);

  useEffect(() => {
    if (!src) {
      setAspect(fallback);
      return;
    }

    let active = true;
    const img = new Image();
    img.onload = () => {
      if (!active) return;
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      if (width && height) {
        setAspect(width / height);
      } else {
        setAspect(fallback);
      }
    };
    img.onerror = () => {
      if (active) {
        setAspect(fallback);
      }
    };
    img.src = src;
    return () => {
      active = false;
    };
  }, [src, fallback]);

  return aspect ?? fallback;
}

function AnchorChip({
  item,
  activeId,
  onSelect,
}: {
  item: AnchorItem;
  activeId?: string;
  onSelect: (id: string) => void;
}) {
  if (item.type === "link") {
    return (
      <Link
        to={item.href ?? "/features/white-paper"}
        className="rounded-full border border-tenney-line/70 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-soft transition hover:text-slate-900 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:text-white"
      >
        {item.label}
      </Link>
    );
  }

  const isActive = activeId === item.id;
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`rounded-full border px-3 py-1 text-xs font-medium shadow-soft transition ${
        isActive
          ? "border-sky-300 bg-white text-slate-900 dark:border-sky-500 dark:bg-slate-900 dark:text-white"
          : "border-tenney-line/70 bg-white/70 text-slate-600 hover:text-slate-900 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:text-white"
      }`}
    >
      {item.label}
    </button>
  );
}

function FeatureSection({ section, index }: { section: FeatureSectionData; index: number }) {
  return (
    <section
      id={section.id}
      data-feature-section
      className="scroll-mt-28 space-y-6 md:scroll-mt-32"
    >
      <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Feature {index + 1}
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">{section.thesis}</p>
          </div>
          <ul className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="list-disc pl-4">
                {bullet}
              </li>
            ))}
          </ul>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Why it matters
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{section.whyItMatters}</p>
          </div>
          <details className="rounded-card border border-tenney-line/70 bg-white/70 p-4 text-sm text-slate-600 dark:bg-slate-950/50 dark:text-slate-300">
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Under the hood
            </summary>
            <ul className="mt-3 grid gap-2 text-sm">
              {section.underTheHood.map((item) => (
                <li key={item} className="list-disc pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </details>
          <div className="rounded-card border border-tenney-line/70 bg-white/70 p-4 text-xs text-slate-600 dark:bg-slate-950/50 dark:text-slate-300">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Try it:</span>{" "}
            {section.tryIt}
          </div>
        </div>
      </div>
      {section.figure ? (
        <div className="lg:hidden">
          {section.figure === "A" ? <FigureA /> : null}
          {section.figure === "B" ? <FigureB /> : null}
          {section.figure === "C" ? <FigureC /> : null}
          {section.figure === "D" ? <FigureD /> : null}
        </div>
      ) : null}
    </section>
  );
}

function StickyPhoneRail({ activeId }: { activeId: string }) {
  const activeScreen = phoneScreens.find((screen) => screen.id === activeId) ?? phoneScreens[0];
  const aspectRatio = useImageAspect(phoneScreens[0]?.src ?? "");

  return (
    <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
      <div
        className="relative mx-auto w-[230px] max-w-full"
        style={{ aspectRatio: aspectRatio ? String(aspectRatio) : undefined }}
      >
        {phoneScreens.map((screen) => (
          <img
            key={screen.id}
            src={screen.src}
            alt={screen.alt}
            className={`absolute inset-0 h-full w-full rounded-2xl border border-white/40 object-contain shadow-lg transition-opacity duration-500 dark:border-slate-900/40 ${
              screen.id === activeId ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{activeScreen.label}</p>
    </div>
  );
}

function FiguresRail({ activeFigure }: { activeFigure?: "A" | "B" | "C" | "D" }) {
  return (
    <div className="space-y-4">
      <div className={`transition-opacity ${activeFigure === "A" ? "opacity-100" : "opacity-60"}`}>
        <FigureA />
      </div>
      <div className={`transition-opacity ${activeFigure === "B" ? "opacity-100" : "opacity-60"}`}>
        <FigureB />
      </div>
      <div className={`transition-opacity ${activeFigure === "C" ? "opacity-100" : "opacity-60"}`}>
        <FigureC />
      </div>
      <div className={`transition-opacity ${activeFigure === "D" ? "opacity-100" : "opacity-60"}`}>
        <FigureD />
      </div>
    </div>
  );
}

function FigureA() {
  return (
    <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Confidence → Lock</p>
      <svg viewBox="0 0 240 72" className="mt-3 h-16 w-full text-slate-500 dark:text-slate-300">
        <circle cx="26" cy="36" r="10" fill="currentColor" opacity="0.2" />
        <circle cx="86" cy="36" r="12" fill="currentColor" opacity="0.3" />
        <circle cx="146" cy="36" r="14" fill="currentColor" opacity="0.45" />
        <circle cx="206" cy="36" r="16" fill="currentColor" opacity="0.6" />
        <path
          d="M38 36h34m26 0h34m26 0h34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>Search</span>
        <span>Center</span>
        <span>Stable</span>
        <span>Lock</span>
      </div>
    </div>
  );
}

function FigureB() {
  return (
    <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Prime-limit vocabulary</p>
      <svg viewBox="0 0 240 90" className="mt-3 h-20 w-full text-slate-500 dark:text-slate-300">
        <path
          d="M20 70 L120 14 L220 70 Z"
          fill="currentColor"
          opacity="0.15"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M50 60h140" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M72 50h96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M96 40h48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>5-limit</span>
        <span>7-limit</span>
        <span>11-limit</span>
      </div>
    </div>
  );
}

function FigureC() {
  return (
    <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Export pipeline</p>
      <svg viewBox="0 0 240 80" className="mt-3 h-16 w-full text-slate-500 dark:text-slate-300">
        <rect x="12" y="24" width="60" height="32" rx="8" fill="currentColor" opacity="0.2" />
        <rect x="90" y="16" width="60" height="48" rx="10" fill="currentColor" opacity="0.3" />
        <rect x="168" y="24" width="60" height="32" rx="8" fill="currentColor" opacity="0.2" />
        <path
          d="M72 40h16m60 0h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>Builder</span>
        <span>Formats</span>
        <span>Destinations</span>
      </div>
    </div>
  );
}

function FigureD() {
  return (
    <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Presentation styles</p>
      <svg viewBox="0 0 240 90" className="mt-3 h-20 w-full text-slate-500 dark:text-slate-300">
        <rect x="12" y="18" width="64" height="54" rx="10" fill="currentColor" opacity="0.25" />
        <rect x="88" y="18" width="64" height="54" rx="10" fill="currentColor" opacity="0.2" />
        <rect x="164" y="18" width="64" height="54" rx="10" fill="currentColor" opacity="0.15" />
        <path d="M24 50h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M100 36h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M176 58h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="mt-2 grid grid-cols-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
        <span>Gauge</span>
        <span>Chrono</span>
        <span>Scope</span>
      </div>
    </div>
  );
}

export default function Features() {
  const { effectiveTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [activeSectionId, setActiveSectionId] = useState(featureSections[0].id);
  const badgeSrc = effectiveTheme === "dark" ? APP_STORE_BADGE_DARK : APP_STORE_BADGE_LIGHT;

  const sectionIds = useMemo(() => featureSections.map((section) => section.id), []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-feature-section]"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-20% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleSelectAnchor = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    },
    [reducedMotion],
  );

  const activeSectionIndex = sectionIds.indexOf(activeSectionId);
  const activeFigure = featureSections.find((section) => section.id === activeSectionId)?.figure;

  return (
    <main className="relative tenney-pagegrid">
      <BackgroundField />
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <header className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Tenney Features</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Just intonation as an instrument: navigate pitch as space, land pitch fast, perform
                confidently.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={APP_STORE_LINK} target="_blank" rel="noreferrer noopener">
                <img src={badgeSrc} alt="Download on the App Store" className="h-12" />
              </a>
              <TenneyButton as={Link} to="/features/white-paper" variant="primary">
                Read the white paper
              </TenneyButton>
              <TenneyButton variant="ghost" disabled>
                Download PDF (coming soon)
              </TenneyButton>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Index
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {anchorItems.map((item) => (
                  <AnchorChip
                    key={item.id}
                    item={item}
                    activeId={activeSectionId}
                    onSelect={handleSelectAnchor}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/70 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
              <img
                src={`${baseUrl}assets/screens/screen-01-lattice-overview.png`}
                alt="Tenney lattice overview on iPhone"
                className="h-auto w-64 rounded-2xl border border-white/40 shadow-lg dark:border-slate-900/40"
              />
            </div>
          </div>
        </header>

        <div className="lg:hidden">
          <details className="rounded-card border border-tenney-line/70 bg-white/80 p-4 shadow-soft dark:bg-slate-950/60">
            <summary className="cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200">
              Jump to section
            </summary>
            <div className="mt-4 flex flex-wrap gap-2">
              {anchorItems.map((item) => (
                <AnchorChip
                  key={item.id}
                  item={item}
                  activeId={activeSectionId}
                  onSelect={handleSelectAnchor}
                />
              ))}
            </div>
          </details>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="space-y-14">
            {featureSections.map((section, index) => (
              <FeatureSection key={section.id} section={section} index={index} />
            ))}

            <section className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Keep the tuning workflow close
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Download Tenney from the App Store, read the technical rationale, or review the
                    documentation for setup details.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a href={APP_STORE_LINK} target="_blank" rel="noreferrer noopener">
                    <img src={badgeSrc} alt="Download on the App Store" className="h-12" />
                  </a>
                  <TenneyButton as={Link} to="/features/white-paper" variant="secondary">
                    Read the white paper
                  </TenneyButton>
                  <a
                    href="/docs/"
                    className="text-xs font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Open docs
                  </a>
                </div>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-card border border-tenney-line/70 bg-white/80 p-4 shadow-soft dark:bg-slate-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  On this page
                </p>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  {anchorItems.map((item) => {
                    if (item.type === "link") {
                      return (
                        <Link
                          key={item.id}
                          to={item.href ?? "/features/white-paper"}
                          className="text-xs font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                          {item.label}
                        </Link>
                      );
                    }
                    const isActive = activeSectionId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectAnchor(item.id)}
                        className={`text-left text-xs font-medium transition ${
                          isActive
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeSectionIndex <= 3 ? (
                <StickyPhoneRail activeId={activeSectionId} />
              ) : (
                <FiguresRail activeFigure={activeFigure} />
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
