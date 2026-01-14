import SectionFrame from '../components/SectionFrame';
import { NIGHTLY_URL } from '../config';

const Nightly = () => (
  <SectionFrame className="space-y-8">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Nightly</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">TestFlight nightly builds</h1>
      <p className="mt-4 text-lg text-white/60">
        Nightly builds via TestFlight. For new features and regressions-in-flight.
      </p>
    </div>
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-white/70">
        Join the TestFlight channel to access nightly builds and instrumentation updates.
      </p>
      <a
        className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80 hover:text-white"
        href={NIGHTLY_URL}
      >
        Join TestFlight
      </a>
    </div>
  </SectionFrame>
);

export default Nightly;
