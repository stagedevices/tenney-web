import Section from '../components/Section';

const Privacy = () => (
  <Section>
    <div className="space-y-6">
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Privacy</p>
      <h1 className="text-4xl font-semibold text-white">Privacy policy</h1>
      <p className="text-sm text-white/70">
        Tenney operates fully offline with no accounts. We do not collect personal data. Analytics,
        if enabled in future builds, will be opt-in and documented here.
      </p>
    </div>
  </Section>
);

export default Privacy;
