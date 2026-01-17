import { useEffect, useMemo, useState } from "react";
import {
  APP_STORE_BADGE_DARK,
  APP_STORE_BADGE_LIGHT,
} from "../CTACluster";
import TenneyButton from "../TenneyButton";
import { copyText } from "../../lib/clipboard/copyText";
import { forceDownload } from "../../lib/download/forceDownload";
import { useTheme } from "../../lib/theme";

const jumpLinks = [
  { href: "#facts", label: "Facts" },
  { href: "#copy", label: "Copy" },
  { href: "#media", label: "Media" },
  { href: "#faq", label: "FAQ" },
];

type PressRailProps = {
  visible: boolean;
  appStoreUrl: string;
  testFlightUrl: string;
  pressKitUrl: string;
  pressKitFilename: string;
  contactEmail: string;
};

export default function PressRail({
  visible,
  appStoreUrl,
  testFlightUrl,
  pressKitUrl,
  pressKitFilename,
  contactEmail,
}: PressRailProps) {
  if (!visible) {
    return null;
  }
  const { effectiveTheme } = useTheme();
  const badgeSrc = effectiveTheme === "dark" ? APP_STORE_BADGE_DARK : APP_STORE_BADGE_LIGHT;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const railClasses = useMemo(() => {
    return [
      "tenney-plusgrid",
      "rounded-card",
      "border",
      "border-tenney-line",
      "bg-white/85",
      "p-4",
      "shadow-soft",
      "backdrop-blur-lg",
      "dark:bg-slate-950/70",
      "lg:sticky",
      "lg:top-24",
    ]
      .filter(Boolean)
      .join(" ");
  }, []);

  const handleCopy = async () => {
    await copyText(contactEmail);
    setCopied(true);
  };

  return (
    <aside className={railClasses}>
      <div className="space-y-4">
        <TenneyButton
          variant="primary"
          size="sm"
          onClick={() => forceDownload(pressKitUrl, pressKitFilename)}
        >
          Download Press Kit
        </TenneyButton>
        <a href={appStoreUrl} target="_blank" rel="noreferrer noopener">
          <img src={badgeSrc} alt="Download on the App Store" className="h-10" />
        </a>
        <TenneyButton
          as="a"
          href={testFlightUrl}
          target="_blank"
          rel="noreferrer noopener"
          variant="secondary"
          size="sm"
        >
          Join Public Beta
        </TenneyButton>
        <div className="rounded-card border border-tenney-line/70 bg-white/70 px-3 py-2 text-xs text-slate-600 shadow-soft dark:bg-slate-950/60 dark:text-slate-300">
          <a href={`mailto:${contactEmail}`} className="font-semibold text-slate-700 dark:text-slate-100">
            Contact Press
          </a>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span>{contactEmail}</span>
            <button
              type="button"
              className="rounded-full border border-tenney-line/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              onClick={handleCopy}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <div className="space-y-2 border-t border-tenney-line/60 pt-3 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Jump to</p>
          <ul className="space-y-1">
            {jumpLinks.map((link) => (
              <li key={link.href}>
                <a className="hover:text-slate-900 dark:hover:text-white" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
