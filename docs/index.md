---
layout: doc
---

<script setup>
const BETA_URL = "https://example.com/beta";
</script>

<section class="docs-hero">
  <div>
    <p class="VPBadge info">Tenney Docs</p>
    <h1 class="docs-hero__title">Design expressive tuning workflows, then bring them on stage.</h1>
    <p class="docs-hero__lede">
      Tenney’s documentation pairs practical quick-start guidance with a deeper look at just intonation, lattice mapping,
      and performance-ready exports. Each guide is short, visual, and ready for live-use prep.
    </p>
    <div class="docs-hero__actions">
      <a class="docs-cta docs-cta--primary" :href="BETA_URL" target="_blank" rel="noreferrer">Join Beta</a>
      <a class="docs-cta docs-cta--secondary" href="/tenney-web/beta">Explore the beta app</a>
      <a class="docs-hero__press" href="/tenney-web/press">Press kit →</a>
    </div>
  </div>
  <div class="docs-hero__media">
    <img
      :src="'/tenney-web/assets/screens/screen-01-lattice-overview.png'"
      alt="Tenney lattice overview screen"
    />
  </div>
</section>

<section class="docs-card-section tenney-pagegrid">
  <div class="docs-card-grid">
    <article class="docs-card tenney-plusgrid">
      <a class="docs-card__main" href="/getting-started/" aria-label="Getting started"></a>
      <svg class="docs-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <h2 class="docs-card__title">Getting started (5 minutes)</h2>
      <p class="docs-card__desc">
        Launch the beta, tune your first lattice, and share a scale in under five minutes.
      </p>
      <div class="docs-card__links">
        <a href="/getting-started/#setup-checklist">Setup checklist</a>
        <a href="/getting-started/#first-scale">First scale</a>
        <a href="/getting-started/#next-steps">Next steps</a>
      </div>
    </article>

    <article class="docs-card tenney-plusgrid">
      <a class="docs-card__main" href="/ji-primer/" aria-label="Just Intonation primer"></a>
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
        <a href="/ji-primer/#ratio-basics">Ratio basics</a>
        <a href="/ji-primer/#consonance-maps">Consonance maps</a>
      </div>
    </article>

    <article class="docs-card tenney-plusgrid">
      <a class="docs-card__main" href="/lattice-tuner/" aria-label="Lattice and tuner concepts"></a>
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
        <a href="/lattice-tuner/#lattice-orbits">Lattice orbits</a>
        <a href="/lattice-tuner/#tuner-overlays">Tuner overlays</a>
        <a href="/lattice-tuner/#micro-anchors">Micro anchors</a>
      </div>
    </article>

    <article class="docs-card tenney-plusgrid">
      <a class="docs-card__main" href="/export/" aria-label="Saving and exporting scales"></a>
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
        <a href="/export/#save-modes">Save modes</a>
        <a href="/export/#file-formats">File formats</a>
      </div>
    </article>

    <article class="docs-card tenney-plusgrid">
      <a class="docs-card__main" href="/stage-workflow/" aria-label="Stage workflow and timing"></a>
      <svg class="docs-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="docs-card__title">Stage workflow / timing</h2>
      <p class="docs-card__desc">
        Build a run-of-show that keeps timing tight and your harmonics resilient.
      </p>
      <div class="docs-card__links">
        <a href="/stage-workflow/#preflight">Preflight checks</a>
        <a href="/stage-workflow/#timing-cues">Timing cues</a>
        <a href="/stage-workflow/#failsafe">Failsafe prep</a>
      </div>
    </article>

    <article class="docs-card tenney-plusgrid">
      <a class="docs-card__main" href="/advanced/" aria-label="Advanced and under the hood"></a>
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
        <a href="/advanced/#data-model">Data model</a>
        <a href="/advanced/#performance-notes">Performance notes</a>
      </div>
    </article>
  </div>
</section>
