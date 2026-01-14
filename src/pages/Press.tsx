import SectionFrame from '../components/SectionFrame';
import SafeImage from '../components/SafeImage';
import { PRESS_KIT_URL, STAGE_DEVICES_URL } from '../config';

const Press = () => (
  <SectionFrame className="space-y-10">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Press kit</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Tenney press resources</h1>
      <p className="mt-4 text-lg text-white/60">
        Brand mark, screenshots, and boilerplate information for press and partners.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Brand mark</h2>
        <div className="mt-4 flex h-32 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
          <SafeImage src="/public/assets/tenney-mark.svg" alt="Tenney mark" className="h-16" />
        </div>
        <a className="mt-4 inline-block text-xs uppercase tracking-[0.3em] text-white/70" href={PRESS_KIT_URL}>
          Download press kit
        </a>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Boilerplate</h2>
        <p className="mt-3 text-sm text-white/70">
          Tenney is a just-intonation tuner and lattice tool built by Stage Devices for composers,
          instrument builders, and experimental performers.
        </p>
        <a className="mt-4 inline-block text-xs uppercase tracking-[0.3em] text-white/70" href={STAGE_DEVICES_URL}>
          Stage Devices
        </a>
      </div>
    </div>
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold text-white">Screenshots</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {['/assets/hero-device-iphone@2x.png', '/assets/hero-device-ipad@2x.png', '/assets/hero-device-macos@2x.png'].map(
          (src) => (
            <div key={src} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <SafeImage src={src} alt="Tenney screenshot placeholder" className="h-32 w-full object-contain" />
            </div>
          )
        )}
      </div>
    </div>
  </SectionFrame>
);

export default Press;
