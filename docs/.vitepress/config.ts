import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/tenney-web/docs/",
  title: "Tenney Docs",
  description: "Guides and reference material for building and performing with Tenney.",
  themeConfig: {
    nav: [
      { text: "Docs home", link: "/" },
      { text: "Press", link: "/tenney-web/press" },
      { text: "Beta", link: "/tenney-web/beta" },
    ],
    sidebar: [
      {
        text: "Getting started (5 minutes)",
        items: [{ text: "Overview", link: "/getting-started/" }],
      },
      {
        text: "Just Intonation primer",
        items: [{ text: "Overview", link: "/ji-primer/" }],
      },
      {
        text: "Lattice + tuner concepts",
        items: [{ text: "Overview", link: "/lattice-tuner/" }],
      },
      {
        text: "Saving + exporting scales",
        items: [{ text: "Overview", link: "/export/" }],
      },
      {
        text: "Stage workflow / timing",
        items: [{ text: "Overview", link: "/stage-workflow/" }],
      },
      {
        text: "Advanced / under the hood",
        items: [{ text: "Overview", link: "/advanced/" }],
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
