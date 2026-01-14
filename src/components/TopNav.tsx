import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../lib/theme";

const modes = [
  { id: "system", label: "Auto" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
] as const;

export default function TopNav() {
  const { mode, setMode } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-tenney-line/60 bg-white/70 backdrop-blur-xl dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Tenney
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {[
            { to: "/", label: "Home" },
            { to: "/docs", label: "Docs" },
            { to: "/beta", label: "Beta" },
            { to: "/press", label: "Press" },
            { to: "/privacy", label: "Privacy" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition ${isActive ? "text-tenney-blue" : "text-slate-600 dark:text-slate-300"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="glass-pill flex rounded-pill p-1 text-xs text-slate-700 dark:text-slate-200">
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={`rounded-pill px-3 py-1 transition ${
                  mode === item.id
                    ? "bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-white"
                    : "opacity-70"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
