# Lattice + tuner concepts

The lattice is your harmonic map, while the tuner is your confirmation layer. Use both to keep experiments stable.

## What you’ll learn

- How axis weights change harmonic proximity.
- Why tuner overlays prevent drift.
- How to store micro-anchors for quick recall.

:::tip Visual anchors
Keep one axis reserved for “known good” intervals so you can return quickly during rehearsal.
:::

## <span class="docs-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 4.5h9m-9 7.5h9m-9 7.5h9M4.5 4.5v15m15-15v15" /></svg> Lattice orbits</span>

Orbits define how far a node sits from the tonic and which primes affect it. Favor small orbits for stable stacks.

:::info Color map
Cyan highlights the prime axis currently in focus. Blue indicates nearby ratios that are safe to audition.
:::

## <span class="docs-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" /></svg> Tuner overlays</span>

The tuner overlay compares live input to the selected ratio and flags micro offsets before they become audible.

<details>
  <summary>Under the hood</summary>
  Tenney derives cents from ratio logs, then offsets the live input by its spectral centroid for a smoother readout.
</details>

## <span class="docs-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V4.5m0 12l-3-3m3 3l3-3" /></svg> Micro anchors</span>

Pin micro anchors for any ratio you intend to revisit on stage. More coming soon.
