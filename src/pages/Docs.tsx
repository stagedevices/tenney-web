import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <main className="relative mx-auto w-full max-w-4xl px-6 py-20">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Docs</h1>
        <p className="text-white/70">
          Learn the lattice, tuning workflow, and performance features behind
          Tenney.
        </p>
        <a
          href="https://stagedevices.github.io/tenney-web/docs"
          className="inline-flex items-center gap-2 rounded-full bg-mint-400 px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:-translate-y-0.5"
        >
          Open docs
        </a>
        <p className="text-white/50 text-sm">
          Or head back to the <Link to="/">marketing page</Link>.
        </p>
      </div>
    </main>
  );
};

export default Docs;
