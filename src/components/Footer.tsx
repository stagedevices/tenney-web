import AppStoreBadge from './AppStoreBadge';
import {
  APP_STORE_URL,
  ANDROID_HELP_URL,
  CONTACT_EMAIL,
  DISCORD_URL,
  GITHUB_URL,
  NIGHTLY_URL,
  STAGE_DEVICES_URL,
} from '../config';

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#05070B]">
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Tenney</p>
        <p className="text-sm text-white/70">
          Just-intonation tuner & lattice — serious tracking, zero clutter.
        </p>
        <AppStoreBadge variant="white" />
      </div>
      <div className="space-y-3 text-sm text-white/70">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Product</p>
        <a className="block hover:text-white" href={APP_STORE_URL}>
          Download
        </a>
        <a className="block hover:text-white" href={NIGHTLY_URL}>
          Nightly
        </a>
        <a className="block hover:text-white" href="/docs">
          Docs
        </a>
        <a className="block hover:text-white" href="/docs/learn">
          Learn
        </a>
        <a className="block hover:text-white" href={ANDROID_HELP_URL}>
          Help ship Android
        </a>
      </div>
      <div className="space-y-3 text-sm text-white/70">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Community</p>
        <a className="block hover:text-white" href={DISCORD_URL}>
          Discord
        </a>
        <a className="block hover:text-white" href={GITHUB_URL}>
          GitHub
        </a>
        <a className="block hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
          Email
        </a>
      </div>
      <div className="space-y-3 text-sm text-white/70">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Legal</p>
        <a className="block hover:text-white" href="/privacy">
          Privacy
        </a>
        <a className="block hover:text-white" href={STAGE_DEVICES_URL}>
          Stage Devices
        </a>
        <p className="pt-6 text-xs uppercase tracking-[0.3em] text-white/40">Stage Devices, 2025</p>
      </div>
    </div>
  </footer>
);

export default Footer;
