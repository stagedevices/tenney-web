import { useTheme } from "../lib/theme";
import TenneyButton from "./TenneyButton";

const APP_STORE_LINK =
  "https://apps.apple.com/us/app/tenney/id6753315813?itscg=30200&itsct=apps_box_badge&mttnsubad=6753315813";
const APP_STORE_BADGE_LIGHT =
  "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1764547200";
const APP_STORE_BADGE_DARK =
  "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1764547200";

const BETA_LINK = "https://example.com/tenney-beta";
const NIGHTLY_LINK = "https://example.com/tenney-nightly";

export const betaLinks = {
  beta: BETA_LINK,
  nightly: NIGHTLY_LINK,
};

export default function CTACluster() {
  const { effectiveTheme } = useTheme();
  const badgeSrc = effectiveTheme === "dark" ? APP_STORE_BADGE_DARK : APP_STORE_BADGE_LIGHT;

  return (
    <div className="flex flex-col gap-4">
      <a href={APP_STORE_LINK} target="_blank" rel="noreferrer">
        <img src={badgeSrc} alt="Download on the App Store" className="h-12" />
      </a>
      <div className="flex flex-wrap gap-3">
        <TenneyButton
          href={BETA_LINK}
          target="_blank"
          rel="noreferrer"
          as="a"
          size="sm"
          variant="primary"
        >
          Join TestFlight Beta
        </TenneyButton>
        <TenneyButton
          href={NIGHTLY_LINK}
          target="_blank"
          rel="noreferrer"
          as="a"
          size="sm"
          variant="secondary"
        >
          Nightly Builds
        </TenneyButton>
      </div>
    </div>
  );
}
