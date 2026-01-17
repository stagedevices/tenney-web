export type NoteOnOpts = {
  frequency: number;
  velocity?: number;
  sustain?: boolean;
};

export type SynthParams = {
  wave: "sine" | "triangle" | "sawtooth";
  filterHz: number;
  niceMode: boolean;
};

type Voice = {
  id: string;
  startedAt: number;
  velocity: number;
  oscillators: OscillatorNode[];
  gain: GainNode;
  filter: BiquadFilterNode;
  stop: (releaseTime: number) => void;
};

const DEFAULT_PARAMS: SynthParams = {
  wave: "sine",
  filterHz: 12000,
  niceMode: false,
};

const MAX_VOICES = 8;
const ATTACK = 0.006;
const RELEASE = 0.12;

export function createTenneySynth() {
  let context: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let limiter: DynamicsCompressorNode | null = null;
  let params: SynthParams = { ...DEFAULT_PARAMS };
  const voices = new Map<string, Voice>();

  const ensureContext = () => {
    if (!context) {
      context = new AudioContext();
      masterGain = context.createGain();
      limiter = context.createDynamicsCompressor();
      masterGain.gain.value = 0.6;
      limiter.threshold.value = -8;
      limiter.knee.value = 6;
      limiter.ratio.value = 6;
      limiter.attack.value = 0.003;
      limiter.release.value = 0.2;
      masterGain.connect(limiter);
      limiter.connect(context.destination);
    }
    return context;
  };

  const buildVoice = (id: string, frequency: number, velocity: number): Voice => {
    const ctx = ensureContext();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = params.filterHz;
    gain.gain.value = 0;
    gain.connect(filter);
    filter.connect(masterGain!);

    const oscillators: OscillatorNode[] = [];
    const addOscillator = (detune: number, panValue: number) => {
      const osc = ctx.createOscillator();
      const pan = ctx.createStereoPanner();
      osc.type = params.wave;
      osc.frequency.value = frequency;
      osc.detune.value = detune;
      pan.pan.value = panValue;
      osc.connect(pan);
      pan.connect(gain);
      osc.start();
      oscillators.push(osc);
    };

    if (params.niceMode) {
      addOscillator(-4, -0.25);
      addOscillator(4, 0.25);
    } else {
      const osc = ctx.createOscillator();
      osc.type = params.wave;
      osc.frequency.value = frequency;
      osc.connect(gain);
      osc.start();
      oscillators.push(osc);
    }

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(velocity, now + ATTACK);

    const stop = (releaseTime: number) => {
      const stopAt = ctx.currentTime + releaseTime;
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, stopAt);
      oscillators.forEach((osc) => {
        osc.stop(stopAt + 0.02);
      });
    };

    return {
      id,
      startedAt: now,
      velocity,
      oscillators,
      gain,
      filter,
      stop,
    };
  };

  const pruneVoice = (voice: Voice) => {
    voice.stop(RELEASE);
    voices.delete(voice.id);
  };

  const stealVoice = () => {
    if (voices.size < MAX_VOICES) return;
    const sorted = Array.from(voices.values()).sort((a, b) => {
      if (a.velocity !== b.velocity) return a.velocity - b.velocity;
      return a.startedAt - b.startedAt;
    });
    if (sorted[0]) {
      pruneVoice(sorted[0]);
    }
  };

  const start = async () => {
    const ctx = ensureContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
  };

  const noteOn = (id: string, opts: NoteOnOpts) => {
    const ctx = ensureContext();
    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    const velocity = Math.min(Math.max(opts.velocity ?? 0.8, 0.05), 1);
    const existing = voices.get(id);
    if (existing) {
      pruneVoice(existing);
    }

    stealVoice();
    const voice = buildVoice(id, opts.frequency, velocity);
    voices.set(id, voice);
  };

  const noteOff = (id: string) => {
    const voice = voices.get(id);
    if (!voice) return;
    voice.stop(RELEASE);
    voices.delete(id);
  };

  const allOff = () => {
    Array.from(voices.values()).forEach((voice) => {
      voice.stop(RELEASE);
    });
    voices.clear();
  };

  const setParams = (next: Partial<SynthParams>) => {
    params = { ...params, ...next };
    voices.forEach((voice) => {
      voice.filter.frequency.value = params.filterHz;
      voice.oscillators.forEach((osc) => {
        osc.type = params.wave;
      });
    });
  };

  const setMasterGain = (value: number) => {
    if (!masterGain) return;
    masterGain.gain.value = Math.max(0, Math.min(1, value));
  };

  const getContextState = () => context?.state ?? "suspended";

  return {
    start,
    noteOn,
    noteOff,
    allOff,
    setParams,
    setMasterGain,
    getContextState,
  };
}
