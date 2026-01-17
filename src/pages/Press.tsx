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

const formatDate = (stamp: string) => {
  const date = new Date(`${stamp}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return stamp;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const resolveAssetPath = (path: string) => `${base}${path.replace(/^\//, "")}`;

const toFilename = (label: string, extension: string) =>
  `${label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}.${extension}`;

export default function Press() {
  const { effectiveTheme } = useTheme();
  const badgeSrc = effectiveTheme === "dark" ? APP_STORE_BADGE_DARK : APP_STORE_BADGE_LIGHT;
  const lastUpdated = useMemo(() => formatDate(__PRESS_LAST_UPDATED__), []);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [railVisible, setRailVisible] = useState(false);
  const heroSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = "Press · Tenney";
  }, []);

  useEffect(() => {
    if (!copiedKey) return;
    const timeout = window.setTimeout(() => setCopiedKey(null), 1400);
    return () => window.clearTimeout(timeout);
  }, [copiedKey]);

  useEffect(() => {
    const sentinel = heroSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setRailVisible(entry.boundingClientRect.top <= 0);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const pressKitUrl = resolveAssetPath(pressManifest.downloads.pressKitZipPath);
  const pressKitFilename = pressManifest.downloads.pressKitZipPath.split("/").pop() ?? "presskit.zip";
  const factsheetUrl = resolveAssetPath(pressManifest.downloads.factsheetPdfPath);
  const factsheetFilename =
    pressManifest.downloads.factsheetPdfPath.split("/").pop() ?? "factsheet.pdf";

  const heroDevices = {
    iPhone: pressManifest.screenshots.find((shot) => shot.deviceFamily === "iPhone"),
    iPad: pressManifest.screenshots.find((shot) => shot.deviceFamily === "iPad"),
    Mac: pressManifest.screenshots.find((shot) => shot.deviceFamily === "Mac"),
  };

  const handleCopy = async (key: string, text: string) => {
    await copyText(text);
    setCopiedKey(key);
  };

  return (
    <main className="relative tenney-pagegrid">
      <BackgroundField />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10">
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
                    onClick={() => forceDownload(pressKitUrl, pressKitFilename)}
                  >
                    Download Press Kit (ZIP)
                  </TenneyButton>
                  <a href={pressManifest.links.appStoreUrl} target="_blank" rel="noreferrer noopener">
                    <img src={badgeSrc} alt="Download on the App Store" className="h-12" />
                  </a>
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
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <span>Last updated: {lastUpdated}</span>
                  <span className="mx-2">•</span>
                  <span>Press kit version: {pressManifest.version}</span>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative flex items-end gap-3">
                  {heroDevices.Mac ? (
                    <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/70 p-3 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                      <img
                        src={resolveAssetPath(heroDevices.Mac.pathPng)}
                        alt={heroDevices.Mac.caption}
                        className="h-auto w-56 rounded-xl border border-white/50 shadow-lg dark:border-slate-900/40"
                      />
                    </div>
                  ) : null}
                  {heroDevices.iPad ? (
                    <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-3 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                      <img
                        src={resolveAssetPath(heroDevices.iPad.pathPng)}
                        alt={heroDevices.iPad.caption}
                        className="h-auto w-44 rounded-[20px] border border-white/50 shadow-lg dark:border-slate-900/40"
                      />
                    </div>
                  ) : null}
                  {heroDevices.iPhone ? (
                    <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-2 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                      <img
                        src={resolveAssetPath(heroDevices.iPhone.pathPng)}
                        alt={heroDevices.iPhone.caption}
                        className="h-auto w-32 rounded-[24px] border border-white/50 shadow-lg dark:border-slate-900/40"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </section>

            <div ref={heroSentinelRef} aria-hidden className="h-px" />

            <section id="facts" className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Quick facts</h2>
                <TenneyButton
                  variant="secondary"
                  size="sm"
                  onClick={() => forceDownload(factsheetUrl, factsheetFilename)}
                >
                  Download factsheet (PDF)
                </TenneyButton>
              </div>
              <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
                <dl className="grid gap-4 md:grid-cols-2">
                  {pressManifest.quickFacts.map((fact) => (
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
            </section>

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
                  PNG downloads only. Captions appear on hover and include attribution when copied.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Logos</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {pressManifest.logos.map((logo) => {
                      const captionText = buildCaption(logo);
                      const filename = toFilename(logo.label, "png");
                      return (
                        <div
                          key={logo.label}
                          className="group relative overflow-hidden rounded-card border border-tenney-line bg-white/80 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60"
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
                              onClick={() => forceDownload(resolveAssetPath(logo.pathPng), filename)}
                            >
                              Download
                            </TenneyButton>
                          </div>
                          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                            <div className="w-full">
                              <p className="text-xs text-white">{logo.caption}</p>
                              <div className="mt-3 flex items-center gap-3">
                                <TenneyButton
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleCopy(`caption-${logo.label}`, captionText)}
                                >
                                  {copiedKey === `caption-${logo.label}` ? "Copied" : "Copy caption"}
                                </TenneyButton>
                              </div>
                            </div>
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
                      const captionText = buildCaption(shot);
                      const filename = toFilename(shot.label, "png");
                      return (
                        <div
                          key={shot.label}
                          className="group relative overflow-hidden rounded-card border border-tenney-line bg-white/80 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60"
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
                              onClick={() => forceDownload(resolveAssetPath(shot.pathPng), filename)}
                            >
                              Download
                            </TenneyButton>
                          </div>
                          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                            <div className="w-full">
                              <p className="text-xs text-white">{shot.caption}</p>
                              <div className="mt-3 flex items-center gap-3">
                                <TenneyButton
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleCopy(`caption-${shot.label}`, captionText)}
                                >
                                  {copiedKey === `caption-${shot.label}` ? "Copied" : "Copy caption"}
                                </TenneyButton>
                              </div>
                            </div>
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
        </div>
      </div>
    </main>
  );
}
