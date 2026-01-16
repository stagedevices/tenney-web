import { useEffect, useMemo, useState } from "react";
import BackgroundField from "../components/BackgroundField";
import TenneyButton from "../components/TenneyButton";
import {
  accordions,
  atAGlance,
  contactEmail,
  summaryChips,
  thirdParties,
} from "../content/privacy.config";

const metaDescription =
  "Tenney’s privacy practices: cookieless website analytics, optional diagnostics, and an offline-first design.";

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

const externalLinkProps = {
  target: "_blank",
  rel: "noreferrer noopener",
};

export default function Privacy() {
  const [copied, setCopied] = useState(false);
  const lastUpdated = useMemo(() => formatDate(__PRIVACY_LAST_UPDATED__), []);
  const cloudflareUrl =
    thirdParties.find((item) => item.name === "Cloudflare Web Analytics")?.url ??
    "https://www.cloudflare.com/web-analytics/";
  const sentryUrl = thirdParties.find((item) => item.name === "Sentry")?.url ?? "https://sentry.io/privacy/";
  const testflightUrl =
    thirdParties.find((item) => item.name === "TestFlight Privacy")?.url ??
    "https://developer.apple.com/testflight/privacy/";
  const applePrivacyUrl =
    thirdParties.find((item) => item.name === "Apple Privacy")?.url ?? "https://www.apple.com/privacy/";

  useEffect(() => {
    document.title = "Privacy · Tenney";
    const existing = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (existing) {
      existing.content = metaDescription;
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = metaDescription;
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(contactEmail);
    } finally {
      setCopied(true);
    }
  };

  return (
    <main className="relative tenney-pagegrid">
      <BackgroundField />
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-16">
        <section className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Privacy
            </p>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Privacy</h1>
              <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
                Tenney is built to work offline-first and minimize data collection.
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {summaryChips.map((chip) => (
              <span
                key={chip.label}
                className="tenney-plusgrid rounded-full border border-tenney-line/70 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 shadow-soft backdrop-blur-lg dark:bg-slate-950/60 dark:text-slate-300"
              >
                {chip.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <TenneyButton as="a" href={`mailto:${contactEmail}`} variant="primary" size="sm">
              Email privacy team
            </TenneyButton>
            <TenneyButton variant="secondary" size="sm" disabled>
              Download PDF (coming soon)
            </TenneyButton>
            <div className="flex items-center gap-2 rounded-full border border-tenney-line/70 bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-soft dark:bg-slate-950/60 dark:text-slate-300">
              <a href={`mailto:${contactEmail}`} className="font-semibold">
                {contactEmail}
              </a>
              <TenneyButton
                variant="icon"
                size="sm"
                aria-label="Copy privacy email"
                onClick={handleCopy}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h9v9H9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h9v9H5z" />
                </svg>
              </TenneyButton>
              <span className="text-[11px] uppercase tracking-wide">{copied ? "Copied" : "Copy"}</span>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Privacy Nutrition Label</h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              A compact summary of how Tenney handles data.
            </p>
            <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between border-b border-tenney-line/60 pb-3">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Data linked to you</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-300">None</span>
              </div>
              <div className="flex items-center justify-between border-b border-tenney-line/60 pb-3">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Data used to track you</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-300">None</span>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Data collected
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-tenney-blue" aria-hidden />
                    <span>Website: Anonymous usage metrics (Cloudflare Web Analytics).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-tenney-blue" aria-hidden />
                    <span>App (optional): Crash reports and logs (Sentry) — opt-in.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <figure className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
            <div className="flex items-center justify-between">
              <figcaption className="text-sm font-semibold text-slate-900 dark:text-white">
                Data flow overview
              </figcaption>
              <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Optional paths
              </span>
            </div>
            <svg
              viewBox="0 0 460 220"
              className="mt-4 h-48 w-full"
              role="img"
              aria-label="Data flow diagram for Tenney privacy"
            >
              <defs>
                <linearGradient id="privacyFlow" x1="0" x2="1">
                  <stop offset="0%" stopColor="rgba(5,219,254,0.6)" />
                  <stop offset="100%" stopColor="rgba(2,156,254,0.2)" />
                </linearGradient>
              </defs>
              <rect x="16" y="34" width="120" height="50" rx="16" fill="rgba(2,156,254,0.08)" stroke="rgba(2,156,254,0.4)" />
              <text x="76" y="64" textAnchor="middle" fill="currentColor" fontSize="12">
                Device
              </text>

              <rect x="300" y="20" width="130" height="52" rx="16" fill="rgba(5,219,254,0.08)" stroke="rgba(5,219,254,0.4)" />
              <text x="365" y="50" textAnchor="middle" fill="currentColor" fontSize="12">
                Apple services
              </text>
              <text x="365" y="66" textAnchor="middle" fill="currentColor" fontSize="10">
                App Store / TestFlight
              </text>

              <rect x="300" y="96" width="130" height="52" rx="16" fill="rgba(255,191,67,0.08)" stroke="rgba(255,191,67,0.4)" />
              <text x="365" y="126" textAnchor="middle" fill="currentColor" fontSize="12">
                Crash diagnostics
              </text>
              <text x="365" y="142" textAnchor="middle" fill="currentColor" fontSize="10">
                Sentry (opt-in)
              </text>

              <rect x="300" y="168" width="130" height="40" rx="16" fill="rgba(2,156,254,0.08)" stroke="rgba(2,156,254,0.4)" />
              <text x="365" y="192" textAnchor="middle" fill="currentColor" fontSize="12">
                Cloudflare
              </text>

              <path d="M136 60h150" stroke="url(#privacyFlow)" strokeWidth="2" strokeDasharray="5 6" />
              <path d="M136 60h150" stroke="url(#privacyFlow)" strokeWidth="2" strokeDasharray="5 6" transform="translate(0 76)" />
              <path d="M136 60h150" stroke="url(#privacyFlow)" strokeWidth="2" strokeDasharray="5 6" transform="translate(0 130)" />

              <text x="210" y="50" textAnchor="middle" fill="currentColor" fontSize="10">
                Optional
              </text>
              <text x="210" y="126" textAnchor="middle" fill="currentColor" fontSize="10">
                Optional
              </text>
              <text x="210" y="180" textAnchor="middle" fill="currentColor" fontSize="10">
                Website only
              </text>
            </svg>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Tenney does not include advertising SDKs. Website analytics are cookieless.
            </p>
          </figure>
        </section>

        <section className="tenney-plusgrid rounded-card border border-tenney-line bg-white/70 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Privacy at a glance</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {atAGlance.map((block) => (
              <div key={block.title} className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {block.title}
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-tenney-cyan" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)]">
          <div className="space-y-4">
            {accordions.map((section) => (
              <details
                key={section.id}
                className="rounded-card border border-tenney-line/70 bg-white/80 p-5 text-sm text-slate-600 shadow-soft transition hover:border-tenney-blue/40 dark:bg-slate-950/60 dark:text-slate-300"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 outline-none transition dark:text-white">
                  {section.title}
                </summary>
                <div className="mt-3 space-y-3">
                  {section.bullets ? (
                    <ul className="space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-tenney-blue" aria-hidden />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.body ? <div className="text-sm text-slate-600 dark:text-slate-300">{section.body}</div> : null}
                  {section.id === "website-analytics" ? (
                    <a
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-tenney-blue"
                      href={cloudflareUrl}
                      {...externalLinkProps}
                    >
                      Cloudflare Web Analytics docs
                    </a>
                  ) : null}
                  {section.id === "app-diagnostics" ? (
                    <a
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-tenney-blue"
                      href={sentryUrl}
                      {...externalLinkProps}
                    >
                      Sentry privacy documentation
                    </a>
                  ) : null}
                  {section.id === "public-beta" ? (
                    <a
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-tenney-blue"
                      href={testflightUrl}
                      {...externalLinkProps}
                    >
                      Apple TestFlight privacy notes
                    </a>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
          <aside className="space-y-4">
            <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-5 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Trusted partners
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {thirdParties.map((party) => (
                  <li key={party.name} className="space-y-1">
                    <a className="font-semibold text-tenney-blue" href={party.url} {...externalLinkProps}>
                      {party.name}
                    </a>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{party.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/70 p-5 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Contact privacy</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Reach out for data questions, deletion requests, or policy clarification.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <TenneyButton as="a" href={`mailto:${contactEmail}`} variant="secondary" size="sm">
                  {contactEmail}
                </TenneyButton>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full border border-tenney-line/70 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:text-slate-900 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:text-white"
                >
                  Copy email
                </button>
                <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {copied ? "Copied to clipboard" : "Tap to copy"}
                </span>
              </div>
            </div>
          </aside>
        </section>

        <section className="tenney-plusgrid rounded-card border border-tenney-line bg-white/70 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                More
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Explore more Tenney resources and platform privacy information.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a className="text-tenney-blue" href="/docs/">
                Docs
              </a>
              <a className="text-tenney-blue" href="/press">
                Press
              </a>
              <a className="text-tenney-blue" href={`mailto:${contactEmail}`}>
                Contact
              </a>
              <a className="text-tenney-blue" href={applePrivacyUrl} {...externalLinkProps}>
                Apple privacy
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
