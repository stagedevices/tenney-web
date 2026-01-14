import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import DocsLanding from "./components/DocsLanding.vue";
import "./custom.css";

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp?.({ app });
    app.component("DocsLanding", DocsLanding);
  },
};
