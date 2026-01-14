import { Link } from 'react-router-dom';
import AppStoreBadge from './AppStoreBadge';
import { CONTACT_EMAIL, DISCORD_URL, GITHUB_URL, NIGHTLY_URL, STAGE_DEVICES_URL } from '../config';

const Footer = ({ paperMode }: { paperMode?: boolean }) => (
  <footer className={`border-t ${paperMode ? 'border-black/10 bg-paper' : 'border-white/10 bg-black/80'} text-sm`}>
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
      <div>
        <p className={`text-xs uppercase tracking-[0.3em] ${paperMode ? 'text-black/60' : 'text-white/60'}`}>Product</p>
        <ul className={`mt-4 space-y-2 ${paperMode ? 'text-black/80' : 'text-white/80'}`}>
          <li><Link to="/" className="hover:text-e3blue">Overview</Link></li>
          <li><Link to="/docs" className="hover:text-e3blue">Docs</Link></li>
          <li><Link to="/nightly" className="hover:text-e3blue">Nightly</Link></li>
          <li><Link to="/press" className="hover:text-e3blue">Press kit</Link></li>
        </ul>
      </div>
      <div>
        <p className={`text-xs uppercase tracking-[0.3em] ${paperMode ? 'text-black/60' : 'text-white/60'}`}>Community</p>
        <ul className={`mt-4 space-y-2 ${paperMode ? 'text-black/80' : 'text-white/80'}`}>
          <li><a href={DISCORD_URL} className="hover:text-e5orange">Discord</a></li>
          <li><a href={GITHUB_URL} className="hover:text-e5orange">GitHub</a></li>
          <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-e5orange">Email</a></li>
        </ul>
      </div>
      <div>
        <p className={`text-xs uppercase tracking-[0.3em] ${paperMode ? 'text-black/60' : 'text-white/60'}`}>Legal</p>
        <ul className={`mt-4 space-y-2 ${paperMode ? 'text-black/80' : 'text-white/80'}`}>
          <li><Link to="/privacy" className="hover:text-e3blue">Privacy</Link></li>
          <li><a href={STAGE_DEVICES_URL} className="hover:text-e3blue">Stage Devices</a></li>
        </ul>
      </div>
      <div className="space-y-4">
        <p className={`${paperMode ? 'text-black/80' : 'text-white/80'}`}>Platforms: iOS • iPadOS • macOS (Catalyst)</p>
        <AppStoreBadge variant={paperMode ? 'black' : 'white'} className="inline-block" />
        <p className={`${paperMode ? 'text-black/60' : 'text-white/50'}`}>Nightly builds via TestFlight. For new features and regressions-in-flight.</p>
        <a className="inline-flex items-center gap-2 text-e5orange" href={NIGHTLY_URL}>Join TestFlight →</a>
      </div>
    </div>
  </footer>
);

export default Footer;
