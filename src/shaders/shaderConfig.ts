const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const deviceDpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;

export const SHADER_SEED = 7;
export const SHADER_DPR = clamp(deviceDpr, 1, 1.25);
export const SHADER_MAX_PIXELS = 1600 * 900 * SHADER_DPR * SHADER_DPR;
export const SHADER_RESOLUTION = {
  width: 1600,
  height: 900,
};
export const SHADERS_ENABLED = import.meta.env.VITE_ENABLE_SHADERS !== 'false';
