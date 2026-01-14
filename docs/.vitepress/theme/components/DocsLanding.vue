<template>
  <section class="docs-landing tenney-pagegrid">
    <div class="docs-hero">
      <div>
        <p class="VPBadge info">Tenney Docs</p>
        <h1 class="docs-hero__title">Design expressive tuning workflows, then bring them on stage.</h1>
        <p class="docs-hero__lede">
          Tenney’s documentation pairs practical quick-start guidance with a deeper look at just intonation, lattice
          mapping, and performance-ready exports. Each guide is short, visual, and ready for live-use prep.
        </p>
        <div class="docs-hero__actions">
          <a class="tenney-btn tenney-btn--primary" :href="BETA_URL" target="_blank" rel="noreferrer">Join Beta</a>
          <a class="tenney-btn tenney-btn--secondary" href="/tenney-web/beta">Open Beta page</a>
          <a class="docs-hero__press" href="/tenney-web/press">Press kit →</a>
        </div>
      </div>
      <div class="docs-hero__media">
        <img :src="TENNEY_SCREEN" alt="Tenney lattice overview screen" />
      </div>
    </div>

    <section class="docs-card-section">
      <div class="docs-card-grid">
        <article class="docs-card tenney-plusgrid">
          <a class="docs-card__main" :href="links.gettingStarted" aria-label="Getting started"></a>
          <svg class="docs-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <h2 class="docs-card__title">Getting started (5 minutes)</h2>
          <p class="docs-card__desc">
            Launch the beta, tune your first lattice, and share a scale in under five minutes.
          </p>
          <div class="docs-card__links">
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.firstFive">First 5 minutes</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.audioInput">Audio input</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.gettingStarted">Overview</a>
          </div>
        </article>

        <article class="docs-card tenney-plusgrid">
          <a class="docs-card__main" :href="links.jiPrimer" aria-label="Just Intonation primer"></a>
          <svg class="docs-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m6-6H6m15 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 class="docs-card__title">Just Intonation primer</h2>
          <p class="docs-card__desc">
            Translate ratios into musical intention with a quick primer on JI intervals and stability.
          </p>
          <div class="docs-card__links">
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.ratiosIntervals">Ratios and intervals</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.temperamentVsJi">Temperament vs JI</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.jiPrimer">Overview</a>
          </div>
        </article>

        <article class="docs-card tenney-plusgrid">
          <a class="docs-card__main" :href="links.latticeTuner" aria-label="Lattice and tuner concepts"></a>
          <svg class="docs-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 4.5h9m-9 7.5h9m-9 7.5h9M4.5 4.5v15m15-15v15"
            />
          </svg>
          <h2 class="docs-card__title">Lattice + tuner concepts</h2>
          <p class="docs-card__desc">
            Understand axis weights, harmonic neighborhoods, and the tuner overlay that keeps you honest.
          </p>
          <div class="docs-card__links">
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.latticeNavigation">Lattice navigation</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.labelingHeji">Labeling HEJI ratios</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.latticeTuner">Overview</a>
          </div>
        </article>

        <article class="docs-card tenney-plusgrid">
          <a class="docs-card__main" :href="links.export" aria-label="Saving and exporting scales"></a>
          <svg class="docs-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V4.5m0 12l-3-3m3 3l3-3" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 19.5h15a2.25 2.25 0 002.25-2.25v-3"
            />
          </svg>
          <h2 class="docs-card__title">Saving + exporting scales</h2>
          <p class="docs-card__desc">
            Capture presets for performance rigs, collaboration, and archival research.
          </p>
          <div class="docs-card__links">
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.savingScales">Saving scales</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.exportFormats">Export formats</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.export">Overview</a>
          </div>
        </article>

        <article class="docs-card tenney-plusgrid">
          <a class="docs-card__main" :href="links.stageWorkflow" aria-label="Stage workflow and timing"></a>
          <svg class="docs-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 class="docs-card__title">Stage workflow / timing</h2>
          <p class="docs-card__desc">
            Build a run-of-show that keeps timing tight and your harmonics resilient.
          </p>
          <div class="docs-card__links">
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.timingLock">Timing and lock</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.performanceChecklist">Performance checklist</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.stageWorkflow">Overview</a>
          </div>
        </article>

        <article class="docs-card tenney-plusgrid">
          <a class="docs-card__main" :href="links.advanced" aria-label="Advanced and under the hood"></a>
          <svg class="docs-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m10.5 0a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
          <h2 class="docs-card__title">Advanced / under the hood</h2>
          <p class="docs-card__desc">
            Dig into tuning math, data models, and performance hints hidden in the advanced layer.
          </p>
          <div class="docs-card__links">
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.underTheHood">Under the hood</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.troubleshooting">Troubleshooting</a>
            <a class="tenney-btn tenney-btn--secondary tenney-btn--sm" :href="links.advanced">Overview</a>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { withBase } from "vitepress";

const BETA_URL = "https://example.com/beta";
const TENNEY_SCREEN = "/tenney-web/assets/screens/screen-01-lattice-overview.png";

const links = {
  gettingStarted: withBase("/getting-started/"),
  firstFive: withBase("/getting-started/first-5-minutes"),
  audioInput: withBase("/getting-started/audio-input"),
  jiPrimer: withBase("/ji-primer/"),
  ratiosIntervals: withBase("/ji-primer/ratios-and-intervals"),
  temperamentVsJi: withBase("/ji-primer/temperament-vs-ji"),
  latticeTuner: withBase("/lattice-tuner/"),
  latticeNavigation: withBase("/lattice-tuner/lattice-navigation"),
  labelingHeji: withBase("/lattice-tuner/labeling-heji-ratios"),
  export: withBase("/export/"),
  savingScales: withBase("/export/saving-scales"),
  exportFormats: withBase("/export/export-formats"),
  stageWorkflow: withBase("/stage-workflow/"),
  timingLock: withBase("/stage-workflow/timing-and-lock"),
  performanceChecklist: withBase("/stage-workflow/performance-checklist"),
  advanced: withBase("/advanced/"),
  underTheHood: withBase("/advanced/under-the-hood"),
  troubleshooting: withBase("/advanced/troubleshooting"),
};
</script>
