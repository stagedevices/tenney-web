import CTACluster, { betaLinks } from "../components/CTACluster";
import TenneyButton from "../components/TenneyButton";

export default function Beta() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Beta & Nightly Builds</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Get early access to upcoming Tenney features. Choose TestFlight for stability or nightly builds for the latest experiments.
        </p>
      </header>
      <section className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft dark:bg-slate-950/60">
        <CTACluster />
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-5 dark:bg-slate-950/60">
          <h2 className="text-lg font-semibold">TestFlight Beta</h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Expect curated builds with release notes and milestone features.
          </p>
          <TenneyButton
            href={betaLinks.beta}
            as="a"
            size="sm"
            variant="primary"
            className="mt-4"
          >
            Join the beta →
          </TenneyButton>
        </div>
        <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-5 dark:bg-slate-950/60">
          <h2 className="text-lg font-semibold">Nightly Builds</h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Grab the latest experimental build for feedback and testing.
          </p>
          <TenneyButton
            href={betaLinks.nightly}
            as="a"
            size="sm"
            variant="secondary"
            tone="warm"
            className="mt-4"
          >
            Download nightly →
          </TenneyButton>
        </div>
      </section>
    </main>
  );
}
