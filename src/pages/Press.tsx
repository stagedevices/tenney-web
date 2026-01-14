import Section from '../components/Section';
import { PRESS_KIT_URL } from '../config';

const Press = () => (
  <Section>
    <div className="space-y-8">
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Press</p>
      <h1 className="text-4xl font-semibold text-white">Press kit</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">App icon</h2>
          <img src="/assets/app-icon.png" alt="Tenney app icon" className="mt-4 h-32 w-32 rounded-2xl" />
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Download</h2>
          <p className="mt-2 text-sm text-white/70">High-resolution assets, logotype, and screenshots.</p>
          <a className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-white" href={PRESS_KIT_URL}>
            Download kit
          </a>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Screenshots</h2>
        <p className="mt-2 text-sm text-white/70">Screenshots are available in the press kit download.</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Boilerplate</h2>
        <p className="mt-2 text-sm text-white/70">
          Tenney is a navigable instrument for just intonation. It combines tuner-grade precision with a
          lattice-based system builder for quick navigation, saving, and export.
        </p>
      </div>
    </div>
  </Section>
);

export default Press;
