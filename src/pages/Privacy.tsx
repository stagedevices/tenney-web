import SectionFrame from '../components/SectionFrame';

const Privacy = () => (
  <SectionFrame className="space-y-6">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Privacy</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Privacy policy</h1>
    </div>
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
      <p>
        Tenney does not require accounts and operates offline. If analytics are enabled, we use
        Cloudflare privacy-focused analytics to understand high-level traffic patterns.
      </p>
    </div>
  </SectionFrame>
);

export default Privacy;
