const screenshots = [
  "/tenney-web/assets/screens/screen-01-lattice-overview.png",
  "/tenney-web/assets/screens/screen-02-lattice-info-card.png",
  "/tenney-web/assets/screens/screen-03-pads-builder-scope.png",
  "/tenney-web/assets/screens/screen-04-scale-save-export.png",
  "/tenney-web/assets/screens/screen-05-tuner-overview.png",
  "/tenney-web/assets/screens/screen-06-tuner-locked.png",
  "/tenney-web/assets/screens/screen-07-prime-overlays.png",
  "/tenney-web/assets/screens/screen-08-stage-mode.png",
];

export default function Press() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Press Kit</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Tenney is a harmonic exploration tool that renders pitch as a spatial lattice. Use the assets below for press coverage.
        </p>
      </header>
      <section className="rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft dark:bg-slate-950/60">
        <h2 className="text-lg font-semibold">App icon</h2>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
          Download the primary icon asset.
        </p>
        <a
          href="/tenney-web/assets/app-icon.png"
          className="mt-4 inline-block text-sm font-semibold text-tenney-blue"
        >
          Download icon →
        </a>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Screenshots</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {screenshots.map((shot) => (
            <div
              key={shot}
              className="rounded-card border border-tenney-line bg-white/70 p-4 shadow-soft dark:bg-slate-950/60"
            >
              <img src={shot} alt="Tenney screenshot" className="w-full rounded-card object-contain" />
              <a
                href={shot}
                className="mt-3 inline-block text-xs font-semibold text-tenney-blue"
              >
                Download →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
