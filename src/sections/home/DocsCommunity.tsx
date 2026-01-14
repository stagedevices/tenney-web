import SectionFrame from '../../components/SectionFrame';
import {
  ANDROID_HELP_URL,
  CONTACT_EMAIL,
  DISCORD_URL,
  GITHUB_URL,
  NIGHTLY_URL,
} from '../../config';

const DocsCommunity = () => (
  <SectionFrame className="space-y-10">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Docs + community</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Guides, support, and nightly builds.</h2>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <a className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/30" href="/docs">
        <h3 className="text-lg font-semibold text-white">Docs</h3>
        <p className="mt-2 text-sm text-white/60">Instrument-manual flows and system notes.</p>
      </a>
      <a className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/30" href="/docs/learn">
        <h3 className="text-lg font-semibold text-white">Learn JI</h3>
        <p className="mt-2 text-sm text-white/60">Start with just intonation basics.</p>
      </a>
      <a className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/30" href={DISCORD_URL}>
        <h3 className="text-lg font-semibold text-white">Discord</h3>
        <p className="mt-2 text-sm text-white/60">Community Q&A and tuning logs.</p>
      </a>
      <a className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/30" href={GITHUB_URL}>
        <h3 className="text-lg font-semibold text-white">GitHub</h3>
        <p className="mt-2 text-sm text-white/60">Track issues and roadmap experiments.</p>
      </a>
      <a className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/30" href={`mailto:${CONTACT_EMAIL}`}>
        <h3 className="text-lg font-semibold text-white">Email</h3>
        <p className="mt-2 text-sm text-white/60">developer@stagedevices.com</p>
      </a>
      <a className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/30" href="/nightly">
        <h3 className="text-lg font-semibold text-white">Nightly builds</h3>
        <p className="mt-2 text-sm text-white/60">TestFlight nightly pipeline.</p>
      </a>
    </div>
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white">Help ship Android.</h3>
      <p className="mt-2 text-sm text-white/60">
        Android is not shipped yet. If you can help—Swift-on-Android or native Android—reach out.
      </p>
      <a className="mt-4 inline-block text-sm uppercase tracking-[0.3em] text-white/70" href={ANDROID_HELP_URL}>
        Contact the team
      </a>
    </div>
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-white/60">
        <a className="text-white/80 hover:text-white" href={NIGHTLY_URL}>
          Nightly builds via TestFlight.
        </a>{' '}
        For new features and regressions-in-flight.
      </p>
    </div>
  </SectionFrame>
);

export default DocsCommunity;
