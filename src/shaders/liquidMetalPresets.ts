import type { LiquidMetalControls } from './LiquidMetalBackground';

export type BeatPreset = LiquidMetalControls & { at: number };

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

const lerpOptional = (from?: number, to?: number, t?: number) => {
  if (from === undefined && to === undefined) {
    return undefined;
  }
  if (from === undefined) {
    return to;
  }
  if (to === undefined) {
    return from;
  }
  if (t === undefined) {
    return from;
  }
  return lerp(from, to, t);
};

export const liquidMetalPresets: BeatPreset[] = [
  {
    at: 0.0,
    angle: 35,
    distortion: 0.35,
    contour: 0.6,
    softness: 0.1,
    repetition: 5,
    scale: 0.6,
    shiftRed: 0.3,
    shiftBlue: 0.3,
    temperature: 0,
    tintMix: 0.08,
    vignette: 0,
  },
  {
    at: 0.18,
    angle: 52,
    distortion: 0.38,
    contour: 0.62,
    softness: 0.095,
    repetition: 5.4,
    scale: 0.62,
    shiftRed: 0.32,
    shiftBlue: 0.34,
    temperature: -0.15,
    tintMix: 0.08,
    vignette: 0.05,
  },
  {
    at: 0.38,
    angle: 74,
    distortion: 0.47,
    contour: 0.7,
    softness: 0.085,
    repetition: 6.2,
    scale: 0.64,
    shiftRed: 0.4,
    shiftBlue: 0.38,
    temperature: 0.08,
    tintMix: 0.1,
    vignette: 0.08,
  },
  {
    at: 0.6,
    angle: 96,
    distortion: 0.52,
    contour: 0.72,
    softness: 0.08,
    repetition: 6.8,
    scale: 0.66,
    shiftRed: 0.45,
    shiftBlue: 0.4,
    temperature: 0.24,
    tintMix: 0.11,
    vignette: 0.12,
  },
  {
    at: 0.78,
    angle: 122,
    distortion: 0.6,
    contour: 0.78,
    softness: 0.07,
    repetition: 7.4,
    scale: 0.68,
    shiftRed: 0.5,
    shiftBlue: 0.44,
    temperature: 0.34,
    tintMix: 0.12,
    vignette: 0.18,
  },
  {
    at: 1.0,
    angle: 88,
    distortion: 0.4,
    contour: 0.62,
    softness: 0.1,
    repetition: 5.2,
    scale: 0.62,
    shiftRed: 0.32,
    shiftBlue: 0.32,
    temperature: 0.12,
    tintMix: 0.1,
    vignette: 0.45,
  },
];

export const samplePreset = (t: number): LiquidMetalControls => {
  const clamped = Math.min(Math.max(t, 0), 1);
  const lastPreset = liquidMetalPresets[liquidMetalPresets.length - 1];

  for (let index = 0; index < liquidMetalPresets.length - 1; index += 1) {
    const current = liquidMetalPresets[index];
    const next = liquidMetalPresets[index + 1];

    if (clamped >= current.at && clamped <= next.at) {
      const localT = (clamped - current.at) / (next.at - current.at || 1);

      return {
        angle: lerp(current.angle, next.angle, localT),
        distortion: lerp(current.distortion, next.distortion, localT),
        contour: lerp(current.contour, next.contour, localT),
        softness: lerp(current.softness, next.softness, localT),
        repetition: lerp(current.repetition, next.repetition, localT),
        scale: lerp(current.scale, next.scale, localT),
        shiftRed: lerp(current.shiftRed, next.shiftRed, localT),
        shiftBlue: lerp(current.shiftBlue, next.shiftBlue, localT),
        temperature: lerpOptional(current.temperature, next.temperature, localT),
        tintMix: lerpOptional(current.tintMix, next.tintMix, localT),
        vignette: lerpOptional(current.vignette, next.vignette, localT),
      };
    }
  }

  return {
    angle: lastPreset.angle,
    distortion: lastPreset.distortion,
    contour: lastPreset.contour,
    softness: lastPreset.softness,
    repetition: lastPreset.repetition,
    scale: lastPreset.scale,
    shiftRed: lastPreset.shiftRed,
    shiftBlue: lastPreset.shiftBlue,
    temperature: lastPreset.temperature,
    tintMix: lastPreset.tintMix,
    vignette: lastPreset.vignette,
  };
};
