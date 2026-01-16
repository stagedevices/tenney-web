import type { ReactNode } from "react";

export type PrivacyAtAGlanceItem = {
  title: string;
  bullets: string[];
};

export type PrivacyAccordionItem = {
  id: string;
  title: string;
  bullets?: string[];
  body?: ReactNode;
};

export type PrivacyThirdParty = {
  name: string;
  description: string;
  url: string;
};

export const contactEmail = "legal@stagedevices.com";

export const summaryChips = [
  { label: "No ads" },
  { label: "No sale of data" },
  { label: "Offline-first" },
  { label: "Optional diagnostics" },
  { label: "TestFlight may collect data" },
];

export const atAGlance: PrivacyAtAGlanceItem[] = [
  {
    title: "What we collect",
    bullets: [
      "Cookieless website analytics (Cloudflare Web Analytics).",
      "Optional crash reports and logs if you opt in (Sentry).",
      "Device identifiers may appear in diagnostic payloads.",
    ],
  },
  {
    title: "What we don’t collect",
    bullets: [
      "No ads or advertising SDKs.",
      "No selling of personal data.",
      "No accounts, emails, or usernames.",
      "No precise location.",
      "No IP addresses.",
    ],
  },
  {
    title: "When data leaves your device",
    bullets: [
      "Website browsing sends anonymous analytics to Cloudflare.",
      "Crash diagnostics leave the device only after you opt in.",
      "App Store / TestFlight may collect data per Apple policies.",
    ],
  },
  {
    title: "Third parties",
    bullets: [
      "Cloudflare Web Analytics for tenneyapp.com.",
      "Sentry for opt-in crash diagnostics.",
      "Apple services for distribution and billing.",
    ],
  },
  {
    title: "Your choices",
    bullets: [
      "Opt in or out per platform (iOS or macOS).",
      "Toggle in Settings → General → Diagnostics.",
      "Disable diagnostics to keep crash data on-device.",
    ],
  },
];

export const thirdParties: PrivacyThirdParty[] = [
  {
    name: "Cloudflare Web Analytics",
    description: "Cookieless, anonymous website analytics.",
    url: "https://www.cloudflare.com/web-analytics/",
  },
  {
    name: "Sentry",
    description: "Opt-in crash reports and diagnostic logs.",
    url: "https://sentry.io/privacy/",
  },
  {
    name: "Apple Privacy",
    description: "App Store, iCloud, and platform privacy policies.",
    url: "https://www.apple.com/privacy/",
  },
  {
    name: "TestFlight Privacy",
    description: "Public beta data collection policies (TestFlight).",
    url: "https://developer.apple.com/testflight/privacy/",
  },
];

export const accordions: PrivacyAccordionItem[] = [
  {
    id: "website-analytics",
    title: "Website analytics (Cloudflare Web Analytics)",
    bullets: [
      "tenneyapp.com uses Cloudflare Web Analytics.",
      "It is cookieless and measures aggregate usage.",
      "We do not use ads or behavioral profiling on the site.",
    ],
    body: (
      <p>
        Cloudflare’s analytics help us understand page load performance and overall usage trends without
        tracking you across sites. Read their documentation for details.
      </p>
    ),
  },
  {
    id: "app-diagnostics",
    title: "App diagnostics (Sentry) — opt-in",
    bullets: [
      "Crashes can trigger a prompt or notification to opt in.",
      "Opt-in is per platform (iOS and macOS each have their own toggle).",
      "Control this in Settings → General → Diagnostics.",
      "We do not set a custom user identity (no user.id).",
    ],
    body: (
      <>
        <p>
          If you opt in, Tenney can send crash reports and diagnostic logs to Sentry. Diagnostic payloads may
          include device identifiers to help us correlate crashes across releases.
        </p>
        <p className="mt-3">
          Some diagnostic breadcrumbs or log snippets can include user content from within the app (for
          example, recent actions or labels). If you prefer to keep everything on-device, turn diagnostics
          off.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Accounts / sign-in",
    bullets: ["Tenney does not require an account.", "We do not collect emails or usernames."],
    body: (
      <p>
        There is no sign-in. Your data stays on-device unless you explicitly export it or opt in to
        diagnostics.
      </p>
    ),
  },
  {
    id: "purchases",
    title: "Purchases",
    bullets: ["Purchases are handled by the App Store.", "We never receive payment card details."],
    body: <p>Apple handles billing and purchase history. Tenney only receives the entitlement status.</p>,
  },
  {
    id: "public-beta",
    title: "Public Beta (TestFlight)",
    bullets: [
      "Public beta builds may collect data under Apple’s TestFlight policies.",
      "Apple’s privacy rules apply independently of Tenney.",
    ],
    body: (
      <p>
        If you install Tenney via TestFlight, Apple may collect diagnostics or usage information. Review
        Apple’s policies for more details.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security practices",
    bullets: [
      "We restrict access to diagnostics to essential team members.",
      "We use reputable third-party services with security programs.",
    ],
    body: (
      <p>
        We design Tenney to work offline-first. When diagnostics are enabled, we minimize the data we send
        and keep it anonymous.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children / COPPA",
    bullets: [
      "Tenney is not directed to children under 13.",
      "We do not knowingly collect information from children.",
    ],
    body: (
      <p>
        If you believe a child has provided information to us, contact us and we will take appropriate
        steps.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about privacy can be sent to{" "}
        <a className="font-semibold text-tenney-blue" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        .
      </p>
    ),
  },
];
