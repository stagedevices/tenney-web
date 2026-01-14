---
title: Under the hood
---

# Under the hood

This section explains how Tenney stores and applies ratio data.

## Data model

Each lattice node stores a ratio, a label, and lock metadata. The engine normalizes ratios into the current octave for playback.

## Performance considerations

Keep scale sizes manageable for lower-latency tuning feedback, especially on mobile devices.
