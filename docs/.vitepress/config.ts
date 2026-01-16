import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/docs/",
  title: "Tenney Docs",
  description: "Guides and reference material for building and performing with Tenney.",
  themeConfig: {
    nav: [
      { text: "Tenney", link: "/" },
      { text: "Docs", link: "/" },
      { text: "Press", link: "/press" },
      { text: "Beta", link: "/beta" },
    ],
    sidebar: [
      {
        text: "Getting started",
        items: [
          { text: "Getting started", link: "/getting-started/" },
          { text: "First 5 minutes", link: "/getting-started/first-5-minutes" },
          { text: "Audio input", link: "/getting-started/audio-input" },
        ],
      },
      {
        text: "Just Intonation primer",
        items: [
          { text: "JI primer", link: "/ji-primer/" },
          { text: "Ratios and intervals", link: "/ji-primer/ratios-and-intervals" },
          { text: "Temperament vs JI", link: "/ji-primer/temperament-vs-ji" },
        ],
      },
      {
        text: "Lattice + tuner concepts",
        items: [
          { text: "Lattice overview", link: "/lattice-tuner/" },
          { text: "Lattice navigation", link: "/lattice-tuner/lattice-navigation" },
          { text: "Labeling HEJI ratios", link: "/lattice-tuner/labeling-heji-ratios" },
        ],
      },
      {
        text: "Saving + exporting scales",
        items: [
          { text: "Export overview", link: "/export/" },
          { text: "Saving scales", link: "/export/saving-scales" },
          { text: "Export formats", link: "/export/export-formats" },
        ],
      },
      {
        text: "Stage workflow / timing",
        items: [
          { text: "Stage workflow", link: "/stage-workflow/" },
          { text: "Timing and lock", link: "/stage-workflow/timing-and-lock" },
          { text: "Performance checklist", link: "/stage-workflow/performance-checklist" },
        ],
      },
      {
        text: "Advanced / under the hood",
        items: [
          { text: "Advanced overview", link: "/advanced/" },
          { text: "Under the hood", link: "/advanced/under-the-hood" },
          { text: "Troubleshooting", link: "/advanced/troubleshooting" },
        ],
      },
    ],
    search: {
      provider: "local",
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
          },
        },
      },
    },
  },
});
