import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  { to: '/', label: 'Tenney' },
  { to: '/docs', label: 'Docs' },
  { to: '/beta', label: 'Beta' }
];

export default function GlassNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-white/80">
          <span className="h-2 w-2 rounded-full bg-aurora shadow-glow" />
          TENNEY
        </div>
        <div className="flex items-center gap-6 text-sm text-white/70">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative transition-colors ${isActive ? 'text-white' : 'hover:text-white'}`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-aurora"
                    />
                  ) : null}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
