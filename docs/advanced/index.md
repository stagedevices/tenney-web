# Advanced / under the hood

When you need to customize Tenney beyond presets, start here. These notes cover data models, tuning math, and performance
optimizations.

## What you’ll learn

- How Tenney stores lattice geometry.
- What makes the tuner fast enough for live use.
- Where to experiment safely.

:::tip Scope before scaling
Prototype a tuning with 5–7 nodes before expanding, so you can verify stability early.
:::

## <span class="docs-section-title">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 4.5h9m-9 7.5h9m-9 7.5h9M4.5 4.5v15m15-15v15" />
  </svg>
  Data model
</span>

Tenney stores each node as a ratio plus lattice coordinates, so scales can be rebuilt in any octave.

:::info Safety rails
The data layer clamps extreme ratios to protect the tuner from unstable ranges.
:::

## <span class="docs-section-title">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
  </svg>
  Performance notes
</span>

Keep lattices shallow during live sets; large jumps can destabilize monitoring for the ensemble.

<details>
  <summary>Under the hood</summary>
  The tuner uses a rolling FFT window and caches ratio conversions to maintain low latency on mobile hardware.
</details>

More coming soon: scripting hooks and automation APIs.
