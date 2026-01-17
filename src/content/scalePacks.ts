export type ScalePack = {
  title: string;
  author: string;
  description: string;
  limit: number;
  formats: string[];
  license?: string;
  links: {
    repo: string;
    download?: string;
    preview?: string;
  };
  tags?: string[];
};

export const scalePacks: ScalePack[] = [
  {
    title: "North Atlantic Harmonic Field",
    author: "L. Perez",
    description:
      "A calm, oceanic set of 5-limit harmonic neighborhoods for ensemble drones and slow harmonic drift.",
    limit: 5,
    formats: [".scl", "Tenney Export", "MTS"],
    license: "CC0",
    links: {
      repo: "https://github.com/stagedevices/tenney-scales",
      preview: "https://github.com/stagedevices/tenney-scales",
    },
    tags: ["drone", "ensemble", "5-limit"],
  },
  {
    title: "Chamber Spiral Studies",
    author: "A. Nakamoto",
    description:
      "Curated 7-limit relationships for chamber textures, with tight tuning corridors and clean cadences.",
    limit: 7,
    formats: [".scl", "Tenney Export"],
    license: "CC0",
    links: {
      repo: "https://github.com/stagedevices/tenney-scales",
      download: "https://github.com/stagedevices/tenney-scales",
    },
    tags: ["chamber", "7-limit"],
  },
  {
    title: "Prime Mosaic Toolkit",
    author: "S. Rhee",
    description:
      "Eleven-limit scale mosaics designed for modular rigs and spectral chords with gentle dissonance.",
    limit: 11,
    formats: [".scl", ".tun", "Tenney Export"],
    license: "CC0",
    links: {
      repo: "https://github.com/stagedevices/tenney-scales",
      preview: "https://github.com/stagedevices/tenney-scales",
    },
    tags: ["modular", "11-limit"],
  },
  {
    title: "Low Gravity Triads",
    author: "K. Hsu",
    description:
      "A compact 3-limit pack for pure fifths and fourths, tuned for clarity on amplified stages.",
    limit: 3,
    formats: [".scl", "Tenney Export"],
    license: "CC0",
    links: {
      repo: "https://github.com/stagedevices/tenney-scales",
    },
    tags: ["3-limit", "performance"],
  },
  {
    title: "Harmonic Loom 13+",
    author: "M. Osei",
    description:
      "Large-prime lattice extensions for research workflows and experimental harmonic weaving.",
    limit: 13,
    formats: [".scl", "Tenney Export", "CSV"],
    license: "CC0",
    links: {
      repo: "https://github.com/stagedevices/tenney-scales",
      preview: "https://github.com/stagedevices/tenney-scales",
    },
    tags: ["13-limit", "research"],
  },
  {
    title: "Glasshouse Cadences",
    author: "C. Anders",
    description:
      "A soft-edged 5/7-limit hybrid pack with annotated cadential lanes for live performance.",
    limit: 7,
    formats: [".scl", ".tun", "Tenney Export"],
    license: "CC0",
    links: {
      repo: "https://github.com/stagedevices/tenney-scales",
      download: "https://github.com/stagedevices/tenney-scales",
    },
    tags: ["performance", "cadence"],
  },
  {
    title: "Perimeter Studies",
    author: "R. Ahmed",
    description:
      "Sparse 11-limit anchors meant for slow changes and wide harmonic distances.",
    limit: 11,
    formats: [".scl", "Tenney Export"],
    license: "CC0",
    links: {
      repo: "https://github.com/stagedevices/tenney-scales",
    },
    tags: ["slow", "11-limit"],
  },
  {
    title: "Mercury Field Notes",
    author: "V. Laurent",
    description:
      "A bright 5-limit pack with annotated ratios for teaching and quick vocabulary checks.",
    limit: 5,
    formats: [".scl", "Tenney Export", "PDF"],
    license: "CC0",
    links: {
      repo: "https://github.com/stagedevices/tenney-scales",
      preview: "https://github.com/stagedevices/tenney-scales",
    },
    tags: ["education", "5-limit"],
  },
];
