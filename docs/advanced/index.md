---
title: Advanced overview
---

# Advanced / under the hood

When you’re ready to go deeper, Tenney exposes tuning math, storage internals, and performance tooling.

## What you’ll learn

- How Tenney represents ratios internally.
- Which models power the lattice search.
- What to monitor for performance stability.

:::tip Keep notes
Capture tuning notes as you experiment so you can reproduce the same lattice later.
:::

## <span class="docs-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m10.5 0a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" /></svg> Data model</span>

Tenney stores each scale as a set of ratios, metadata, and timing cues. The dataset is designed to be portable.

## <span class="docs-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" /></svg> Performance notes</span>

Use the advanced diagnostics to spot drift before it becomes audible.
