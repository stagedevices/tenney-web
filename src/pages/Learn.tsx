import Section from '../components/Section';

const Learn = () => (
  <div className="text-black">
    <Section>
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-black/60">Learn JI</p>
        <h1 className="text-4xl font-semibold text-black">Learn just intonation</h1>
        <p className="text-lg text-black/70">
          A short path through ratio space, tuning practice, and lattice navigation.
        </p>
        <ul className="space-y-3 text-sm text-black/70">
          <li>• Why limits matter and how Tenney keeps structure intact.</li>
          <li>• Reading deviations and interpreting 1¢ precision.</li>
          <li>• Saving, exporting, and sharing systems for collaborators.</li>
        </ul>
      </div>
    </Section>
  </div>
);

export default Learn;
