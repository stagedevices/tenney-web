import { useCallback, useEffect, useMemo, useState } from "react";
import BackgroundField from "../components/BackgroundField";
import LatticeConstellation from "../components/LatticeConstellation";
import TenneyButton from "../components/TenneyButton";
import { IOS_TESTFLIGHT_LATEST } from "../components/CTACluster";
import DownloadPackModal from "../components/community/DownloadPackModal";
import ScalePlayerModal from "../components/community/ScalePlayerModal";
import { useReducedMotion } from "../lib/reducedMotion";
import type { TenneyScalePack } from "../lib/tenneyScales/types";
import { TENNEY_SCALES_BASE } from "../lib/tenneyScales/urls";
import { useTenneyScalesIndex } from "../lib/tenneyScales/useTenneyScalesIndex";

type AnchorItem = {
  id: string;
  label: string;
};

const DISCORD_URL = "https://discord.gg/REPLACE_ME";
const SCALE_LIBRARY_REPO_URL = "https://github.com/stagedevices/tenney-scales";
const SCALE_SUBMIT_URL = "https://github.com/stagedevices/tenney-scales/issues/new?template=pack_submission.yml";
const FEATURE_REQUESTS_URL = "https://github.com/stagedevices/tenney/issues/new?template=feature_request.yml";
const CODE_OF_CONDUCT_URL = "https://github.com/community/community/blob/main/CODE_OF_CONDUCT.md";

const anchorItems: AnchorItem[] = [
  { id: "start-here", label: "Start here" },
  { id: "scale-library", label: "Scale library" },
  { id: "feature-requests", label: "Feature requests" },
  { id: "beta", label: "Public Beta" },
  { id: "contribute", label: "Contribute" },
];

const startActions = [
  {
    title: "Request a feature",
    description: "Describe workflows, data needs, and the musical context you care about.",
    href: FEATURE_REQUESTS_URL,
    buttonLabel: "Open issues",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 6h14M5 12h14M5 18h10" />
      </svg>
    ),
  },
  {
    title: "Share / view scale packs",
    description: "Browse CC0 packs and submit new ones through GitHub pull requests.",
    href: "#scale-library",
    buttonLabel: "Browse library",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v4H4zM4 14h10v4H4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 14h5v4h-5z" />
      </svg>
    ),
  },
  {
    title: "Join Public Beta (TestFlight)",
    description: "Get the newest builds and help us tighten tuning workflows.",
    href: IOS_TESTFLIGHT_LATEST,
    buttonLabel: "Join Public Beta",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l2.4 4.8 5.3.8-3.9 3.8.9 5.3-4.7-2.5-4.7 2.5.9-5.3-3.9-3.8 5.3-.8z"
        />
      </svg>
    ),
  },
];

