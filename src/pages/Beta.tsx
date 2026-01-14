import CTACluster, { betaLinks } from "../components/CTACluster";

export default function Beta() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Beta & Nightly Builds</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Get early access to upcoming Tenney features. Choose TestFlight for stability or nightly builds for the latest experiments.
        </p>
      </header>
      <section className="rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft dark:bg-slate-950/60">
        <CTACluster />
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-card border border-tenney-line bg-white/80 p-5 dark:bg-slate-950/60">
          <h2 className="text-lg font-semibold">TestFlight Beta</h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Expect curated builds with release notes and milestone features.
          </p>
          <a
            href={betaLinks.beta}
            className="mt-4 inline-block text-sm font-semibold text-tenney-blue"
          >
            Join the beta →
          </a>
        </div>
        <div className="rounded-card border border-tenney-line bg-white/80 p-5 dark:bg-slate-950/60">
          <h2 className="text-lg font-semibold">Nightly Builds</h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Grab the latest experimental build for feedback and testing.
          </p>
          <a
            href={betaLinks.nightly}
            className="mt-4 inline-block text-sm font-semibold text-tenney-blue"
          >
            Download nightly →
          </a>
        </div>
      </section>
    </main>
  );
}
