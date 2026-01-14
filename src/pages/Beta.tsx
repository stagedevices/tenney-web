import BackgroundField from "../components/BackgroundField";
import { APP_STORE_BADGE_DARK, APP_STORE_BADGE_LIGHT, APP_STORE_LINK } from "../components/CTACluster";
import TenneyButton from "../components/TenneyButton";
import { useTheme } from "../lib/theme";

const IOS_TESTFLIGHT_LATEST = "https://testflight.apple.com/join/mWAWKYHT";
const MAC_TESTFLIGHT_LATEST = "https://testflight.apple.com/join/ykZPRCGW";
const ANDROID_REPO = "https://github.com/stagedevices/tenney-android";
const ANDROID_ISSUES = "https://github.com/stagedevices/tenney-android/issues";

type BuildRowProps = {
  label: string;
  href?: string;
  whatsNew: string;
};

function BuildRow({ label, href, whatsNew }: BuildRowProps) {
  const isDisabled = !href;

  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{label}</span>
          <span className="rounded-full border border-tenney-line/70 bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-950/60 dark:text-slate-300">
            TestFlight
          </span>
        </div>
        <details className="text-xs text-slate-600 dark:text-slate-300">
          <summary className="cursor-pointer text-xs font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            What&apos;s new
          </summary>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{whatsNew}</p>
        </details>
      </div>
      <div className="flex items-center gap-3">
        <TenneyButton
          as="a"
          href={href}
          target={href ? "_blank" : undefined}
          rel={href ? "noreferrer noopener" : undefined}
          size="sm"
          variant="secondary"
          tone="warm"
          disabled={isDisabled}
        >
          Open TestFlight
        </TenneyButton>
        {isDisabled ? <span className="text-[11px] text-slate-500 dark:text-slate-400">Link pending</span> : null}
      </div>
    </div>
  );
}

export default function Beta() {
  const { effectiveTheme } = useTheme();
  const badgeSrc = effectiveTheme === "dark" ? APP_STORE_BADGE_DARK : APP_STORE_BADGE_LIGHT;
  const screenSrc = new URL("assets/screens/screen-01-lattice-overview.png", import.meta.env.BASE_URL).toString();

  return (
    <main className="relative tenney-pagegrid">
      <BackgroundField />
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <header className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Download
            </p>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Download Tenney</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Stable releases on the App Store. Preview builds via Public Beta (TestFlight).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={APP_STORE_LINK} target="_blank" rel="noreferrer noopener">
                <img src={badgeSrc} alt="Download on the App Store" className="h-12" />
              </a>
              <TenneyButton
                as="a"
                href={IOS_TESTFLIGHT_LATEST}
                target="_blank"
                rel="noreferrer noopener"
                variant="primary"
              >
                Join Public Beta
              </TenneyButton>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/70 p-4 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
              <img
                src={screenSrc}
                alt="Tenney lattice preview on iPhone"
                className="h-auto w-64 rounded-2xl border border-white/40 shadow-lg dark:border-slate-900/40"
              />
            </div>
          </div>
        </header>

        <div className="tenney-footer-divider" aria-hidden />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Stable downloads</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">iOS App Store</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                Stable release • iPhone + iPad
              </p>
              <div className="mt-4 space-y-3">
                <a href={APP_STORE_LINK} target="_blank" rel="noreferrer noopener">
                  <img src={badgeSrc} alt="Download on the App Store" className="h-12" />
                </a>
                <a className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" href="#">
                  Release notes
                </a>
              </div>
            </div>
            <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Mac (Public Beta)</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                Preview build • macOS via TestFlight
              </p>
              <TenneyButton
                as="a"
                href={MAC_TESTFLIGHT_LATEST}
                target="_blank"
                rel="noreferrer noopener"
                size="sm"
                variant="primary"
                className="mt-4"
              >
                Join Public Beta
              </TenneyButton>
            </div>
          </div>
        </section>

        <div className="tenney-footer-divider" aria-hidden />

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Public Beta (TestFlight)</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Preview builds. Same app, newer features. Install via TestFlight.
            </p>
          </div>
          <TenneyButton
            as="a"
            href={IOS_TESTFLIGHT_LATEST}
            target="_blank"
            rel="noreferrer noopener"
            variant="primary"
            size="sm"
          >
            Join Public Beta
          </TenneyButton>
          <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Build list
            </h3>
            <div className="mt-4 divide-y divide-tenney-line/70">
              <BuildRow
                label="Latest"
                href={IOS_TESTFLIGHT_LATEST}
                whatsNew="A curated TestFlight build with the newest lattice tweaks and stability fixes."
              />
              <BuildRow
                label="v0.2-8"
                whatsNew="Release notes are being finalized. Expect tuning improvements and export refinements."
              />
              <BuildRow
                label="v0.2-9"
                whatsNew="Release notes are being finalized. Expect upgraded pads and stage-mode clarity."
              />
            </div>
          </div>
        </section>

        <div className="tenney-footer-divider" aria-hidden />

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Tenney for Android</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              No Android release yet. If you want this to exist, help build it.
            </p>
          </div>
          <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Help shape the Android roadmap</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Join the repo and take on issues that move Tenney toward Android parity.
                </p>
                <ul className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <li className="rounded-full border border-tenney-line/70 px-3 py-1">Kotlin/Compose</li>
                  <li className="rounded-full border border-tenney-line/70 px-3 py-1">audio input + pitch detection</li>
                  <li className="rounded-full border border-tenney-line/70 px-3 py-1">UI parity</li>
                  <li className="rounded-full border border-tenney-line/70 px-3 py-1">export formats</li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <TenneyButton
                  as="a"
                  href={ANDROID_REPO}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="primary"
                  size="sm"
                >
                  Open Tenney Android repo
                </TenneyButton>
                <TenneyButton
                  as="a"
                  href={ANDROID_ISSUES}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                  size="sm"
                >
                  Good first issues
                </TenneyButton>
              </div>
            </div>
          </div>
        </section>

        <div className="tenney-footer-divider" aria-hidden />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">FAQ</h2>
          <div className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-6 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
            <div className="space-y-4">
              {[
                {
                  question: "Why TestFlight?",
                  answer: "TestFlight lets us ship preview builds quickly while keeping the App Store release stable.",
                },
                {
                  question: "Is Public Beta stable enough for performance?",
                  answer: "Public Beta (TestFlight) builds are curated for stability, but keep the App Store version for critical performances.",
                },
                {
                  question: "Where did “nightly” go?",
                  answer: "We call all preview builds Public Beta (TestFlight) for clarity.",
                },
              ].map((item) => (
                <details key={item.question} className="border-b border-tenney-line/60 pb-4 last:border-b-0 last:pb-0">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
