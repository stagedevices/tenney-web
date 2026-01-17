export type KBM = {
  mappingSize: number;
  firstMidi: number;
  lastMidi: number;
  referenceMidi: number;
  referenceFrequency: number;
  scaleDegreeOffset: number;
  mapping: number[];
};

const DEFAULT_BASE_MIDI = 60;

const parseNumber = (value: string) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

export function parseKBM(text: string): KBM | null {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("!"));

  if (lines.length < 7) return null;

  const mappingSize = parseNumber(lines[0]);
  const firstMidi = parseNumber(lines[1]);
  const lastMidi = parseNumber(lines[2]);
  const referenceMidi = parseNumber(lines[3]);
  const referenceFrequency = parseNumber(lines[4]);
  const scaleDegreeOffset = parseNumber(lines[5]);

  if (
    mappingSize === null ||
    firstMidi === null ||
    lastMidi === null ||
    referenceMidi === null ||
    referenceFrequency === null ||
    scaleDegreeOffset === null
  ) {
    return null;
  }

  const mapping = lines.slice(6, 6 + mappingSize).map((entry) => {
    if (entry.toLowerCase() === "x") return -1;
    const num = parseNumber(entry);
    return num === null ? -1 : Math.trunc(num);
  });

  return {
    mappingSize,
    firstMidi,
    lastMidi,
    referenceMidi,
    referenceFrequency,
    scaleDegreeOffset,
    mapping,
  };
}

export function mapMidiToDegreeDefault(
  midi: number,
  degreeCount: number,
  mode: "wrap" | "nearest",
) {
  const offset = midi - DEFAULT_BASE_MIDI;
  if (degreeCount <= 0) return { degreeIndex: 0, octaveOffset: 0, velocityGain: 1 };

  if (mode === "nearest") {
    const degreeIndex = Math.round(offset / (12 / degreeCount));
    const clamped = Math.max(0, Math.min(degreeCount - 1, degreeIndex));
    return { degreeIndex: clamped, octaveOffset: 0, velocityGain: 1 };
  }

  const degreeIndex = ((offset % degreeCount) + degreeCount) % degreeCount;
  const octaveOffset = Math.floor(offset / degreeCount);
  return { degreeIndex, octaveOffset, velocityGain: 1 };
}

export function mapMidiToDegree(
  midi: number,
  kbm: KBM | null,
  degreeCount: number,
  mode: "wrap" | "nearest",
) {
  if (!kbm || degreeCount <= 0 || kbm.mappingSize <= 0) {
    return mapMidiToDegreeDefault(midi, degreeCount, mode);
  }

  if (midi < kbm.firstMidi || midi > kbm.lastMidi) {
    return mapMidiToDegreeDefault(midi, degreeCount, mode);
  }

  const offsetFromFirst = midi - kbm.firstMidi;
  const mappingIndex = ((offsetFromFirst % kbm.mappingSize) + kbm.mappingSize) % kbm.mappingSize;
  const cycle = Math.floor(offsetFromFirst / kbm.mappingSize);
  const referenceIndex =
    ((kbm.referenceMidi - kbm.firstMidi) % kbm.mappingSize + kbm.mappingSize) % kbm.mappingSize;
  const referenceCycle = Math.floor((kbm.referenceMidi - kbm.firstMidi) / kbm.mappingSize);
  const referenceMapping = kbm.mapping[referenceIndex];
  const degreeShift = (referenceMapping ?? 0) === -1 ? 0 : kbm.scaleDegreeOffset - referenceMapping;

  let mappedDegree = kbm.mapping[mappingIndex];
  if (mappedDegree === undefined || mappedDegree === -1) {
    return mapMidiToDegreeDefault(midi, degreeCount, mode);
  }

  mappedDegree += degreeShift;
  const degreeIndex = ((mappedDegree % degreeCount) + degreeCount) % degreeCount;
  const octaveOffset = cycle - referenceCycle + Math.floor(mappedDegree / degreeCount);

  return { degreeIndex, octaveOffset, velocityGain: 1 };
}
