import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NIGHTLY_URL } from '../config';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isInstrument, setIsInstrument] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setIsInstrument(true);
      return;
    }

    const handleScroll = () => {
      setIsInstrument(window.scrollY > window.innerHeight * 0.8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const handleDownload = () => {
    if (!isHome) {
      navigate('/');
      window.setTimeout(() => {
        const target = document.getElementById('cta');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return;
    }

    const target = document.getElementById('cta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isInstrument
          ? 'border-b border-white/10 bg-[#05070B]/90 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-semibold tracking-[0.2em] text-white">
            TENNEY
          </Link>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-white/50 md:inline">
            Stage Devices
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.3em] text-white/70 md:flex">
          <Link className="hover:text-white" to="/docs">
            Docs
          </Link>
          <Link className="hover:text-white" to="/press">
            Press
          </Link>
          <Link className="hover:text-white" to="/nightly">
            Nightly
          </Link>
          <Link className="hover:text-white" to="/privacy">
            Privacy
          </Link>
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a className="text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white" href={NIGHTLY_URL}>
            TestFlight
          </a>
          <button
            type="button"
            onClick={handleDownload}
            className="text-xs uppercase tracking-[0.3em] text-white/80 hover:text-white"
          >
            Download
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
