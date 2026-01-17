import { APP_STORE_LINK, IOS_TESTFLIGHT_LATEST } from "../../components/CTACluster";

export type PressAsset = {
  label: string;
  pathPng: string;
  caption: string;
  copyright: string;
  copyrightDate: string;
};

export type PressScreenshot = PressAsset & {
  deviceFamily: "iPhone" | "iPad" | "Mac";
};

export type PressHeroDevice = {
  label: string;
  deviceFamily: "iPhone" | "iPad" | "Mac";
  pathSvg: string;
  caption: string;
};

export type PressManifest = {
  version: string;
  contactEmail: string;
  links: {
    appStoreUrl: string;
    testFlightUrl: string;
  };
  downloads: {
    pressKitZipPath: string;
    factsheetPdfPath: string;
  };
  heroDevices: PressHeroDevice[];
  logos: PressAsset[];
  screenshots: PressScreenshot[];
  copyBlocks: {
    oneLiner: string;
    short: string;
    extended: string;
    storyAngles: [string, string, string];
    featureBullets: [string, string, string, string, string];
    stageDevicesBoilerplate: string;
  };
  quickFacts: Array<{ label: string; value: string }>;
  usageRules: string[];
  faq: Array<{ q: string; aPlain: string; aTheory: string }>;
};

