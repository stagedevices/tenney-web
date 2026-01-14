import { useEffect, useMemo, useRef } from 'react';
import { MotionValue, useAnimationFrame } from 'framer-motion';
import {
  ShaderFitOptions,
  ShaderMount,
  defaultObjectSizing,
  getShaderColorFromString,
  liquidMetalFragmentShader,
  LiquidMetalShapes,
} from '@paper-design/shaders';
import { SHADER_DPR, SHADER_MAX_PIXELS, SHADER_SEED, SHADERS_ENABLED } from './shaderConfig';

type ShaderNarrativeBackgroundProps = {
  className?: string;
  hue: MotionValue<number>;
  energy: MotionValue<number>;
  flow: MotionValue<number>;
  angle: MotionValue<number>;
  vignette: MotionValue<number>;
  reducedMotion: boolean;
};

type NarrativeValues = {
  hue: number;
  energy: number;
  flow: number;
  angle: number;
  vignette: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const buildUniforms = ({ hue, energy, flow, angle, vignette }: NarrativeValues) => {
  const energyAdjusted = clamp(energy - vignette * 0.08, 0.05, 0.9);
  const flowAdjusted = clamp(flow, 0.05, 0.3);
  const tintLightness = 48 + energyAdjusted * 16;
  const backLightness = 5 + energyAdjusted * 6 + vignette * 3;
  const colorBack = `hsl(${Math.round(hue)} 18% ${Math.round(backLightness)}%)`;
  const colorTint = `hsl(${Math.round(hue)} 72% ${Math.round(tintLightness)}%)`;

  const distortion = 0.08 + energyAdjusted * 0.34;
  const contour = 0.25 + energyAdjusted * 0.42;
  const repetition = 2.4 + flowAdjusted * 6.2;
  const softness = 0.25 + (1 - energyAdjusted) * 0.2;

  const { scale, rotation, offsetX, offsetY, originX, originY, worldWidth, worldHeight } =
    defaultObjectSizing;

  return {
    u_colorBack: getShaderColorFromString(colorBack),
    u_colorTint: getShaderColorFromString(colorTint),
    u_contour: contour,
    u_distortion: distortion,
    u_softness: softness,
    u_repetition: repetition,
    u_shiftRed: 0.25 + flowAdjusted * 0.35,
    u_shiftBlue: -0.15 - flowAdjusted * 0.2,
    u_angle: angle,
    u_isImage: false,
    u_shape: LiquidMetalShapes.none,
    u_fit: ShaderFitOptions.cover,
    u_scale: scale * 1.35,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  };
};

const ShaderNarrativeBackground = ({
  className,
  hue,
  energy,
  flow,
  angle,
  vignette,
  reducedMotion,
}: ShaderNarrativeBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shaderRef = useRef<ShaderMount | null>(null);
  const lastValues = useRef<NarrativeValues | null>(null);

  const calmValues = useMemo(
    () => ({
      hue: 210,
      energy: 0.2,
      flow: 0.1,
      angle: 28,
      vignette: 0,
    }),
    []
  );

  useEffect(() => {
    if (!SHADERS_ENABLED) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const initialValues = reducedMotion
      ? calmValues
      : {
          hue: hue.get(),
          energy: energy.get(),
          flow: flow.get(),
          angle: angle.get(),
          vignette: vignette.get(),
        };

    shaderRef.current = new ShaderMount(
      node,
      liquidMetalFragmentShader,
      buildUniforms(initialValues),
      undefined,
      0,
      SHADER_SEED,
      SHADER_DPR,
      SHADER_MAX_PIXELS
    );

    lastValues.current = initialValues;

    return () => {
      shaderRef.current?.dispose();
      shaderRef.current = null;
    };
  }, [angle, calmValues, energy, flow, hue, reducedMotion, vignette]);

  useEffect(() => {
    if (!shaderRef.current) {
      return;
    }

    const nextValues = reducedMotion
      ? calmValues
      : {
          hue: hue.get(),
          energy: energy.get(),
          flow: flow.get(),
          angle: angle.get(),
          vignette: vignette.get(),
        };

    shaderRef.current.setUniforms(buildUniforms(nextValues));
    lastValues.current = nextValues;
  }, [angle, calmValues, energy, flow, hue, reducedMotion, vignette]);

  useAnimationFrame(() => {
    if (!shaderRef.current || reducedMotion) {
      return;
    }

    const nextValues = {
      hue: hue.get(),
      energy: energy.get(),
      flow: flow.get(),
      angle: angle.get(),
      vignette: vignette.get(),
    };

    const previous = lastValues.current;
    if (
      previous &&
      Math.abs(previous.hue - nextValues.hue) < 0.3 &&
      Math.abs(previous.energy - nextValues.energy) < 0.01 &&
      Math.abs(previous.flow - nextValues.flow) < 0.01 &&
      Math.abs(previous.angle - nextValues.angle) < 0.3 &&
      Math.abs(previous.vignette - nextValues.vignette) < 0.01
    ) {
      return;
    }

    shaderRef.current.setUniforms(buildUniforms(nextValues));
    lastValues.current = nextValues;
  });

  if (!SHADERS_ENABLED) {
    return <div className={className} aria-hidden />;
  }

  return <div ref={containerRef} className={className} aria-hidden />;
};

export default ShaderNarrativeBackground;
