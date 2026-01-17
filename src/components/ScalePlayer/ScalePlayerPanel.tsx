import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TenneyScalePack } from "../../lib/tenneyScales/types";
import { packKbmUrl, packTenneyUrl } from "../../lib/tenneyScales/urls";
import { createTenneySynth } from "../../lib/audio/tenneySynth";
import {
  formatCents,
  formatRatio,
  getDegreeLabel,
  parseTenneyScale,
  ratioToCents,
  refToFrequency,
} from "../../lib/tuning/tenneyScale";
import { mapMidiToDegree, mapMidiToDegreeDefault, parseKBM } from "../../lib/tuning/kbm";
import { useReducedMotion } from "../../lib/reducedMotion";
import TenneyButton from "../TenneyButton";
import Keyboard from "./Keyboard";
import Pads from "./Pads";
import { useWebMidi } from "./Midi";

type ScalePlayerPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pack: TenneyScalePack | null;
};

type PlayedNote = {
  degreeIndex: number;
  ratioLabel: string;
  centsLabel: string;
  name: string;
};

const KEYBOARD_LAYOUT = ["a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j"];

export default function ScalePlayerPanel({ open, onOpenChange, pack }: ScalePlayerPanelProps) {
  const reducedMotion = useReducedMotion();
  const synthRef = useRef(createTenneySynth());
  const activeNotesRef = useRef(
    new Map<string, { degreeIndex: number; octaveOffset: number; velocity: number }>(),
  );
  const sustainedNotesRef = useRef(new Set<string>());
  const [scaleTitle, setScaleTitle] = useState<string | null>(null);
  const [scaleRefs, setScaleRefs] = useState<ReturnType<typeof parseTenneyScale>["refs"]>([]);
  const [rootHz, setRootHz] = useState(440);
  const [octaveShift, setOctaveShift] = useState(0);
  const [mappingMode, setMappingMode] = useState<"wrap" | "nearest">("wrap");
  const [view, setView] = useState<"keyboard" | "pads">("keyboard");
  const [sustain, setSustain] = useState(false);
  const [mono, setMono] = useState(false);
  const [niceMode, setNiceMode] = useState(false);
  const [activeDegrees, setActiveDegrees] = useState<Set<number>>(new Set());
  const [lastPlayed, setLastPlayed] = useState<PlayedNote | null>(null);
  const [meterLevel, setMeterLevel] = useState(0);
  const [kbmInfo, setKbmInfo] = useState<ReturnType<typeof parseKBM> | null>(null);
  const [kbmOpen, setKbmOpen] = useState(false);
  const [midiEnabled, setMidiEnabled] = useState(false);
  const kbmRootHz = useMemo(() => {
    if (!kbmInfo || scaleRefs.length === 0) return null;
    const degreeIndex = Math.min(
      Math.max(kbmInfo.scaleDegreeOffset, 0),
      Math.max(scaleRefs.length - 1, 0),
    );
    const ref = scaleRefs[degreeIndex];
    if (!ref) return null;
    const octave = ref.octave ?? 0;
    const base = kbmInfo.referenceFrequency / (ref.p / ref.q) / Math.pow(2, octave);
    return Number.isFinite(base) ? base : null;
  }, [kbmInfo, scaleRefs]);

  const updateActiveDegrees = useCallback(() => {
    const next = new Set<number>();
    activeNotesRef.current.forEach((note) => {
      next.add(note.degreeIndex);
    });
    setActiveDegrees(next);
    let peak = 0;
    activeNotesRef.current.forEach((note) => {
      peak = Math.max(peak, note.velocity);
    });
    setMeterLevel(peak);
  }, []);

  useEffect(() => {
    if (!pack) return;
    setRootHz(pack.defaults.rootHz);
    setScaleTitle(pack.title);
    setScaleRefs([]);
    setKbmInfo(null);
    setOctaveShift(0);
    setSustain(false);
    setMono(false);
    setNiceMode(false);
    setMappingMode("wrap");
    setView("keyboard");
    setLastPlayed(null);
    setMeterLevel(0);
    setMidiEnabled(false);
    setKbmOpen(false);
    activeNotesRef.current.clear();
    sustainedNotesRef.current.clear();
    setActiveDegrees(new Set());
  }, [pack]);

  useEffect(() => {
    if (!open || !pack) return;
    const controller = new AbortController();
    const fetchScale = async () => {
      try {
        const response = await fetch(packTenneyUrl(pack), { signal: controller.signal });
        const data = await response.json();
        const parsed = parseTenneyScale(data);
        setScaleTitle(parsed.title ?? pack.title);
        setScaleRefs(parsed.refs);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    };

    const fetchKBM = async () => {
      const url = packKbmUrl(pack);
      if (!url) {
        setKbmInfo(null);
        return;
      }
      try {
        const response = await fetch(url, { signal: controller.signal });
        const text = await response.text();
        setKbmInfo(parseKBM(text));
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    };

    void fetchScale();
    void fetchKBM();

    return () => controller.abort();
  }, [open, pack]);

  useEffect(() => {
    synthRef.current.setParams({ niceMode });
  }, [niceMode]);

  useEffect(() => {
    if (!open) {
      synthRef.current.allOff();
      activeNotesRef.current.clear();
      sustainedNotesRef.current.clear();
      updateActiveDegrees();
    }
  }, [open, updateActiveDegrees]);

  useEffect(() => {
    if (sustain) return;
    if (sustainedNotesRef.current.size === 0) return;
    sustainedNotesRef.current.forEach((noteId) => {
      if (mono) {
        synthRef.current.noteOff("mono");
      } else {
        synthRef.current.noteOff(noteId);
      }
      activeNotesRef.current.delete(noteId);
    });
    sustainedNotesRef.current.clear();
    updateActiveDegrees();
  }, [mono, sustain, updateActiveDegrees]);

  useEffect(() => {
    synthRef.current.allOff();
    activeNotesRef.current.clear();
    sustainedNotesRef.current.clear();
    updateActiveDegrees();
  }, [mono, updateActiveDegrees]);

  const degreeLabels = useMemo(() => {
    if (scaleRefs.length === 0) {
      return Array.from({ length: 12 }, (_, index) => ({ label: `Degree ${index + 1}` }));
    }
    return scaleRefs.map((ref, index) => ({ label: getDegreeLabel(ref, index) }));
  }, [scaleRefs]);

  const handleNoteOn = useCallback(
    (
      noteId: string,
      degreeIndex: number,
      octaveOffset = 0,
      velocity = 0.8,
      rootOverride?: number,
    ) => {
      const ref = scaleRefs[degreeIndex];
      if (!ref) return;
      void synthRef.current.start();

      if (mono) {
        activeNotesRef.current.clear();
        sustainedNotesRef.current.clear();
      }

      const frequency = refToFrequency(ref, rootOverride ?? rootHz, octaveShift + octaveOffset);
      const synthId = mono ? "mono" : noteId;
      synthRef.current.noteOn(synthId, { frequency, velocity, sustain });
      activeNotesRef.current.set(noteId, { degreeIndex, octaveOffset, velocity });
      sustainedNotesRef.current.delete(noteId);

      setLastPlayed({
        degreeIndex,
        ratioLabel: formatRatio(ref),
        centsLabel: formatCents(ratioToCents(ref.p, ref.q, ref.octave ?? 0)),
        name: getDegreeLabel(ref, degreeIndex),
      });
      updateActiveDegrees();
    },
    [mono, octaveShift, rootHz, scaleRefs, sustain, updateActiveDegrees],
  );

  const handleNoteOff = useCallback(
    (noteId: string) => {
      if (sustain) {
        sustainedNotesRef.current.add(noteId);
        return;
      }
      const synthId = mono ? "mono" : noteId;
      synthRef.current.noteOff(synthId);
      activeNotesRef.current.delete(noteId);
      updateActiveDegrees();
    },
    [mono, sustain, updateActiveDegrees],
  );

  const handleKeyboardNoteOn = useCallback(
    (noteId: string, degreeIndex: number) => handleNoteOn(noteId, degreeIndex, 0, 0.8),
    [handleNoteOn],
  );

  const handleKeyboardNoteOff = useCallback(
    (noteId: string) => handleNoteOff(noteId),
    [handleNoteOff],
  );

  useEffect(() => {
    const activeKeys = new Set<string>();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
      const key = event.key.toLowerCase();
      const index = KEYBOARD_LAYOUT.indexOf(key);
      if (index === -1) return;
      const degreeIndex = index % scaleRefs.length;
      if (!Number.isFinite(degreeIndex)) return;
      activeKeys.add(key);
      handleNoteOn(`key-${key}`, degreeIndex, 0, 0.9);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (!activeKeys.has(key)) return;
      activeKeys.delete(key);
      handleNoteOff(`key-${key}`);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleNoteOff, handleNoteOn, scaleRefs.length]);

  const handleMidiNoteOn = useCallback(
    (note: number, velocity: number) => {
      const mapping = kbmInfo
        ? mapMidiToDegree(note, kbmInfo, scaleRefs.length, mappingMode)
        : mapMidiToDegreeDefault(note, scaleRefs.length, mappingMode);
      handleNoteOn(
        `midi-${note}`,
        mapping.degreeIndex,
        mapping.octaveOffset,
        velocity,
        kbmRootHz ?? rootHz,
      );
    },
    [handleNoteOn, kbmInfo, kbmRootHz, mappingMode, rootHz, scaleRefs.length],
  );

  const handleMidiNoteOff = useCallback(
    (note: number) => {
      handleNoteOff(`midi-${note}`);
    },
    [handleNoteOff],
  );

  const { status: midiStatus, errorMessage: midiError } = useWebMidi({
    enabled: midiEnabled,
    onNoteOn: handleMidiNoteOn,
    onNoteOff: handleMidiNoteOff,
  });

  const chip = lastPlayed || {
    degreeIndex: 0,
    ratioLabel: "1/1",
    centsLabel: "0.00",
    name: "Degree 1",
  };

  return (
    <AnimatePresence>
      {open && pack ? (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close scale player"
            className="absolute inset-0 cursor-pointer bg-slate-900/30"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="tenney-player-shell tenney-plusgrid fixed inset-x-0 bottom-0 mx-auto max-h-[75vh] overflow-y-auto rounded-t-[28px] p-6 lg:inset-auto lg:right-0 lg:top-0 lg:h-dvh lg:w-[420px] lg:max-w-[92vw] lg:rounded-l-[28px]"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.3, ease: [0.22, 0.8, 0.28, 1] }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  Scale Player
                </p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {scaleTitle ?? pack.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-full border border-tenney-line/70 px-3 py-1 text-xs text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setView("keyboard")}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  view === "keyboard"
                    ? "border-sky-300 bg-white text-slate-900 shadow-soft dark:border-sky-500 dark:bg-slate-900 dark:text-white"
                    : "border-tenney-line/70 bg-white/70 text-slate-600 hover:text-slate-900 dark:bg-slate-950/60 dark:text-slate-300"
                }`}
              >
                Keyboard
              </button>
              <button
                type="button"
                onClick={() => setView("pads")}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  view === "pads"
                    ? "border-sky-300 bg-white text-slate-900 shadow-soft dark:border-sky-500 dark:bg-slate-900 dark:text-white"
                    : "border-tenney-line/70 bg-white/70 text-slate-600 hover:text-slate-900 dark:bg-slate-950/60 dark:text-slate-300"
                }`}
              >
                Pads
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSustain((prev) => !prev)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    sustain
                      ? "border-sky-300 bg-white text-slate-900 shadow-soft dark:border-sky-500 dark:bg-slate-900 dark:text-white"
                      : "border-tenney-line/70 bg-white/70 text-slate-600 hover:text-slate-900 dark:bg-slate-950/60 dark:text-slate-300"
                  }`}
                >
                  Sustain
                </button>
                <button
                  type="button"
                  onClick={() => setMono((prev) => !prev)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    mono
                      ? "border-sky-300 bg-white text-slate-900 shadow-soft dark:border-sky-500 dark:bg-slate-900 dark:text-white"
                      : "border-tenney-line/70 bg-white/70 text-slate-600 hover:text-slate-900 dark:bg-slate-950/60 dark:text-slate-300"
                  }`}
                >
                  {mono ? "Mono" : "Poly"}
                </button>
                <button
                  type="button"
                  onClick={() => setNiceMode((prev) => !prev)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    niceMode
                      ? "border-sky-300 bg-white text-slate-900 shadow-soft dark:border-sky-500 dark:bg-slate-900 dark:text-white"
                      : "border-tenney-line/70 bg-white/70 text-slate-600 hover:text-slate-900 dark:bg-slate-950/60 dark:text-slate-300"
                  }`}
                >
                  Nice mode
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-card border border-tenney-line/70 bg-white/70 px-3 py-2 text-xs text-slate-600 dark:bg-slate-950/60 dark:text-slate-300">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Octave shift
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setOctaveShift((prev) => prev - 1)}
                      className="rounded-full border border-tenney-line/70 px-2 py-1 text-xs text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {octaveShift}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOctaveShift((prev) => prev + 1)}
                      className="rounded-full border border-tenney-line/70 px-2 py-1 text-xs text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <label className="rounded-card border border-tenney-line/70 bg-white/70 px-3 py-2 text-xs text-slate-600 dark:bg-slate-950/60 dark:text-slate-300">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Root Hz
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={rootHz}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      setRootHz(Number.isFinite(next) ? next : 0);
                    }}
                    className="mt-2 w-full rounded-full border border-tenney-line/60 bg-white/80 px-3 py-1 text-sm font-semibold text-slate-900 shadow-soft outline-none focus:ring-2 focus:ring-tenney-blue/40 dark:bg-slate-900 dark:text-white"
                  />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <TenneyButton
                  size="sm"
                  variant={midiEnabled ? "primary" : "secondary"}
                  onClick={() => setMidiEnabled((prev) => !prev)}
                >
                  {midiEnabled ? "MIDI enabled" : "Enable MIDI"}
                </TenneyButton>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {midiStatus === "unsupported" && "MIDI not available"}
                  {midiStatus === "requesting" && "Requesting MIDI access"}
                  {midiStatus === "error" && midiError}
                  {midiStatus === "active" && "Listening to MIDI"}
                </span>
              </div>

              {!kbmInfo && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>Mapping:</span>
                  <button
                    type="button"
                    onClick={() => setMappingMode("wrap")}
                    className={`rounded-full border px-2 py-1 text-xs font-semibold transition ${
                      mappingMode === "wrap"
                        ? "border-sky-300 bg-white text-slate-900 dark:border-sky-500 dark:bg-slate-900 dark:text-white"
                        : "border-tenney-line/70 bg-white/70 text-slate-600 dark:bg-slate-950/60 dark:text-slate-300"
                    }`}
                  >
                    Lock
                  </button>
                  <button
                    type="button"
                    onClick={() => setMappingMode("nearest")}
                    className={`rounded-full border px-2 py-1 text-xs font-semibold transition ${
                      mappingMode === "nearest"
                        ? "border-sky-300 bg-white text-slate-900 dark:border-sky-500 dark:bg-slate-900 dark:text-white"
                        : "border-tenney-line/70 bg-white/70 text-slate-600 dark:bg-slate-950/60 dark:text-slate-300"
                    }`}
                  >
                    Nearest
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-card border border-tenney-line/70 bg-white/70 p-3 text-xs text-slate-600 shadow-soft dark:bg-slate-950/60 dark:text-slate-300">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Pitch
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {chip.ratioLabel} · {chip.centsLabel}¢
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{chip.name}</p>
                </div>
                <div className="h-10 w-20 rounded-full border border-tenney-line/70 bg-white/80 p-1 dark:bg-slate-900">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#05dbfe] via-[#029cfe] to-[#1aa3ff]"
                    style={{ width: `${Math.min(1, meterLevel) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              {view === "keyboard" ? (
                <Keyboard
                  degrees={degreeLabels}
                  activeDegrees={activeDegrees}
                  onNoteOn={handleKeyboardNoteOn}
                  onNoteOff={handleKeyboardNoteOff}
                />
              ) : (
                <Pads
                  degrees={degreeLabels}
                  activeDegrees={activeDegrees}
                  onNoteOn={handleKeyboardNoteOn}
                  onNoteOff={handleKeyboardNoteOff}
                />
              )}
            </div>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              <p className="font-semibold uppercase tracking-[0.2em]">KBM mapping: {kbmInfo ? "On" : "Off"}</p>
              {kbmInfo && (
                <details className="mt-2" open={kbmOpen} onToggle={() => setKbmOpen((prev) => !prev)}>
                  <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Show KBM
                  </summary>
                  <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <p>Reference MIDI: {kbmInfo.referenceMidi}</p>
                    <p>Reference Hz: {kbmInfo.referenceFrequency}</p>
                    <p>Mapping size: {kbmInfo.mappingSize}</p>
                  </div>
                </details>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
