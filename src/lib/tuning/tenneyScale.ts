export type TenneyScaleRef = {
  p: number;
  q: number;
  octave?: number;
  label?: string;
  name?: string;
  title?: string;
};

export type TenneyScale = {
  title?: string;
  defaults?: {
    rootHz?: number;
    primeLimit?: number;
  };
  refs: TenneyScaleRef[];
};

export function parseTenneyScale(payload: unknown): TenneyScale {
  const data = payload as TenneyScale;
  const refs = Array.isArray(data?.refs)
    ? data.refs
        .map((ref) => ({
          p: Number(ref.p),
          q: Number(ref.q),
          octave: Number.isFinite(ref.octave) ? Number(ref.octave) : 0,
          label: ref.label,
          name: ref.name,
          title: ref.title,
        }))
        .filter((ref) => Number.isFinite(ref.p) && Number.isFinite(ref.q))
    : [];

  return {
    title: data?.title,
    defaults: data?.defaults,
    refs,
  };
}

export function ratioToCents(p: number, q: number, octave = 0) {
  const ratio = (p / q) * Math.pow(2, octave);
  return 1200 * (Math.log(ratio) / Math.log(2));
}

export function refToFrequency(ref: TenneyScaleRef, rootHz: number, octaveShift = 0) {
  const octave = ref.octave ?? 0;
  return rootHz * (ref.p / ref.q) * Math.pow(2, octave + octaveShift);
}

export function formatRatio(ref: TenneyScaleRef) {
  const octave = ref.octave ?? 0;
  return `${ref.p}/${ref.q}${octave ? ` * 2^${octave}` : ""}`;
}

export function formatCents(value: number) {
  return value.toFixed(2);
}

export function getDegreeLabel(ref: TenneyScaleRef, index: number) {
  return ref.label || ref.name || ref.title || `Degree ${index + 1}`;
}
