import { Link } from "react-router-dom";
import { useTheme } from "../lib/theme";
import { APP_STORE_BADGE_DARK, APP_STORE_BADGE_LIGHT, APP_STORE_LINK, IOS_TESTFLIGHT_LATEST } from "./CTACluster";
import TenneyButton from "./TenneyButton";

const baseUrl = import.meta.env.BASE_URL || "/";
const docsHref = `${baseUrl}docs/`;

const STAGE_DEVICES_LINK = "https://stagedevices.com";

export default function Footer() {
  const { effectiveTheme } = useTheme();
  const badgeSrc = effectiveTheme === "dark" ? APP_STORE_BADGE_DARK : APP_STORE_BADGE_LIGHT;

  const year = new Date().getFullYear();

  return (
    <footer className="tenney-pagegrid border-t border-tenney-line/70">
      <div className="mx-auto max-w-6xl space-y-12 px-6 pb-16 pt-14">
        <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Keep Tenney within reach.</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Install the app or join the Public Beta (TestFlight) to experience the newest stage-ready builds.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={APP_STORE_LINK} target="_blank" rel="noreferrer noopener">
                <img src={badgeSrc} alt="Download on the App Store" className="h-12" />
              </a>
              <TenneyButton
                as="a"
                href={IOS_TESTFLIGHT_LATEST}
                target="_blank"
                rel="noreferrer noopener"
                size="sm"
                variant="primary"
              >
                Join Public Beta
              </TenneyButton>
            </div>
          </div>
        </div>

        <div className="tenney-footer-divider" aria-hidden />

        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h4 className="text-sm font-semibold">Docs</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <a className="transition hover:text-slate-900 dark:hover:text-white" href={docsHref}>
                  Tenney Docs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <a
                  className="transition hover:text-slate-900 dark:hover:text-white"
                  href={STAGE_DEVICES_LINK}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Stage Devices
                </a>
              </li>
              <li>
                <Link className="transition hover:text-slate-900 dark:hover:text-white" to="/press">
                  Press
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-slate-900 dark:hover:text-white" to="/beta">
                  Beta
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <Link className="transition hover:text-slate-900 dark:hover:text-white" to="/privacy">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Social</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300" />
          </div>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">© {year} Stage Devices.</div>
      </div>
    </footer>
  );
}
