import Section from '../components/Section';
import { NIGHTLY_URL } from '../config';

const Nightly = () => (
  <Section>
    <div className="space-y-6">
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Nightly</p>
      <h1 className="text-4xl font-semibold text-white">Nightly builds via TestFlight.</h1>
      <p className="text-lg text-white/70">Nightly builds via TestFlight. For new features and regressions-in-flight.</p>
      <a className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white hover:border-e5orange" href={NIGHTLY_URL}>
        Join TestFlight
      </a>
    </div>
  </Section>
);

export default Nightly;
