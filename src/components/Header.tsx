import { useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useCondensedNav } from "../hooks/useCondensedNav";
import { useTheme } from "../lib/theme";
import BottomDock from "./BottomDock";
import NavPill, { NavItem } from "./NavPill";
import UtilitySheet from "./UtilitySheet";

interface HeaderProps {
  storyBeatIndex?: number;
  storyActive?: boolean;
}

const baseUrl = import.meta.env.BASE_URL || "/";

const docsHref = `${baseUrl}docs/`;

const STAGE_DEVICES_LINK = "https://stagedevices.com";
const TESTFLIGHT_LINK = "https://testflight.apple.com/join/mWAWKYHT";

export default function Header({ storyBeatIndex = 0, storyActive = false }: HeaderProps) {
  const location = useLocation();
  const scrollCondensed = useCondensedNav({ threshold: 140, hysteresis: 36 });
  const condensed = storyActive ? storyBeatIndex >= 1 : scrollCondensed;
  const [sheetOpen, setSheetOpen] = useState(false);
  const [wordmarkError, setWordmarkError] = useState(false);
  const { mode, setMode } = useTheme();
  const ellipsisRef = useRef<HTMLButtonElement>(null);

  const activeId = useMemo(() => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.startsWith("/beta")) return "beta";
    if (path.startsWith("/press")) return "press";
    if (path.startsWith("/privacy")) return "privacy";
    if (path.startsWith("/docs")) return "docs";
    return undefined;
  }, [location.pathname]);

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        id: "home",
        label: "Home",
        to: "/",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 11.5l8-6.5 8 6.5v7a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
          </svg>
        ),
      },
      {
        id: "beta",
        label: "Beta",
        to: "/beta",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.4 4.8 5.3.8-3.9 3.8.9 5.3-4.7-2.5-4.7 2.5.9-5.3-3.9-3.8 5.3-.8z" />
          </svg>
        ),
      },
      {
        id: "press",
        label: "Press",
        to: "/press",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 9h8M7 12h8M7 15h5" />
          </svg>
        ),
      },
      {
        id: "docs",
        label: "Docs",
        href: docsHref,
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h9a3 3 0 0 1 3 3v12a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6M9 12h6M9 16h4" />
          </svg>
        ),
      },
      {
        id: "privacy",
        label: "Privacy",
        to: "/privacy",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l7 3v5c0 5-3.2 7.8-7 9-3.8-1.2-7-4-7-9V7z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.5l2 2 3-3" />
          </svg>
        ),
      },
    ],
    [],
  );

  const handleOpenUtilities = (event: MouseEvent<HTMLButtonElement>) => {
    ellipsisRef.current = event.currentTarget;
    setSheetOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="mx-auto hidden max-w-6xl items-center px-6 py-4 md:grid md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-3">
            {!wordmarkError ? (
              <img
                src={`${baseUrl}assets/wordmark.png`}
                alt="Tenney"
                className="h-6 w-auto"
                onError={() => setWordmarkError(true)}
              />
            ) : (
              <span className="text-sm font-semibold tracking-[0.2em] text-slate-700 dark:text-slate-200">
                TENNEY
              </span>
            )}
          </div>
          <NavPill items={navItems} activeId={activeId} condensed={condensed} />
          <div className="flex items-center justify-end gap-3">
            {condensed ? (
              <button
                ref={ellipsisRef}
                type="button"
                onClick={handleOpenUtilities}
                className="tenney-pill-item tenney-pill-utility"
                aria-label="Open utilities"
                title="Open utilities"
              >
                <span className="tenney-pill-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="6" cy="12" r="1.6" />
                    <circle cx="12" cy="12" r="1.6" />
                    <circle cx="18" cy="12" r="1.6" />
                  </svg>
                </span>
              </button>
            ) : (
              <>
                <a
                  href={STAGE_DEVICES_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Stage Devices
                </a>
                <a
                  href={TESTFLIGHT_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Join TestFlight
                </a>
                <div className="glass-pill flex rounded-pill p-1 text-[11px] text-slate-700 dark:text-slate-200">
                  {[
                    { id: "system", label: "Auto" },
                    { id: "light", label: "Light" },
                    { id: "dark", label: "Dark" },
                  ].map((item) => (
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
              </>
            )}
          </div>
        </div>
      </header>
      <BottomDock
        items={navItems}
        activeId={activeId}
        onOpenUtilities={handleOpenUtilities}
        ellipsisRef={ellipsisRef}
      />
      <UtilitySheet open={sheetOpen} onClose={() => setSheetOpen(false)} returnFocusRef={ellipsisRef} />
    </>
  );
}
