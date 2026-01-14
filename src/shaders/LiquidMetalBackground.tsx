import { getShaderColorFromString, type PaperShaderElement } from '@paper-design/shaders';
import { LiquidMetal } from '@paper-design/shaders-react';
import { useAnimationFrame } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { SHADER_DPR, SHADER_MAX_PIXELS, SHADER_SEED, SHADERS_ENABLED } from './shaderConfig';

export type LiquidMetalControls = {
  angle: number;
  distortion: number;
  contour: number;
  softness: number;
  repetition: number;
  scale: number;
  shiftRed: number;
  shiftBlue: number;
  temperature?: number;
  tintMix?: number;
  vignette?: number;
};

const BASE_CONTROLS: LiquidMetalControls = {
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
};

const BASE_TINT = getShaderColorFromString('#2B8CFF');
const WARM_TINT = getShaderColorFromString('#FFB36B');
const COOL_TINT = getShaderColorFromString('#3F7CFF');

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const mixColor = (from: number[], to: number[], t: number) =>
  from.map((value, index) => value + (to[index] - value) * t);

const updateThreshold = 0.001;

const LiquidMetalBackground = ({
  className,
  controls,
}: {
  className?: string;
  controls?: Partial<LiquidMetalControls>;
}) => {
  const mountRef = useRef<PaperShaderElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastControlsRef = useRef<LiquidMetalControls>({ ...BASE_CONTROLS });
  const lastTintRef = useRef<number[]>(BASE_TINT);

  const controlsRef = useRef(controls);
  controlsRef.current = controls;

  const shaderProps = useMemo(
    () => ({
      colorBack: '#0B0E14',
      colorTint: '#2B8CFF',
      distortion: 0.35,
      contour: 0.6,
      repetition: 5,
      angle: 35,
      speed: 0,
      frame: SHADER_SEED,
      minPixelRatio: SHADER_DPR,
      maxPixelCount: SHADER_MAX_PIXELS,
    }),
    []
  );

  useAnimationFrame(() => {
    if (!SHADERS_ENABLED) {
      return;
    }

    const activeControls = controlsRef.current;
    if (!activeControls) {
      return;
    }

    const mount = mountRef.current?.paperShaderMount;
    if (!mount) {
      return;
    }

    const nextControls: LiquidMetalControls = {
      ...BASE_CONTROLS,
      ...activeControls,
    };

    const updatedUniforms: Record<string, number | number[]> = {};
    const lastControls = lastControlsRef.current;

    type AdjustableKey =
      | 'angle'
      | 'distortion'
      | 'contour'
      | 'softness'
      | 'repetition'
      | 'scale'
      | 'shiftRed'
      | 'shiftBlue';

    const compareAndUpdate = (key: AdjustableKey, uniform: string) => {
      const nextValue = nextControls[key];
      const lastValue = lastControls[key];
      if (Math.abs(nextValue - lastValue) > updateThreshold) {
        updatedUniforms[uniform] = nextValue;
      }
    };

    compareAndUpdate('angle', 'u_angle');
    compareAndUpdate('distortion', 'u_distortion');
    compareAndUpdate('contour', 'u_contour');
    compareAndUpdate('softness', 'u_softness');
    compareAndUpdate('repetition', 'u_repetition');
    compareAndUpdate('scale', 'u_scale');
    compareAndUpdate('shiftRed', 'u_shiftRed');
    compareAndUpdate('shiftBlue', 'u_shiftBlue');

    const temperature = nextControls.temperature;
    if (temperature !== undefined) {
      const intensity = clamp(Math.abs(temperature), 0, 1);
      const tintMix = clamp(nextControls.tintMix ?? BASE_CONTROLS.tintMix ?? 0, 0, 0.18);
      const mixAmount = intensity * tintMix;
      const target = temperature >= 0 ? WARM_TINT : COOL_TINT;
      const nextTint = mixColor(BASE_TINT, target, mixAmount);
      const lastTint = lastTintRef.current;

      const tintChanged = nextTint.some((value, index) => Math.abs(value - lastTint[index]) > updateThreshold);
      if (tintChanged) {
        updatedUniforms.u_colorTint = nextTint;
        lastTintRef.current = nextTint;
      }
    } else if (lastTintRef.current !== BASE_TINT) {
      updatedUniforms.u_colorTint = BASE_TINT;
      lastTintRef.current = BASE_TINT;
    }

    const nextVignette = clamp(nextControls.vignette ?? 0, 0, 1);
    if (containerRef.current) {
      const currentVignetteValue = Number.parseFloat(
        containerRef.current.style.getPropertyValue('--liquid-vignette') || '0'
      );
      if (Math.abs(currentVignetteValue - nextVignette) > updateThreshold) {
        containerRef.current.style.setProperty('--liquid-vignette', nextVignette.toFixed(3));
      }
    }

    if (Object.keys(updatedUniforms).length > 0) {
      mount.setUniforms(updatedUniforms);
    }

    lastControlsRef.current = nextControls;
  });

  if (!SHADERS_ENABLED) {
    return <div className={className} aria-hidden />;
  }

  return (
    <div className={className} aria-hidden>
      <div ref={containerRef} className="relative h-full w-full">
        <LiquidMetal ref={mountRef} className="h-full w-full" {...shaderProps} />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]"
          style={{ opacity: 'var(--liquid-vignette, 0)' }}
        />
      </div>
    </div>
  );
};

export default LiquidMetalBackground;
