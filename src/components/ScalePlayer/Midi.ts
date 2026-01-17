import { useEffect, useMemo, useState } from "react";

type MidiStatus = "idle" | "requesting" | "active" | "unsupported" | "error";

type MidiHandlers = {
  enabled: boolean;
  onNoteOn: (note: number, velocity: number) => void;
  onNoteOff: (note: number) => void;
};

const clampVelocity = (velocity: number) => Math.min(Math.max(velocity, 0.1), 1);

export function useWebMidi({ enabled, onNoteOn, onNoteOff }: MidiHandlers) {
  const [status, setStatus] = useState<MidiStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlers = useMemo(
    () => ({ onNoteOn, onNoteOff }),
    [onNoteOn, onNoteOff],
  );

  useEffect(() => {
    if (!enabled) {
      setStatus("idle");
      setErrorMessage(null);
      return;
    }

    if (!navigator.requestMIDIAccess) {
      setStatus("unsupported");
      return;
    }

    let access: MIDIAccess | null = null;
    let disposed = false;

    const handleMessage = (event: MIDIMessageEvent) => {
      const [statusByte, note, velocity] = event.data;
      const command = statusByte & 0xf0;
      if (command === 0x90 && velocity > 0) {
        handlers.onNoteOn(note, clampVelocity(velocity / 127));
      } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
        handlers.onNoteOff(note);
      }
    };

    const attachInputs = () => {
      access?.inputs.forEach((input) => {
        input.onmidimessage = handleMessage;
      });
    };

    setStatus("requesting");
    navigator
      .requestMIDIAccess()
      .then((midiAccess) => {
        if (disposed) return;
        access = midiAccess;
        setStatus("active");
        attachInputs();
        midiAccess.onstatechange = () => attachInputs();
      })
      .catch((error: unknown) => {
        if (disposed) return;
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "MIDI unavailable");
      });

    return () => {
      disposed = true;
      access?.inputs.forEach((input) => {
        input.onmidimessage = null;
      });
      if (access) {
        access.onstatechange = null;
      }
    };
  }, [enabled, handlers]);

  return { status, errorMessage };
}
