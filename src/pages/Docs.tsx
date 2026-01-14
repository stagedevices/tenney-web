export default function Docs() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-16">
      <h1 className="text-3xl font-semibold">Tenney Docs</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Documentation is coming online. Until then, explore the quick links below.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "Getting started", description: "Short onboarding for new performers." },
          { title: "Lattice theory", description: "Deep dive into ratios and mapping." },
          { title: "Stage workflow", description: "Best practices for live use." },
          { title: "Export formats", description: "Share scales and datasets." },
        ].map((item) => (
          <div
            key={item.title}
            className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-5 shadow-soft dark:bg-slate-950/60"
          >
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
