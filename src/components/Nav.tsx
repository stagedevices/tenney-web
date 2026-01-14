import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/docs", label: "Docs" },
  { to: "/beta", label: "Beta" },
];

const Nav = () => {
  const location = useLocation();

  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-ink-900/70 backdrop-blur">
      <nav className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-6">
        <NavLink to="/" className="text-lg font-semibold tracking-wide">
          Tenney
        </NavLink>
        <div className="flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-white/70">
          {links.map((link) => {
            const isActive =
              link.to === "/" ? location.pathname === "/" : location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className="relative pb-1 transition text-white/80 hover:text-white"
              >
                <span>{link.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 top-full mt-1 h-[2px] w-full rounded-full bg-mint-400"
                  />
                ) : null}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