const pressManifest = {
  version: "v0.1",
  contactEmail: "legal@stagedevices.com",
  links: {
    appStoreUrl: APP_STORE_LINK,
    testFlightUrl: IOS_TESTFLIGHT_LATEST,
  },
  downloads: {
    pressKitZipPath: "/press/presskit.zip",
    factsheetPdfPath: "/press/factsheet.pdf",
  },
  heroDevices: [
    {
      label: "Tenney iPhone hero placeholder",
      deviceFamily: "iPhone",
      pathSvg: "/assets/press/press-hero-device-iphone.png",
      caption: "Tenney for iPhone",
    },
    {
      label: "Tenney iPad hero placeholder",
      deviceFamily: "iPad",
      pathSvg: "/assets/press/press-hero-device-ipad.png",
      caption: "Tenney for iPad",
    },
    {
      label: "Tenney Mac hero placeholder",
      deviceFamily: "Mac",
      pathSvg: "/assets/press/press-hero-device-mac.png",
      caption: "Tenney for Mac",
    },
  ],
  logos: [
    {
      label: "Tenney wordmark",
      pathPng: "/assets/wordmark.png",
      caption: "Tenney wordmark on transparent background.",
      copyright: "Stage Devices",
      copyrightDate: "2025-02-01",
    },
  ],
  screenshots: [
    {
      label: "Lattice overview",
      pathPng: "/assets/screens/screen-01-lattice-overview.png",
      deviceFamily: "iPhone",
      caption: "Lattice overview showing pitch as a navigable space.",
      copyright: "Stage Devices",
      copyrightDate: "2025-02-01",
    },
    {
      label: "Lattice info card",
      pathPng: "/assets/screens/screen-02-lattice-info-card.png",
      deviceFamily: "iPhone",
      caption: "Ratio details and interval context on a lattice node.",
      copyright: "Stage Devices",
      copyrightDate: "2025-02-01",
    },
    {
      label: "Pads builder",
      pathPng: "/assets/screens/screen-03-pads-builder-scope.png",
      deviceFamily: "iPad",
      caption: "Pads builder and scope tools for performance setup.",
      copyright: "Stage Devices",
      copyrightDate: "2025-02-01",
    },
    {
      label: "Scale save + export",
      pathPng: "/assets/screens/screen-04-scale-save-export.png",
      deviceFamily: "iPhone",
      caption: "Save, export, and share custom tuning sets.",
      copyright: "Stage Devices",
      copyrightDate: "2025-02-01",
    },
    {
      label: "Tuner overview",
      pathPng: "/assets/screens/screen-05-tuner-overview.png",
      deviceFamily: "Mac",
      caption: "Stage-ready tuner view with harmonic reference.",
      copyright: "Stage Devices",
      copyrightDate: "2025-02-01",
    },
    {
      label: "Prime overlays",
      pathPng: "/assets/screens/screen-07-prime-overlays.png",
      deviceFamily: "iPhone",
      caption: "Prime overlays reveal harmonic neighborhoods at a glance.",
      copyright: "Stage Devices",
      copyrightDate: "2025-02-01",
    },
  ],
  copyBlocks: {
    oneLiner: "Tenney turns just intonation into a navigable lattice for composers, performers, and tuners.",
    short:
      "Tenney is a harmonic exploration tool that renders pitch as a spatial lattice. It lets performers map just intonation, audition ratios, and save tunings with a visual context that stays readable on stage.",
    extended:
      "Tenney is an iOS/macOS music tool for just intonation. Instead of scrolling through ratios, performers move through a lattice where musical distance is spatial distance. Tap a pitch to reveal its ratio, prime-limit context, and cents offset, then save tunings or performance layouts for later sessions. Tenney keeps a constant visual reference so ensembles can agree on harmonic vocabulary while exploring new territory.",
    storyAngles: [
      "A new spatial interface for just intonation that treats ratios as a navigable map.",
      "How Tenney bridges rigorous tuning theory with stage-ready performance tools.",
      "The resurgence of microtonal composition workflows on iOS and macOS.",
    ],
    featureBullets: [
      "Interactive lattice for exploring ratios and prime-limit neighborhoods.",
      "Ratio cards with cents offsets for quick verification.",
      "Pads and scopes for performance layouts and gesture control.",
      "Save, export, and share tuning sets.",
      "Stage-ready tuner and overlay views for rehearsal clarity.",
    ],
    stageDevicesBoilerplate:
      "Stage Devices is an independent studio building tools for modern musicians. We focus on interfaces that turn complex theory into tactile, performance-ready workflows.",
  },
  quickFacts: [
    { label: "Product", value: "Tenney" },
    { label: "Company", value: "Stage Devices" },
    { label: "Category", value: "Music / Microtonal Tools" },
    { label: "Availability", value: "App Store + Public Beta (TestFlight)" },
    { label: "Platforms", value: "iPhone, iPad, Mac (TestFlight)" },
    { label: "Website", value: "tenneyapp.com" },
    { label: "Press contact", value: "legal@stagedevices.com" },
  ],
  usageRules: [
    "Editorial use only (press coverage, reviews, news).",
    "Do not modify marks: no recolor, distortion, rotation, outlines, or filters.",
    "Do not use marks or screenshots in paid advertising, sponsorships, or endorsements without permission.",
    "Use provided PNGs only (for now).",
    "Questions? Contact legal@stagedevices.com.",
  ],
  faq: [
    {
      q: "What is Tenney?",
      aPlain:
        "Tenney is a visual music tool for exploring tuning. It shows pitch relationships as a map so you can hear and navigate harmonic space instead of scrolling through lists.",
      aTheory:
        "Tenney treats pitch as a lattice of ratios. The interface keeps prime-factor relationships visible so harmonic distance is readable at a glance.",
    },
    {
      q: "What is just intonation, and how does Tenney use it?",
      aPlain:
        "Just intonation means tuning notes to simple frequency ratios so intervals sound pure. Tenney makes those ratios tangible by placing them on a map you can move through and save for performance.",
      aTheory:
        "Just intonation expresses pitch as rational ratios relative to a tonic. Tenney plots those ratios on a lattice, lets you filter by prime limits, and stores the chosen ratios as reusable tuning sets.",
    },
    {
      q: "Who is Tenney for?",
      aPlain:
        "Composers, performers, and educators who want to hear microtonal relationships quickly without losing context.",
      aTheory:
        "Ideal for practitioners of JI, microtonal composition, and harmonic research who need a repeatable, stage-ready workflow.",
    },
    {
      q: "How do I access the latest builds?",
      aPlain:
        "The stable release is on the App Store, and preview builds are available via TestFlight.",
      aTheory:
        "Use the App Store for the production channel and TestFlight for pre-release builds with experimental lattice and tuning features.",
    },
  ],
} satisfies PressManifest;

export default pressManifest;
