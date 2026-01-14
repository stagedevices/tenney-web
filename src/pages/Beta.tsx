import CTACluster, { betaLinks } from "../components/CTACluster";
import TenneyButton from "../components/TenneyButton";

export default function Beta() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Join the Tenney Beta</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Get early access to upcoming Tenney features with curated TestFlight releases.
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
          <h2 className="text-lg font-semibold">What to expect</h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Beta builds focus on stability, performance tuning, and polished stage workflows.
          </p>
        </div>
      </section>
    </main>
  );
}
