import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TenneyScalePack } from "../../lib/tenneyScales/types";
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
import Pads from "../ScalePlayer/Pads";
import { useWebMidi } from "../ScalePlayer/Midi";

type ScalePlayerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pack: TenneyScalePack | null;
  baseUrl: string;
};

type PlayedNote = {
  degreeIndex: number;
  ratioLabel: string;
  centsLabel: string;
  name: string;
};

const PAD_COUNT = 12;

const resolveUrl = (baseUrl: string, path: string) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}${path.replace(/^\/+/, "")}`;
};

export default function ScalePlayerModal({ open, onOpenChange, pack, baseUrl }: ScalePlayerModalProps) {
  const reducedMotion = useReducedMotion();
  const synthRef = useRef(createTenneySynth());
  const startedRef = useRef(false);
  const activeNotesRef = useRef(
    new Map<string, { degreeIndex: number; octaveOffset: number; velocity: number }>(),
  );
  const sustainedNotesRef = useRef(new Set<string>());
  const [scaleTitle, setScaleTitle] = useState<string | null>(null);
  const [scaleRefs, setScaleRefs] = useState<ReturnType<typeof parseTenneyScale>["refs"]>([]);
  const [rootHz, setRootHz] = useState(440);
  const [octaveShift, setOctaveShift] = useState(0);
  const [sustain, setSustain] = useState(false);
  const [mono, setMono] = useState(false);
  const [activeDegrees, setActiveDegrees] = useState<Set<number>>(new Set());
  const [lastPlayed, setLastPlayed] = useState<PlayedNote | null>(null);
  const [kbmInfo, setKbmInfo] = useState<ReturnType<typeof parseKBM> | null>(null);
  const [kbmOpen, setKbmOpen] = useState(false);
  const [midiEnabled, setMidiEnabled] = useState(false);
  const [bankIndex, setBankIndex] = useState(0);

  const updateActiveDegrees = useCallback(() => {
    const next = new Set<number>();
    activeNotesRef.current.forEach((note) => {
      next.add(note.degreeIndex);
    });
    setActiveDegrees(next);
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
    setLastPlayed(null);
    setMidiEnabled(false);
    setKbmOpen(false);
    setBankIndex(0);
    startedRef.current = false;
    activeNotesRef.current.clear();
    sustainedNotesRef.current.clear();
    setActiveDegrees(new Set());
  }, [pack]);

  useEffect(() => {
    if (!open || !pack) return;
    const controller = new AbortController();

    const fetchScale = async () => {
      try {
        const response = await fetch(resolveUrl(baseUrl, pack.files.tenney), {
          signal: controller.signal,
        });
        const data = await response.json();
        const parsed = parseTenneyScale(data);
        setScaleTitle(parsed.title ?? pack.title);
        setScaleRefs(parsed.refs);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    };

    const fetchKBM = async () => {
      if (!pack.files.kbm) {
        setKbmInfo(null);
        return;
      }
      try {
        const response = await fetch(resolveUrl(baseUrl, pack.files.kbm), {
          signal: controller.signal,
        });
        const text = await response.text();
        setKbmInfo(parseKBM(text));
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    };

    void fetchScale();
    void fetchKBM();

    return () => controller.abort();
  }, [baseUrl, open, pack]);

  useEffect(() => {
    if (!open) {
      synthRef.current.allOff();
      activeNotesRef.current.clear();
      sustainedNotesRef.current.clear();
      updateActiveDegrees();
      setLastPlayed(null);
      startedRef.current = false;
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

  const ensureStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    void synthRef.current.start();
  }, []);

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

  const handlePadNoteOn = useCallback(
    (noteId: string, degreeIndex: number) => {
      ensureStarted();
      handleNoteOn(noteId, degreeIndex, 0, 0.9);
    },
    [ensureStarted, handleNoteOn],
  );

  const handlePadNoteOff = useCallback((noteId: string) => handleNoteOff(noteId), [handleNoteOff]);

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

  const handleMidiNoteOn = useCallback(
    (note: number, velocity: number) => {
      if (!startedRef.current) return;
      const mapping = kbmInfo
        ? mapMidiToDegree(note, kbmInfo, scaleRefs.length, "wrap")
        : mapMidiToDegreeDefault(note, scaleRefs.length, "wrap");
      handleNoteOn(
        `midi-${note}`,
        mapping.degreeIndex,
        mapping.octaveOffset,
        velocity,
        kbmRootHz ?? rootHz,
      );
    },
    [handleNoteOn, kbmInfo, kbmRootHz, rootHz, scaleRefs.length],
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

  const degreeLabels = useMemo(() => {
    if (scaleRefs.length === 0) {
      return Array.from({ length: PAD_COUNT }, (_, index) => ({ label: `Degree ${index + 1}` }));
    }
    return scaleRefs.map((ref, index) => ({ label: getDegreeLabel(ref, index) }));
  }, [scaleRefs]);

  const bankCount = Math.max(1, Math.ceil(degreeLabels.length / PAD_COUNT));

  useEffect(() => {
    setBankIndex((prev) => Math.min(prev, bankCount - 1));
  }, [bankCount]);

  const chip = useMemo<PlayedNote>(() => {
    if (lastPlayed) return lastPlayed;
    const ref = scaleRefs[0];
    if (!ref) {
      return {
        degreeIndex: 0,
        ratioLabel: "1/1",
        centsLabel: "0.00",
        name: "Degree 1",
      };
    }
    return {
      degreeIndex: 0,
      ratioLabel: formatRatio(ref),
      centsLabel: formatCents(ratioToCents(ref.p, ref.q, ref.octave ?? 0)),
      name: getDegreeLabel(ref, 0),
    };
  }, [lastPlayed, scaleRefs]);

  const midiStatusLabel =
    midiStatus === "unsupported"
      ? "MIDI not available"
      : midiStatus === "requesting"
        ? "Requesting MIDI access"
        : midiStatus === "error"
          ? midiError
          : midiStatus === "active"
            ? "Listening to MIDI"
            : "MIDI idle";

  const handleStopAll = useCallback(() => {
    synthRef.current.allOff();
    activeNotesRef.current.clear();
    sustainedNotesRef.current.clear();
    updateActiveDegrees();
  }, [updateActiveDegrees]);

  return (
    <Dialog.Root open={open && Boolean(pack)} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity motion-reduce:transition-none" />
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <Dialog.Content
            className={`tenney-plusgrid w-full max-w-[720px] max-h-[75vh] overflow-auto rounded-t-[24px] border border-tenney-line/70 bg-white/85 p-5 shadow-soft backdrop-blur-lg dark:bg-slate-950/70 sm:max-h-[85vh] sm:rounded-[24px] ${
              reducedMotion ? "" : "transition-transform duration-300"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  Scale Player
                </p>
                <Dialog.Title className="text-lg font-semibold text-slate-900 dark:text-white">
                  {scaleTitle ?? pack?.title}
                </Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full border border-tenney-line/70 px-3 py-1 text-xs text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Close
                </button>
              </Dialog.Close>
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {lastPlayed ? "Tap another pad to continue." : "Tap a pad to play."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
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
                onClick={handleStopAll}
                className="rounded-full border border-tenney-line/70 px-3 py-1 text-xs text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Stop all
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{octaveShift}</span>
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

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <TenneyButton
                size="sm"
                variant={midiEnabled ? "primary" : "secondary"}
                onClick={() => setMidiEnabled((prev) => !prev)}
              >
                {midiEnabled ? "MIDI enabled" : "Enable MIDI"}
              </TenneyButton>
              <span className="text-xs text-slate-500 dark:text-slate-400">{midiStatusLabel}</span>
            </div>

            {bankCount > 1 && (
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Bank
                </span>
                <button
                  type="button"
                  onClick={() => setBankIndex((prev) => Math.max(prev - 1, 0))}
                  className="rounded-full border border-tenney-line/70 px-2 py-1 text-xs text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  −
                </button>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {bankIndex + 1} / {bankCount}
                </span>
                <button
                  type="button"
                  onClick={() => setBankIndex((prev) => Math.min(prev + 1, bankCount - 1))}
                  className="rounded-full border border-tenney-line/70 px-2 py-1 text-xs text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  +
                </button>
              </div>
            )}

            <div className="mt-4 rounded-card border border-tenney-line/70 bg-white/70 p-3 text-xs text-slate-600 shadow-soft dark:bg-slate-950/60 dark:text-slate-300">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Pitch
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {chip.ratioLabel} · {chip.centsLabel}¢
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{chip.name}</p>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              <p className="font-semibold uppercase tracking-[0.2em]">KBM mapping: {kbmInfo ? "On" : "Off"}</p>
              {kbmInfo && (
                <details className="mt-2" open={kbmOpen} onToggle={() => setKbmOpen((prev) => !prev)}>
                  <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Show KBM
                  </summary>
                  <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <p>Reference note: {kbmInfo.referenceMidi}</p>
                    <p>Reference Hz: {kbmInfo.referenceFrequency}</p>
                    <p>Mapping size: {kbmInfo.mappingSize}</p>
                  </div>
                </details>
              )}
            </div>

            <div className="mt-4">
              <Pads
                degrees={degreeLabels}
                activeDegrees={activeDegrees}
                onNoteOn={handlePadNoteOn}
                onNoteOff={handlePadNoteOff}
                offset={bankIndex * PAD_COUNT}
                padCount={PAD_COUNT}
              />
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
