import Section from '../components/Section';
import AppStoreBadge from '../components/AppStoreBadge';

const Docs = () => (
  <div className="text-black">
    <Section>
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-black/60">Docs</p>
        <h1 className="text-4xl font-semibold text-black">Tenney documentation</h1>
        <p className="text-lg text-black/70">
          Field guides for tuning workflows, lattice navigation, and system management.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6">
            <h2 className="text-xl font-semibold">Quickstart</h2>
            <p className="mt-2 text-sm text-black/70">Set root + limit, traverse ratios, and lock reference pitches.</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6">
            <h2 className="text-xl font-semibold">Data formats</h2>
            <p className="mt-2 text-sm text-black/70">Export Scala, import saved sets, and share instrument-ready systems.</p>
          </div>
        </div>
        <AppStoreBadge variant="black" />
      </div>
    </Section>
  </div>
);

export default Docs;
