import { Link } from "react-router-dom";

const Beta = () => {
  return (
    <main className="relative mx-auto w-full max-w-4xl px-6 py-20">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Join the public beta</h1>
        <p className="text-white/70">
          Get early access to Tenney, share feedback, and help refine the tuning
          engine built for performers.
        </p>
        <a
          href="https://stagedevices.github.io/tenney-web/beta"
          className="inline-flex items-center gap-2 rounded-full bg-mint-400 px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:-translate-y-0.5"
        >
          Request access
        </a>
        <p className="text-white/50 text-sm">
          Back to <Link to="/">Tenney overview</Link>.
        </p>
      </div>
    </main>
  );
};

export default Beta;
