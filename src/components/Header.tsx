import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AppStoreBadge from './AppStoreBadge';

const Header = () => {
  const [compact, setCompact] = useState(false);
  const location = useLocation();
  const paperMode = location.pathname.startsWith('/docs');

  useEffect(() => {
    const sentinel = document.querySelector('[data-hero-sentinel]');
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCompact(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const baseText = paperMode ? 'text-black/80' : 'text-white/80';
  const hoverText = paperMode ? 'hover:text-black' : 'hover:text-white';
  const ringColor = paperMode ? 'focus-visible:outline-black' : 'focus-visible:outline-e3blue';

  return (
    <header className={`fixed left-0 top-0 z-40 w-full transition ${compact ? (paperMode ? 'bg-white/80 border-b border-black/10 backdrop-blur' : 'bg-black/40 backdrop-blur border-b border-white/10') : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className={`flex items-center gap-3 ${paperMode ? 'text-black' : 'text-white'}`}>
          <img src="/assets/tenney-mark.svg" alt="Tenney" className="h-8 w-8" />
          <span className="text-sm uppercase tracking-[0.2em]">Tenney</span>
        </NavLink>
        <nav className={`flex items-center gap-4 text-sm ${baseText}`}>
          <NavLink className={`${hoverText} focus-visible:outline focus-visible:outline-2 ${ringColor} rounded`} to="/docs">Docs</NavLink>
          <NavLink className={`${hoverText} focus-visible:outline focus-visible:outline-2 ${ringColor} rounded`} to="/nightly">Nightly</NavLink>
          <div className="hidden md:block">
            <AppStoreBadge variant={paperMode ? 'black' : 'white'} className="scale-75 origin-right" />
          </div>
          <a className={`md:hidden rounded-full border ${paperMode ? 'border-black/30 text-black' : 'border-white/30 text-white'} px-4 py-2 ${hoverText} focus-visible:outline focus-visible:outline-2 ${ringColor}`} href="#download">Download</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