function AnchorChip({
  item,
  activeId,
  onSelect,
}: {
  item: AnchorItem;
  activeId?: string;
  onSelect: (id: string) => void;
}) {
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

function formatLicense(license: string) {
  if (license.toLowerCase().startsWith("cc0")) return "CC0";
  return license;
}

function PackCard({
  pack,
  onPlay,
  onDownload,
}: {
  pack: TenneyScalePack;
  onPlay: (pack: TenneyScalePack) => void;
  onDownload: (pack: TenneyScalePack) => void;
}) {
  return (
    <div className="tenney-plusgrid flex h-full flex-col gap-4 rounded-card border border-tenney-line/70 bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {formatLicense(pack.license)}
          </span>
          <span className="rounded-full border border-sky-300/70 bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-soft dark:border-sky-500/70 dark:bg-slate-900 dark:text-white">
            {pack.defaults.primeLimit}-limit
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{pack.title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            By{" "}
            {pack.authorUrl ? (
              <a
                href={pack.authorUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {pack.author}
              </a>
            ) : (
              pack.author
            )}
          </p>
        </div>
        <p className="tenney-chip-description line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
          {pack.description}
        </p>
      </div>
      <div className="mt-auto space-y-3 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex flex-wrap gap-2">
          {pack.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-tenney-line/60 bg-white/80 px-2 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-950/60 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <TenneyButton size="sm" variant="primary" onClick={() => onPlay(pack)}>
            Play
          </TenneyButton>
          <TenneyButton size="sm" variant="secondary" onClick={() => onDownload(pack)}>
            Download
          </TenneyButton>
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  const reducedMotion = useReducedMotion();
  const [activeSectionId, setActiveSectionId] = useState(anchorItems[0].id);
  const { data, isLoading, error } = useTenneyScalesIndex();
  const [activePack, setActivePack] = useState<TenneyScalePack | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const packs = useMemo(() => {
    if (!data?.packs) return [];
    return [...data.packs].sort((a, b) => a.title.localeCompare(b.title));
  }, [data]);
  const generatedAtLabel = useMemo(() => {
    if (!data?.generatedAt) return null;
    const parsed = new Date(data.generatedAt);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  }, [data?.generatedAt]);

  const hasPacks = packs.length > 0;
  const showLoading = isLoading && !hasPacks;
  const showError = !hasPacks && error;
  const showEmpty = !hasPacks && !showLoading && !showError;

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-community-section]"),
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

  useEffect(() => {
    if (!playerOpen && !downloadOpen) {
      setActivePack(null);
    }
  }, [downloadOpen, playerOpen]);

  return (
    <main className="relative tenney-pagegrid">
      <BackgroundField />
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <header className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative z-10 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Tenney Community
              </p>
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Community</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A space for performers, researchers, and builders to share scales, workflows, and new
                ideas.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <TenneyButton
                as="a"
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer noopener"
                variant="primary"
              >
                Join the Discord
              </TenneyButton>
              <TenneyButton as="a" href="#scale-library" variant="secondary">
                Browse scale packs
              </TenneyButton>
              <TenneyButton
                as="a"
                href={SCALE_LIBRARY_REPO_URL}
                target="_blank"
                rel="noreferrer noopener"
                variant="ghost"
              >
                Contribute a pack (PR)
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
          <div className="relative hidden min-h-[320px] lg:block">
            <div className="absolute inset-0 overflow-hidden">
              <LatticeConstellation className="absolute right-0 top-1/2 aspect-square w-[min(520px,40vw)] -translate-y-1/2 text-tenney-blue/30 dark:text-tenney-cyan/25" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/80 via-white/40 to-transparent dark:from-slate-950/80 dark:via-slate-950/30" />
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

        <div className="lg:hidden">
          <div className="flex flex-wrap gap-3">
            {startActions.map((action) => (
              <a
                key={action.title}
                href={action.href}
                target={action.href.startsWith("#") ? undefined : "_blank"}
                rel={action.href.startsWith("#") ? undefined : "noreferrer noopener"}
                className="flex items-center gap-2 rounded-full border border-tenney-line/70 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 shadow-soft transition hover:text-slate-900 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:text-white"
              >
                <span className="h-4 w-4 text-slate-500 dark:text-slate-300">{action.icon}</span>
                {action.title}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-14">
            <section
              id="start-here"
              data-community-section
              className="scroll-mt-28 space-y-6 md:scroll-mt-32"
            >
              <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                      Start here
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      A shared lab for tuning ideas
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Tenney’s community is designed like a studio: calm, analytic, and oriented
                      toward shared research. Discord is the single conversation hub, while scale
                      packs live on GitHub so contributions stay versioned and reviewable. We keep
                      moderation quiet and behind the scenes so discussions stay focused on
                      workflows, listening, and craft.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {startActions.map((action) => (
                      <div
                        key={action.title}
                        className="rounded-card border border-tenney-line/70 bg-white/70 p-4 text-sm text-slate-600 shadow-soft dark:bg-slate-950/50 dark:text-slate-300"
                      >
                        <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          <span className="h-5 w-5">{action.icon}</span>
                          {action.title}
                        </div>
                        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                          {action.description}
                        </p>
                        {action.href.startsWith("#") ? (
                          <button
                            type="button"
                            onClick={() => handleSelectAnchor("scale-library")}
                            className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                          >
                            {action.buttonLabel}
                          </button>
                        ) : (
                          <a
                            href={action.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                          >
                            {action.buttonLabel}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section
              id="scale-library"
              data-community-section
              className="scroll-mt-28 space-y-6 md:scroll-mt-32"
            >
              <div className="space-y-6">
                <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                        Scale library
                      </p>
                      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                        Curated packs, CC0 by default
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        The scale library collects real-world tuning packs that are immediately
                        usable in Tenney. Each pack lists its prime limit and export formats so you
                        can plan rehearsal workflows before downloading. Contribution happens via
                        GitHub pull requests, with CC0 as the default license to maximize reuse.
                      </p>
                    </div>
                    <details className="rounded-card border border-tenney-line/70 bg-white/70 p-4 text-sm text-slate-600 dark:bg-slate-950/50 dark:text-slate-300">
                      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        Under the hood
                      </summary>
                      <ul className="mt-3 grid gap-2 text-sm">
                        <li className="list-disc pl-4">
                          Packs are organized by prime limit to keep harmonic vocabulary clear.
                        </li>
                        <li className="list-disc pl-4">
                          Formats are listed explicitly for fast compatibility checks.
                        </li>
                        <li className="list-disc pl-4">
                          CC0 keeps collaboration friction low for ensembles and researchers.
                        </li>
                      </ul>
                    </details>
                  </div>
                </div>
                {showLoading && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">Loading packs…</p>
                )}
                {showError && (
                  <p className="text-sm text-rose-500">
                    Unable to load community packs right now. Please try again soon.
                  </p>
                )}
                {showEmpty && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">No packs yet.</p>
                )}
                {generatedAtLabel && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Index updated {generatedAtLabel}
                  </p>
                )}
                <div
                  className={`grid gap-4 ${
                    hasPacks || showLoading ? "md:grid-cols-2 lg:grid-cols-3" : "max-w-md"
                  }`}
                >
                  {showLoading &&
                    Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={`pack-skeleton-${index}`}
                        className="tenney-plusgrid flex h-full flex-col gap-4 rounded-card border border-tenney-line/70 bg-white/60 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/40"
                      >
                        <div className="h-4 w-24 rounded-full bg-slate-200/70 dark:bg-slate-800/70" />
                        <div className="space-y-2">
                          <div className="h-5 w-2/3 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                          <div className="h-3 w-1/2 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                        </div>
                        <div className="h-12 w-full rounded bg-slate-200/70 dark:bg-slate-800/70" />
                        <div className="mt-auto h-8 w-full rounded bg-slate-200/70 dark:bg-slate-800/70" />
                      </div>
                    ))}
                  {packs.map((pack) => (
                    <PackCard
                      key={pack.slug}
                      pack={pack}
                      onPlay={(selected) => {
                        setActivePack(selected);
                        setPlayerOpen(true);
                      }}
                      onDownload={(selected) => {
                        setActivePack(selected);
                        setDownloadOpen(true);
                      }}
                    />
                  ))}
                  <div className="tenney-plusgrid flex h-full flex-col justify-between rounded-card border border-tenney-line/70 bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                    <div className="space-y-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                        Submit your pack
                      </p>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Share your scale set via GitHub PR
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Add your pack to the repository and include format details, prime limit, and
                        any listening notes. We keep reviews calm and lightweight.
                      </p>
                    </div>
                    <TenneyButton
                      as="a"
                      href={SCALE_SUBMIT_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      size="sm"
                      variant="secondary"
                    >
                      Submit your pack
                    </TenneyButton>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="feature-requests"
              data-community-section
              className="scroll-mt-28 space-y-6 md:scroll-mt-32"
            >
              <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                      Feature requests
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      Ask for new workflows with context
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Feature requests are routed through GitHub issues so they remain searchable and
                      visible to the whole team. Share the musical context, the tuning problem you
                      are solving, and the format or instrumentation you use. The clearer the
                      context, the more likely we can prototype quickly.
                    </p>
                  </div>
                  <ul className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
                    <li className="list-disc pl-4">Describe the tuning task and why it matters.</li>
                    <li className="list-disc pl-4">Link to reference scales or packs when possible.</li>
                    <li className="list-disc pl-4">
                      Note required export formats or performance constraints.
                    </li>
                    <li className="list-disc pl-4">
                      Mention how you currently work around the missing feature.
                    </li>
                  </ul>
                  <div className="flex flex-wrap items-center gap-4">
                    <TenneyButton
                      as="a"
                      href={FEATURE_REQUESTS_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      size="sm"
                      variant="primary"
                    >
                      Request a feature
                    </TenneyButton>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Feature requests live alongside design notes and research threads.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="beta"
              data-community-section
              className="scroll-mt-28 space-y-6 md:scroll-mt-32"
            >
              <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                      Public Beta
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      Join the TestFlight stream
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      The Public Beta is where new community workflows land first. TestFlight builds
                      focus on scale sharing, export reliability, and lattice performance. If you
                      want to shape the tuning tools, this is the fastest path to feedback.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <TenneyButton
                      as="a"
                      href={IOS_TESTFLIGHT_LATEST}
                      target="_blank"
                      rel="noreferrer noopener"
                      size="sm"
                      variant="primary"
                    >
                      Join Public Beta
                    </TenneyButton>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      We post new builds when scale workflows change, not on a fixed schedule.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="contribute"
              data-community-section
              className="scroll-mt-28 space-y-6 md:scroll-mt-32"
            >
              <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                      Contribute
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      PR workflow for scale packs
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Scale packs live in the GitHub repository so the community can review, discuss,
                      and update them over time. Submit a pull request with a clear description of
                      prime limit, formats, and any usage notes. We default to CC0, but include a
                      different license if your pack requires it.
                    </p>
                  </div>
                  <details className="rounded-card border border-tenney-line/70 bg-white/70 p-4 text-sm text-slate-600 dark:bg-slate-950/50 dark:text-slate-300">
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Under the hood
                    </summary>
                    <ul className="mt-3 grid gap-2 text-sm">
                      <li className="list-disc pl-4">Fork the repo and add your pack folder.</li>
                      <li className="list-disc pl-4">
                        Include a short readme with limits, formats, and listening notes.
                      </li>
                      <li className="list-disc pl-4">Open a PR so we can review quietly.</li>
                    </ul>
                  </details>
                  <div className="flex flex-wrap items-center gap-4">
                    <TenneyButton
                      as="a"
                      href={SCALE_LIBRARY_REPO_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      size="sm"
                      variant="secondary"
                    >
                      Contribute on GitHub
                    </TenneyButton>
                    <a
                      href={CODE_OF_CONDUCT_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      Code of Conduct
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-card border border-tenney-line/70 bg-white/80 p-4 shadow-soft dark:bg-slate-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  Start here
                </p>
                <div className="mt-4 space-y-4">
                  {startActions.map((action) => (
                    <div key={action.title} className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                        <span className="h-4 w-4">{action.icon}</span>
                        {action.title}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{action.description}</p>
                      {action.href.startsWith("#") ? (
                        <button
                          type="button"
                          onClick={() => handleSelectAnchor("scale-library")}
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                          {action.buttonLabel}
                        </button>
                      ) : (
                        <a
                          href={action.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                          {action.buttonLabel}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-card border border-tenney-line/70 bg-white/80 p-4 shadow-soft dark:bg-slate-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  On this page
                </p>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  {anchorItems.map((item) => {
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
            </div>
          </aside>
        </div>
      </div>
      <ScalePlayerModal
        open={playerOpen}
        onOpenChange={(next) => {
          setPlayerOpen(next);
          if (!next && !downloadOpen) setActivePack(null);
        }}
        pack={activePack}
        baseUrl={TENNEY_SCALES_BASE}
      />
      <DownloadPackModal
        open={downloadOpen}
        onOpenChange={(next) => {
          setDownloadOpen(next);
          if (!next && !playerOpen) setActivePack(null);
        }}
        pack={activePack}
        baseUrl={TENNEY_SCALES_BASE}
      />
    </main>
  );
}
