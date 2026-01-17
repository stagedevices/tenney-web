import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundField from "../components/BackgroundField";
import {
  APP_STORE_BADGE_DARK,
  APP_STORE_BADGE_LIGHT,
} from "../components/CTACluster";
import TenneyButton from "../components/TenneyButton";
import PressRail from "../components/press/PressRail";
import pressManifest from "../content/press/press.manifest";
import { base } from "../lib/base";
import { copyText } from "../lib/clipboard/copyText";
import { forceDownload } from "../lib/download/forceDownload";
import { buildCaption } from "../lib/press/buildCaption";
import { useTheme } from "../lib/theme";

const parsePressDate = (stamp: string) => {
  const normalized = stamp.includes("T") ? stamp : `${stamp}T00:00:00Z`;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
};

const formatDisplayDate = (stamp: string) => {
  const date = parsePressDate(stamp);
  if (!date) {
    return stamp;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatUtcDate = (stamp: string) => {
  const date = parsePressDate(stamp) ?? new Date();
  return date.toISOString().slice(0, 10);
};

const resolveAssetPath = (path: string) => `${base}${path.replace(/^\//, "")}`;

const toFilename = (label: string, extension: string) =>
  `${label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}.${extension}`;

export default function Press() {
  const { effectiveTheme } = useTheme();
  const badgeSrc = effectiveTheme === "dark" ? APP_STORE_BADGE_DARK : APP_STORE_BADGE_LIGHT;
  const lastUpdated = useMemo(() => formatDisplayDate(__PRESS_LAST_UPDATED__), []);
  const lastUpdatedUtc = useMemo(() => formatUtcDate(__PRESS_LAST_UPDATED__), []);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [railVisible, setRailVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const quickFactsSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = "Press · Tenney";
  }, []);

  useEffect(() => {
    if (!copiedKey) return;
    const timeout = window.setTimeout(() => setCopiedKey(null), 1400);
    return () => window.clearTimeout(timeout);
  }, [copiedKey]);

  useEffect(() => {
    const sentinel = quickFactsSentinelRef.current;
    if (!sentinel) return;

    setRailVisible(sentinel.getBoundingClientRect().top <= 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasPassed = entry.boundingClientRect.top <= 0;
        setRailVisible(entry.isIntersecting || hasPassed);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }
    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  const pressKitUrl = resolveAssetPath(pressManifest.downloads.pressKitZipPath);
  const pressKitFilename = `tenney-press-kit-${lastUpdatedUtc}.zip`;
  const factsheetUrl = resolveAssetPath(pressManifest.downloads.factsheetPdfPath);
  const factsheetFilename = "tenney-factsheet-jan-2026.pdf";

  const heroDevices = {
    iPhone: pressManifest.heroDevices.find((device) => device.deviceFamily === "iPhone"),
    iPad: pressManifest.heroDevices.find((device) => device.deviceFamily === "iPad"),
    Mac: pressManifest.heroDevices.find((device) => device.deviceFamily === "Mac"),
  };

  const quickFactsByLabel = useMemo(() => {
    return new Map(pressManifest.quickFacts.map((fact) => [fact.label, fact]));
  }, []);

  const rowOneFacts = ["Product", "Platforms", "Press contact"]
    .map((label) => quickFactsByLabel.get(label))
    .filter((fact): fact is NonNullable<typeof fact> => Boolean(fact));

  const conceptFacts = ["Company", "Category"]
    .map((label) => quickFactsByLabel.get(label))
    .filter((fact): fact is NonNullable<typeof fact> => Boolean(fact));

  const useCaseFacts = ["Availability", "Website"]
    .map((label) => quickFactsByLabel.get(label))
    .filter((fact): fact is NonNullable<typeof fact> => Boolean(fact));

  const handleCopy = async (key: string, text: string) => {
    await copyText(text);
    setCopiedKey(key);
  };

  return (
    <main className="relative tenney-pagegrid">
      <BackgroundField />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-16">
          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                Press
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Tenney Press Kit</h1>
                <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
                  Tenney is a harmonic exploration tool that renders pitch as a spatial lattice. Use the
                  materials below for editorial coverage.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <TenneyButton
                  variant="primary"
                  size="sm"
                  onClick={() => forceDownload(pressKitUrl, pressKitFilename, { mimeType: "application/zip" })}
                >
                  Download Press Kit (ZIP)
                </TenneyButton>
                <a href={pressManifest.links.appStoreUrl} target="_blank" rel="noreferrer noopener">
                  <img src={badgeSrc} alt="Download on the App Store" className="h-12" />
                </a>
              </div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <span>Last updated: {lastUpdated}</span>
                <span className="mx-2">•</span>
                <span>Press kit version: {pressManifest.version}</span>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="relative mx-auto h-[280px] w-full sm:h-[340px] lg:h-[360px]">
                  {heroDevices.Mac ? (
                    <div className="press-hero-fade press-hero-fade--delay-1 absolute right-1 top-0 z-0 w-[56%] sm:w-[50%] lg:w-[46%]">
                      <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/70 p-3 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                        <img
                          src={resolveAssetPath(heroDevices.Mac.pathSvg)}
                          alt={heroDevices.Mac.caption}
                          className="h-auto w-full rounded-xl border border-white/50 shadow-lg dark:border-slate-900/40"
                        />
                      </div>
                    </div>
                  ) : null}
                  {heroDevices.iPad ? (
                    <div className="press-hero-fade press-hero-fade--delay-2 absolute left-0 top-10 z-10 w-[50%] sm:top-12 sm:w-[44%] lg:w-[40%]">
                      <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-3 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                        <img
                          src={resolveAssetPath(heroDevices.iPad.pathSvg)}
                          alt={heroDevices.iPad.caption}
                          className="h-auto w-full rounded-[20px] border border-white/50 shadow-lg dark:border-slate-900/40"
                        />
                      </div>
                    </div>
                  ) : null}
                  {heroDevices.iPhone ? (
                    <div className="press-hero-fade press-hero-fade--delay-3 absolute left-1/2 top-6 z-20 w-[62%] -translate-x-1/2 sm:top-2 sm:w-[54%] lg:top-4 lg:w-[50%]">
                      <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-2 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                        <img
                          src={resolveAssetPath(heroDevices.iPhone.pathSvg)}
                          alt={heroDevices.iPhone.caption}
                          className="h-auto w-full rounded-[24px] border border-white/50 shadow-lg dark:border-slate-900/40"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section id="facts" className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Quick facts</h2>
              <TenneyButton
                variant="secondary"
                size="sm"
                onClick={() => forceDownload(factsheetUrl, factsheetFilename, { mimeType: "application/pdf" })}
              >
                Download factsheet (PDF)
              </TenneyButton>
            </div>
            <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Product / Platforms / Contact
                  </p>
                  <dl className="grid gap-4 md:grid-cols-3">
                    {rowOneFacts.map((fact) => (
                      <div key={fact.label} className="space-y-1">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                          {fact.label}
                        </dt>
                        <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Concepts / Use cases
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <dl className="space-y-4">
                      {conceptFacts.map((fact) => (
                        <div key={fact.label} className="space-y-1">
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                            {fact.label}
                          </dt>
                          <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <dl className="space-y-4">
                      {useCaseFacts.map((fact) => (
                        <div key={fact.label} className="space-y-1">
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                            {fact.label}
                          </dt>
                          <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div ref={quickFactsSentinelRef} aria-hidden className="h-px" />

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10">
            <div className="space-y-16">
              <div className="flex flex-wrap items-center gap-3 lg:hidden">
                <TenneyButton
                  as="a"
                  href={pressManifest.links.testFlightUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                  size="sm"
                >
                  Join Public Beta (TestFlight)
                </TenneyButton>
                <div className="flex items-center gap-2">
                  <TenneyButton as="a" href={`mailto:${pressManifest.contactEmail}`} variant="ghost" size="sm">
                    Contact Press
                  </TenneyButton>
                  <TenneyButton
                    variant="icon"
                    size="sm"
                    aria-label="Copy press email"
                    onClick={() => handleCopy("contact", pressManifest.contactEmail)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h9v9H9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h9v9H5z" />
                    </svg>
                  </TenneyButton>
                  <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {copiedKey === "contact" ? "Copied" : "Copy"}
                  </span>
                </div>
              </div>

              <section id="copy" className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Copy blocks</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Ready-to-use descriptions for press releases, listings, and editorial notes.
                  </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  {[
                    { key: "one-liner", label: "One-liner", text: pressManifest.copyBlocks.oneLiner },
                    { key: "short", label: "Short", text: pressManifest.copyBlocks.short },
                    { key: "extended", label: "Extended", text: pressManifest.copyBlocks.extended },
                  ].map((block) => (
                    <div
                      key={block.key}
                      className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-5 shadow-soft backdrop-blur-lg dark:bg-slate-950/60"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{block.label}</h3>
                        <TenneyButton
                          variant="secondary"
                          size="sm"
                          onClick={() => handleCopy(block.key, block.text)}
                        >
                          {copiedKey === block.key ? "Copied" : "Copy"}
                        </TenneyButton>
                      </div>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{block.text}</p>
                    </div>
                  ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-5 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Story angles</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {pressManifest.copyBlocks.storyAngles.map((angle) => (
                        <li key={angle} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-tenney-blue" aria-hidden />
                          <span>{angle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-5 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Feature highlights</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {pressManifest.copyBlocks.featureBullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-tenney-blue" aria-hidden />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

            <section id="media" className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Media library</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  PNG downloads only. Captions include attribution when copied.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Logos</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {pressManifest.logos.map((logo) => {
                      const captionText = buildCaption({
                        caption: logo.caption,
                        copyright: logo.copyright,
                        lastUpdated,
                      });
                      const filename = toFilename(logo.label, "png");
                      return (
                        <div
                          key={logo.label}
                          className="rounded-card border border-tenney-line bg-white/80 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60"
                        >
                          <img
                            src={resolveAssetPath(logo.pathPng)}
                            alt={logo.caption}
                            className="h-28 w-full object-contain"
                          />
                          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <span>{logo.label}</span>
                            <TenneyButton
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                forceDownload(resolveAssetPath(logo.pathPng), filename, { mimeType: "image/png" })
                              }
                            >
                              Download
                            </TenneyButton>
                          </div>
                          <div className="mt-3 flex items-start justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <span className="text-slate-600 dark:text-slate-300">{logo.caption}</span>
                            <TenneyButton
                              variant="secondary"
                              size="sm"
                              onClick={() => handleCopy(`caption-${logo.label}`, captionText)}
                            >
                              {copiedKey === `caption-${logo.label}` ? "Copied" : "Copy"}
                            </TenneyButton>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Screenshots</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {pressManifest.screenshots.map((shot) => {
                      const captionText = buildCaption({
                        caption: shot.caption,
                        copyright: shot.copyright,
                        lastUpdated,
                      });
                      const filename = toFilename(shot.label, "png");
                      return (
                        <div
                          key={shot.label}
                          className="rounded-card border border-tenney-line bg-white/80 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60"
                        >
                          <img
                            src={resolveAssetPath(shot.pathPng)}
                            alt={shot.caption}
                            className="w-full rounded-card object-contain"
                          />
                          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <span>
                              {shot.label} · {shot.deviceFamily}
                            </span>
                            <TenneyButton
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                forceDownload(resolveAssetPath(shot.pathPng), filename, { mimeType: "image/png" })
                              }
                            >
                              Download
                            </TenneyButton>
                          </div>
                          <div className="mt-3 flex items-start justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <span className="text-slate-600 dark:text-slate-300">{shot.caption}</span>
                            <TenneyButton
                              variant="secondary"
                              size="sm"
                              onClick={() => handleCopy(`caption-${shot.label}`, captionText)}
                            >
                              {copiedKey === `caption-${shot.label}` ? "Copied" : "Copy"}
                            </TenneyButton>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section id="usage" className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Usage rules</h2>
              <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {pressManifest.usageRules.map((rule) => (
                    <li key={rule} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-tenney-blue" aria-hidden />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="company" className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Company</h2>
              <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {pressManifest.copyBlocks.stageDevicesBoilerplate}
                </p>
              </div>
            </section>

            <section id="faq" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">FAQ</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Plain-language answers plus theory notes for deeper context.
                </p>
              </div>
              <div className="space-y-4">
                {pressManifest.faq.map((item) => (
                  <div
                    key={item.q}
                    className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.q}</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                          Plain language
                        </p>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.aPlain}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                          Theory notes
                        </p>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.aTheory}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            </div>
            {isDesktop ? (
              <div className="mt-12 lg:mt-0">
                <PressRail
                  visible={railVisible}
                  appStoreUrl={pressManifest.links.appStoreUrl}
                  testFlightUrl={pressManifest.links.testFlightUrl}
                  pressKitUrl={pressKitUrl}
                  pressKitFilename={pressKitFilename}
                  contactEmail={pressManifest.contactEmail}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
